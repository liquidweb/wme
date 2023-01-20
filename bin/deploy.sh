#!/usr/bin/env bash
#
# Build the Sitebuilder plugin and deploy it to a Nexcess server.
#
# USAGE:
#
#   deploy
#
# Requires the existence of a '.deployment-mappings.json' file in the root of the project with the following format:
#
# {
# 	"targets": {
#		"target.id": {
#			"type": "nexcess",
#			"host": "abcdefghi1023.nxcli.io",
#			"user": "abcdef123_4",
#			"path": "~/zyxwvu0987.nxcli.io/html/wp-content/plugins",
#			"url": "https://main.sitebuilder.crows.dev"
#		}
#	},
#	"branches": {
#		"main": {
#			"targets": [
#				"target.id"
#			]
#		}
#	}
# }
#

# Set defaults.
project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../" >/dev/null 2>&1 && pwd)"
plugin_source="${project_root}/plugins/wme-sitebuilder"
exit_code=0

# Make sure that we have the wme-sitebuilder directory and main file.
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
	printf "
	%s
	-h
		Show this help menu.
" "$1" | $PAGER
}

declare -a TARGET_SERVERS

# Parse options
while getopts ":h:" opt; do
  case $opt in
	h)
		usage "$(basename "$0")"
		exit
		;;
	\?)
		echo "Invalid option: -$OPTARG" >&2
		exit 1
		;;
  esac
done

branch="$(git branch --show-current)"
# shellcheck disable=SC2207
TARGET_SERVERS=( $(jq -r -c ".branches.\"${branch}\".targets[] as \$targetServers | .targets | .[\$targetServers]" .deploy-targets.json) )

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
    HOST_TYPE=$(echo "$TARGET_SERVER" | jq -r '.type' )
    REMOTE_HOST=$(echo "$TARGET_SERVER" | jq -r '.host' )
    REMOTE_USER=$(echo "$TARGET_SERVER" | jq -r '.user' )
    REMOTE_PATH=$(echo "$TARGET_SERVER" | jq -r '.path' )
    URL=$(echo "$TARGET_SERVER" | jq -r '.url' )

	printf "\n\\033[0;36mDeploying to %s on %s\\033[0;0m\n" "$URL" "$HOST_TYPE"

# Assemble the command to be run on the target servers.
remote_command=$(cat <<EOF
set -x;
cd ${REMOTE_PATH};
wp plugin install --force --activate wme-sitebuilder.zip;
rm wme-sitebuilder.zip;
[ "\$(wp plugin list --name=wme-sitebuilder --field=version)" = "${plugin_version}" ];
EOF
)

	# Ensure the runner can SSH into the target server.
	ssh-keyscan "$REMOTE_HOST" 2> /dev/null >> ~/.ssh/known_hosts

	# Copy the archive to the remote server.
	scp -o "ConnectTimeout=15" -o "BatchMode=yes" \
		"${plugin_source}/wme-sitebuilder.zip" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}" \
		|| { error "Unable to copy file to destination server" && continue; }

	if ssh -o "ConnectTimeout=15" -o "BatchMode=yes" "${REMOTE_USER}@${REMOTE_HOST}" "$remote_command"; then
		success 'The plugin has been updated successfully!'
	fi
done

exit "$exit_code"
