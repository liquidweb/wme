import { useMutation } from '@tanstack/react-query';
import { handleActionRequest } from '@moderntribe/wme-utils';
import { GO_LIVE_PROPS } from '@sb/constants';

export interface Response {
  action: string
  data: any
  callback_url: string
  return_url: any
  uuid: string
  site_id: number
  outcome: Outcome
}

export interface Outcome {
  status: string
  details: Details
}

export interface Details {
  id: number
  identity: string
  scope: string
  purchased_domain: string
}

async function createPurchaseFlow(domains: { domainName: string, packageId: number}[]) {
	const goLiveNonce = GO_LIVE_PROPS.ajax?.nonce || '';
	const goLiveAction = GO_LIVE_PROPS.ajax?.action || '';
	const response: any = await handleActionRequest({
		_wpnonce: goLiveNonce,
		action: goLiveAction,
		sub_action: 'create-purchase-flow',
		domains: domains.map(({ domainName, packageId }) => ({ domain_name: domainName, package_id: packageId })),
	});
	return response as Response;
}

export function useCreatePurchaseFlow() {
	const mutation = useMutation(
		createPurchaseFlow,
		{
			onSuccess: (data) => {
				window.location.href = `https://my.nexcess.net/external/login?id=${ data.uuid }&theme=storebuilder`;
			},
		}
	);

	return mutation;
}
