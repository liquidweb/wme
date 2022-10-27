import { WmeListItemCheckoutProps } from '@moderntribe/wme-ui/dist/esm/components/list-item-checkout/list-item-checkout';

function getPrice(price: string, isAvailable: boolean) {
	if (! isAvailable) {
		return undefined;
	}
	return `$${ price } / year`;
}

function getChipLabel(isAvailable: boolean, isSelected: boolean) {
	if (! isAvailable) {
		return 'Taken';
	}
	if (isSelected) {
		return 'Selected';
	}
	return 'Available';
}

function getChipColor(isAvailable: boolean, isSelected: boolean): 'success' | undefined {
	if (! isAvailable || isSelected) {
		return undefined;
	}
	return 'success';
}

export function parseDomainListItem(domain: Domain, selected: boolean): WmeListItemCheckoutProps {
	return ({
		name: domain.domain,
		disabled: ! domain.is_available,
		price: getPrice(domain.package.term_fees[ '12' ], domain.is_available),
		chipLabel: getChipLabel(domain.is_available, selected),
		chipColor: getChipColor(domain.is_available, selected),
		selected,
	});
}
