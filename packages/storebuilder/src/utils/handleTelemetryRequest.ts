import { handleActionRequest } from './handleActionRequest';

interface TelemetryDataPayloadInterface {
	_wpnonce: string;
	action: string;
	plugin_slug?: string;
	pluginSlugs?: string[];
	sub_action: string;
}

export const handleTelemetryRequest = (
	nonce: string,
	action: string,
	pluginSlug:string,
	subAction: string = 'wizard_started'
) => {
	const data: TelemetryDataPayloadInterface = {
		_wpnonce: nonce,
		action,
		sub_action: subAction
	};

	// Some wizards require a plugin_slug in the payload
	if (pluginSlug) {
		// The shipping wizard needs the plugin slug(s) to come back in an array
		if (action === 'sitebuilder-wizard-shipping') {
			data.pluginSlugs = [pluginSlug];
		} else {
			data.plugin_slug = pluginSlug;
		}
	}

	handleActionRequest(data);
};
