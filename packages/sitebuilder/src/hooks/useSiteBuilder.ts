import { useContext } from 'react';
import { SiteBuilderContext, SiteBuilderContextInterface } from '@sb/contexts/SiteBuilderProvider';

export function useSiteBuilder() {
	const {
		siteBuilderState,
		setSiteBuilderState
	} = useContext(SiteBuilderContext) as SiteBuilderContextInterface;
	return {
		siteBuilderState,
		setSiteBuilderState
	};
}
