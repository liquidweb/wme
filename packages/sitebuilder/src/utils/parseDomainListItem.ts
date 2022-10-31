import { sprintf } from '@wordpress/i18n';
import { GoLiveStringData } from '@sb/wizards/go-live/data/constants';

type DomainListItem = {
	name: string,
	disabled: boolean,
	price?: string,
	chipLabel: string,
	chipColor: 'success' | undefined,
	selected: boolean,
}

function getPrice(price: string, isAvailable: boolean) {
	if (! isAvailable) {
		return undefined;
	}
	return sprintf('%1$s %2$s',
		price,
		GoLiveStringData.domainItems.perYear
	);
}

function getChipLabel(isAvailable: boolean, isSelected: boolean) {
	if (! isAvailable) {
		return GoLiveStringData.domainItems.taken;
	}
	if (isSelected) {
		return GoLiveStringData.domainItems.selected;
	}
	return GoLiveStringData.domainItems.available;
}

function getChipColor(isAvailable: boolean, isSelected: boolean): 'success' | undefined {
	if (! isAvailable || isSelected) {
		return undefined;
	}
	return 'success';
}

export function parseDomainListItem(domain: Domain, selected: boolean): DomainListItem {
	return ({
		name: domain.domain,
		disabled: ! domain.is_available,
		price: getPrice(domain.package.term_fees[ '12' ], domain.is_available),
		chipLabel: getChipLabel(domain.is_available, selected),
		chipColor: getChipColor(domain.is_available, selected),
		selected,
	});
}
