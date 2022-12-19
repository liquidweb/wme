#!/usr/bin/env bash
#
# Build the Sitebuilder plugin and deploy it to a Nexcess server.
#
# USAGE:
#
#   deploy-to-nexcess [-s <server>]
#
# server
#   The remote server. This can accept anything that can be used by the scp/ssh commands.
#
#   Multiple values may be passed using either JSON-encoded or comma-separated strings,
#   but be aware that the same path will be used for all targets!
#
# EXAMPLES:
#
#   deploy-to-test -s someuser@example.com
#   deploy-to-test -s someuser@example.com,someuser@example.net
#   deploy-to-test -s '["someuser@example.com", "someuser@example.net"]'
#   deploy-to-test -s '{"dotcom": "someuser@example.com", "dotnet": "someuser@example.net"}'

# Set defaults.
project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../" >/dev/null 2>&1 && pwd)"
plugin_source="${project_root}/plugins/wme-sitebuilder"
timestamp="$(date +"%s")"
exit_code=0

# Make sure that we have the nexcess-mapps directory and main file.
if [[ ! -d "${plugin_source}/wme-sitebuilder" || ! -f "${plugin_source}/wme-sitebuilder.php" ]]; then
	echo "Could not find the wme-sitebuilder directory or main file." >&2
	exit 1
fi

#######################################
# Output an error to the terminal.
# Colored to red.
#######################################
function error() {
	printf "\033[0;31m%s\033[0;0m\n" "$1"
}

#######################################
# Output a success to the terminal.
# Colored to green.
#######################################
function success() {
	printf "\033[0;32m%s\033[0;0m\n" "$1"
}

#######################################
# Output usage message to the terminal.
#######################################
function usage() {
	local underline
	local nounderline

	underline=$(tput smul)
	nounderline=$(tput rmul)

	printf "
	%s [-s ${underline}value${nounderline}]
	-h
		Show this help menu.
	-s ${underline}value${nounderline}
		The remote server. This can accept any value that can be used by the scp/ssh commands.
		Multiple values may be passed using either JSON-encoded or comma-separated strings,
		but be aware that the same path will be used for all targets!
" "$1" | $PAGER
}

declare -a TARGET_SERVERS

branch="$(git branch --show-current)"

# Parse options
while getopts ":c:hp:s:" opt; do
  case $opt in
	h)
		usage "$(basename "$0")"
		exit
		;;
	s)
		# Handle JSON representations of target servers.
		if jq type <<< "$OPTARG" &>/dev/null; then
			# shellcheck disable=SC2207
			IFS=$'\n' TARGET_SERVERS+=( $(jq -r '.[]' <<< "$OPTARG") )
		else
			IFS=',' read -ra SERVERS <<< "$OPTARG"
			for i in "${SERVERS[@]}"; do
				TARGET_SERVERS+=( "$i" )
			done
		fi
		;;
	\?)
		echo "Invalid option: -$OPTARG" >&2
		exit 1
		;;
	:)
		echo "Option -$OPTARG requires an argument." >&2
		exit 1
		;;
  esac
done

# Abort if there's nothing to do.
if [ "${#TARGET_SERVERS[@]}" -eq 0 ]; then
	echo "No servers configured for branch ${branch}, aborting."
	exit
fi

# Parse out the plugin version, which we'll use for post-deployment checks.
plugin_version="$( grep 'Version:' "${plugin_source}/wme-sitebuilder.php" | awk -F':' '{print $2}' | tr -d ' ')"

# Build the plugin.
pnpm build:plugin

# Iterate through the target servers, deploying to each one.
for TARGET_SERVER in "${TARGET_SERVERS[@]}"; do
	printf "\n\\033[0;36mDeploying to %s\\033[0;0m\n" "$TARGET_SERVER"

	REMOTE_HOST="$(echo "$TARGET_SERVER" | sed -n 's/^[^@]*@//p')"
	remote_path="$(echo "$REMOTE_HOST"/html/wp-content/plugins)"

# Assemble the command to be run on the target servers.
remote_command=$(cat <<EOF
set -x;
cd '${remote_path}';
wp plugin install --activate wme-sitebuilder.zip;
rm wme-sitebuilder.zip;
[ "\$(wp plugin list --name=wme-sitebuilder --field=version)" = "${plugin_version}" ];
EOF
)

	# Ensure the runner can SSH into the target server.
	ssh-keyscan "$REMOTE_HOST" 2> /dev/null >> ~/.ssh/known_hosts

	# Copy the archive to the remote server.
	scp -o "ConnectTimeout=15" -o "BatchMode=yes" \
		"${plugin_source}/wme-sitebuilder.zip" "${TARGET_SERVER}:${remote_path}" \
		|| { error "Unable to copy file to destination server" && continue; }

	if ssh -o "ConnectTimeout=15" -o "BatchMode=yes" "${TARGET_SERVER}" "$remote_command"; then
		success 'The plugin has been updated successfully!'
	fi
done

exit "$exit_code"
