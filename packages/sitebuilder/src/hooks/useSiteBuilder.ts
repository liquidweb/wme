import { useContext } from '@wordpress/element';
import { SiteBuilderContext, SiteBuilderContextInterface } from '@sb/contexts/SiteBuilderProvider';

export function useSiteBuilder() {
	const {
		siteBuilderState,
		setSiteBuilderState,
		setScrollPosition
	} = useContext(SiteBuilderContext) as SiteBuilderContextInterface;
	return {
		siteBuilderState,
		setSiteBuilderState,
		setScrollPosition
	};
}
