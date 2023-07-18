import { formatKadencePages, useFirstTimeConfiguration } from '@sb/hooks';
import { Box } from '@mui/material';
import getTemplateStyles from '../data/styles';
import { useEffect, useState } from 'react';
import KadenceTemplateItem, { TemplateSelectItemProps } from '../components/styles/KadenceTemplateItem';
import KadenceTemplateGroup from '../components/styles/KadenceTemplateGroup';
import TemplateItemSkeletonItem from '../components/styles/TemplateItemSkeleton';
import TemplateFilter, { FilterOption } from '../components/styles/TemplateFilter';
import PageWrapper from '../components/PageWrapper';

const StyleSelection = () => {
	const {
		ftcState: { form },
		setFormValue,
		shouldBlockNextStep,
		kadenceTemplates
	} = useFirstTimeConfiguration();
	const [pages, setPages] = useState<TemplateSelectItemProps[]>();
	const [filteredPages, setFilteredPages] = useState<TemplateSelectItemProps[]>();
	const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
	const [selectedTemplate, setTemplate] = useState(form.template.value);
	const styles = getTemplateStyles();

	useEffect(() => {
		if (kadenceTemplates) {
			const parsed = formatKadencePages(kadenceTemplates);
			setPages(parsed.pages);
			setFilteredPages(parsed.pages);
			setFilterOptions(parsed.filterOptions);
		}
	}, [kadenceTemplates]);

	const filterTemplates = (targets: FilterOption[]) => {
		if (targets.length > 0) {
			setFilteredPages(pages?.filter((page) => {
				for (const option of targets) {
					if (page.page_styles[ option.value ]) {
						return true;
					}
				}
				return false;
			}));
		} else {
			setFilteredPages(pages);
		}
	};

	const setStyles = (templateSlug: string, styleId: string) => {
		setTemplate(templateSlug);
		setFormValue('template', templateSlug);
		setFormValue('colorPalette', styleId);
		setFormValue('fontPairing', styleId);
		shouldBlockNextStep(false);
	};

	return (
		<PageWrapper width="90%">
			<Box sx={ { display: 'flex', justifyContent: 'space-between' } }>
				<TemplateFilter
					options={ filterOptions }
					updateSelected={ filterTemplates }
				/>
			</Box>
			<KadenceTemplateGroup>
				{ filteredPages ? filteredPages.map((page) => (
					<KadenceTemplateItem
						key={ page.slug }
						{ ...page }
						style={ styles[ page.defaultStyleIndex || 0 ] }
						onClick={ (selected) => setStyles(selected, styles[ page.defaultStyleIndex || 0 ].id) }
						selected={ page.slug === selectedTemplate }
					/>
				)) : (
					Array.from('1234').map((key) => (
						<TemplateItemSkeletonItem key={ key } />
					))
				) }
			</KadenceTemplateGroup>
		</PageWrapper>
	);
};

export default StyleSelection;
