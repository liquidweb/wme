import { sprintf, _n } from '@wordpress/i18n';
import { SITE_DOMAIN_DATA }	from '@site/constants';

type DomainListItem = {
	name: string,
	disabled: boolean,
	price?: string,
	chipLabel: string,
	chipColor: 'success' | undefined,
	selected: boolean,
}

function getPrice(termFees: DomainTermFees | undefined, isAvailable: boolean) {
	if (! termFees || ! isAvailable) {
		return undefined;
	}

	// Get the terms available for this domain.
	const terms = Object.keys(termFees);
	const shortestTerm = Math.min(...terms.map((term) => Number(term)));
	const termToYear = shortestTerm / 12;
	const price = termFees[ shortestTerm ];

	// eslint-disable-next-line @wordpress/i18n-translator-comments
	const perYear = _n('year', 'years', termToYear, 'moderntribe-sitebuilder');

	return sprintf('%1$s / %2$s %3$s',
		price,
		termToYear,
		perYear
	);
}

function getChipLabel(domain: Domain, isSelected: boolean) {
	if (! domain.package) {
		return SITE_DOMAIN_DATA.domainItems.unavailable;
	}
	if (! domain.is_available) {
		return SITE_DOMAIN_DATA.domainItems.taken;
	}
	if (isSelected) {
		return SITE_DOMAIN_DATA.domainItems.selected;
	}
	return SITE_DOMAIN_DATA.domainItems.available;
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
		price: getPrice(domain.package?.term_fees, domain.is_available),
		chipLabel: getChipLabel(domain, selected),
		chipColor: getChipColor(domain.is_available, selected),
		selected,
	});
}
