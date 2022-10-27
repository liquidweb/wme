import * as React from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { handleActionRequest } from '@moderntribe/wme-utils';
import { GO_LIVE_PROPS } from '@sb/constants';
import { GoLiveStringData } from '@sb/wizards/go-live/data/constants';

import { useGoLive } from './useGoLive';

type UseFindDomain = UseQueryResult<Domain[], unknown> & {
	search: string
  setSearch: (search: string) => void
	selectedDomains: Domain[]
	toggleSelectedDomain: (domain: Domain) => void
}

type Response = {
	domain: Domain
	alternatives: Domain[]
}

export function useFindDomain(): UseFindDomain {
	const {
		goLiveState: { selectedDomains, searchDomain: search },
		setGoLiveState,
	} = useGoLive();
	const { goLiveProviderText: { checkout } } = GoLiveStringData;

	const query = useQuery(['domains', search], async () => {
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
			const newSelected = selected ? prev.filter((_) => _.domain !== domain.domain) : [...prev, domain];

			return {
				...prevGoLiveState,
				selectedDomains: newSelected,
			};
		});
	}
	React.useEffect(() => {
		setGoLiveState((prevGoLiveState) => {
			const { stepsAlternative } = prevGoLiveState;
			if (selectedDomains.length) {
				stepsAlternative[ 0 ].nextText = `${ checkout } (${ selectedDomains.length })`;
				stepsAlternative[ 0 ].disableNext = false;
			} else {
				stepsAlternative[ 0 ].nextText = checkout;
				stepsAlternative[ 0 ].disableNext = true;
			}
			return {
				...prevGoLiveState,
				stepsAlternative,
			};
		});
	}, [selectedDomains.length]);

	function emptySelectedDomains() {
		setGoLiveState((prevGoLiveState) => {
			const { stepsAlternative } = prevGoLiveState;
			stepsAlternative[ 0 ].nextText = checkout;
			stepsAlternative[ 0 ].disableNext = true;
			return {
				...prevGoLiveState,
				stepsAlternative,
				selectedDomains: [],
			};
		});
	}

	function setSearch(newSearch: string) {
		setGoLiveState((prevGoLiceState) => {
			return {
				...prevGoLiceState,
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
