import { handleActionRequest } from '../handleActionRequest';

interface TelemetryDataPayloadInterface {
_wpnonce: string;
action: string;
plugin_slug?: string;
sub_action: string;
}

export const handleTelemetryRequest = (
  nonce: string,
  action: string,
  subAction: string = 'wizard_started'
) => {
  const data: TelemetryDataPayloadInterface = {
    _wpnonce: nonce,
    action,
    sub_action: subAction,
  };
  handleActionRequest(data);
};
