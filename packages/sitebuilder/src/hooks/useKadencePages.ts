import { handleActionRequest } from '@moderntribe/wme-utils';
import { useEffect, useState } from 'react';
import { WIZARDS } from '@sb/constants';
import { TemplateSelectItemProps } from '@sb/wizards/first-time-configuration/components/styles/KadenceTemplateItem';
import { FilterOption } from '@sb/wizards/first-time-configuration/components/styles/TemplateFilter';
import getTemplateStyles from '@ftc/data/styles';

export function useKadencePages() {
	const [data, setData] = useState<any>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<any>();

	const ajax = WIZARDS.look_and_feel?.ajax;

	useEffect(() => {
		const request = {
			_wpnonce: ajax?.nonce ? ajax.nonce : '',
			action: ajax.action,
			sub_action: 'kadence_cloud_section_data',
		};
		handleActionRequest(request)
			.then((resp: any) => {
				setData(resp);
			})
			.catch(setError)
			.finally(() => setLoading(false));
	}, []);

	return {
		loading,
		error,
		data
	};
}

export function formatKadencePages(data: any): { pages: TemplateSelectItemProps[], filterOptions: FilterOption[] } {
	const styles = getTemplateStyles();

	if (data) {
		const homePageKeys = Object.keys(data).filter((key) => data[ key ].categories.home);
		const homePages = homePageKeys.map((key, index) => {
			return {
				...data[ key ]
			};
		});

		const pageStyles = homePages.reduce((acc, page) => {
			return {
				...acc,
				...page.page_styles
			};
		}, {});

		const numOfLoops = (homePages.length % styles.length) + styles.length;

		const totalPages: TemplateSelectItemProps[] = [];
		for (let i = 0; i <= numOfLoops; i++) {
			const pagesWithStyleIndex = homePages.map((page, index) => ({
				...page,
				defaultStyleIndex: (i + index) % 8
			}));
			totalPages.push(...pagesWithStyleIndex);
		}

		const pageStylesArr = Object.keys(pageStyles).map((key) => ({ value: key, label: pageStyles[ key ] }));
		return {
			pages: totalPages,
			filterOptions: pageStylesArr
		};
	}

	return {
		pages: [],
		filterOptions: []
	};
}
