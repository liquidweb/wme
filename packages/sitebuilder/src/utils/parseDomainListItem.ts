import { sprintf, _n } from '@wordpress/i18n';
import { GoLiveStringData } from '@sb/wizards/go-live/data/constants';

type DomainListItem = {
	name: string,
	disabled: boolean,
	price?: string,
	chipLabel: string,
	chipColor: 'success' | undefined,
	selected: boolean,
}

function getPrice(termFees: DomainTermFees, isAvailable: boolean) {
	if (! isAvailable) {
		return undefined;
	}

	// Get the terms available for this domain.
	const terms = Object.keys(termFees);
	const shortestTerm = Math.min(...terms.map((term) => Number(term)));
	const termToYear = shortestTerm / 12;
	const price = termFees[ shortestTerm ];

	// eslint-disable-next-line @wordpress/i18n-translator-comments
	const perYear = _n('year', 'years', termToYear, 'nexcess-mapps');

	return sprintf('%1$s / %2$s %3$s',
		price,
		termToYear,
		perYear
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
		price: getPrice(domain.package.term_fees, domain.is_available),
		chipLabel: getChipLabel(domain.is_available, selected),
		chipColor: getChipColor(domain.is_available, selected),
		selected,
	});
}
