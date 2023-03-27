import { useEffect } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { handleActionRequest } from '@moderntribe/wme-utils';
import { GO_LIVE_PROPS, SITE_DOMAIN_DATA } from '@site/constants';
import { useDomainPurchase } from '@site/hooks/useDomainPurchase';

type UseFindDomainProps = {
	maxSelectedDomains: number;
}

type UseFindDomain = UseQueryResult<Domain[], Error[]> & {
	search: string
	setSearch: (search: string) => void
	selectedDomains: Domain[]
	toggleSelectedDomain: (domain: Domain) => void
}

type Response = {
	domain: Domain
	alternatives: Domain[]
}
type Error = {
	code?: string
	message?: string
}

export function useFindDomain(props?: UseFindDomainProps): UseFindDomain {
	const {
		goLiveState: { selectedDomains, searchDomain: search },
		setGoLiveState,
	} = useDomainPurchase();
	const { maxSelectedDomains = 1 } = props || {};
	const { goLiveProviderText: { checkout } } = SITE_DOMAIN_DATA;

	const query = useQuery<Response, Error[], Domain[]>(['domains', search], async () => {
		const goLiveNonce = GO_LIVE_PROPS.ajax?.nonce || '';
		const goLiveAction = GO_LIVE_PROPS.ajax?.action || '';
		const response: any = await handleActionRequest({
			_wpnonce: goLiveNonce,
			action: goLiveAction,
			sub_action: 'search-domains',
			domain: search
		});
		return response as Response;
	}, {
		select: (data) => {
			if (! data) {
				return [];
			}
			return [
				data.domain,
				...data.alternatives,
			].filter((_) => _);
		},
		enabled: !! search,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});

	function toggleSelectedDomain(domain: Domain) {
		const selected = selectedDomains.find((_) => _.domain === domain.domain);
		setGoLiveState((prevGoLiveState) => {
			const { selectedDomains: prev } = prevGoLiveState;
			const newSelected = selected ? prev.filter((_) => _.domain !== domain.domain) : [domain, ...prev];
			return {
				...prevGoLiveState,
				selectedDomains: newSelected.slice(0, maxSelectedDomains),
			};
		});
	}
	useEffect(() => {
		setGoLiveState((prevGoLiveState) => {
			const { steps } = prevGoLiveState;
			if (selectedDomains.length) {
				steps[ 0 ].nextText = `${ checkout } (${ selectedDomains.length })`;
				steps[ 0 ].disableNext = false;
			} else {
				steps[ 0 ].nextText = checkout;
				steps[ 0 ].disableNext = true;
			}
			return {
				...prevGoLiveState,
				steps,
			};
		});
	}, [selectedDomains.length]);

	function emptySelectedDomains() {
		setGoLiveState((prevGoLiveState) => {
			const { steps } = prevGoLiveState;
			steps[ 0 ].nextText = checkout;
			steps[ 0 ].disableNext = true;
			return {
				...prevGoLiveState,
				steps,
				selectedDomains: [],
			};
		});
	}

	function setSearch(newSearch: string) {
		setGoLiveState((prevGoLiveState) => {
			return {
				...prevGoLiveState,
				searchDomain: newSearch,
			};
		});
		emptySelectedDomains();
	}

	return {
		...query,
		search,
		setSearch,
		selectedDomains,
		toggleSelectedDomain,
	};
}
