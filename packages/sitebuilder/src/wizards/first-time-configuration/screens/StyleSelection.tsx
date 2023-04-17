import { useFirstTimeConfiguration } from '@sb/hooks';
// import { TemplateSelectGroup, TemplateSelectItem } from '@moderntribe/wme-ui';
import { Box } from '@mui/material';
import getKadenceDOMContent, {
	buildPageContent
} from '../data/kadenceDOMContent';
import getTemplateStyles from '../data/styles';
import { parse } from '@wordpress/block-serialization-default-parser';
import KadenceTemplatePreview, {
	KadenceTemplatePreviewProps
} from '../components/KadenceTemplatePreview';
import { useEffect, useState } from 'react';

const StyleSelection = () => {
	const {
		ftcState: { form },
		setFormValue,
		shouldBlockNextStep
	} = useFirstTimeConfiguration();

	const kadenceContent = getKadenceDOMContent();
	const [pages, setPages] = useState<KadenceTemplatePreviewProps[]>();
	const styles = getTemplateStyles();

	// const handleTemplateChange = (value: string) => {
	// 	setFormValue('template', value);
	// 	shouldBlockNextStep(false, 4);
	// };

	useEffect(() => {
		console.log(kadenceContent);
		if (kadenceContent) {
			const rawPages = [
				kadenceContent[ 'd849560fd8af5d85d36cd0927955a7bc-7365' ]
			];
			rawPages.push(
				kadenceContent[ 'd849560fd8af5d85d36cd0927955a7bc-7366' ]
			);
			const formatted = rawPages.map((item) => {
				const formattedRows = buildPageContent(item.rows);
				return {
					slug: item.slug,
					name: item.name,
					rows: parse(formattedRows)
				} as KadenceTemplatePreviewProps;
			});
			console.log('pages', formatted);
			setPages(formatted);
		}
	}, []);

	return (
		// Padding/margin doesn't take effect here - using a percent width instead
		<Box sx={ { width: '95%', height: '100%' } }>
			{ pages?.map((page, index) => (
				<KadenceTemplatePreview key={ page.slug } style={styles[index]} { ...page } />
			)) }
			{ /* <TemplateSelectGroup>
				{ templateData.map((template) => (
					<TemplateSelectItem
						key={ template.id }
						imageSrc={ template.image }
						imageAlt={ 'Theme preview image' }
						websiteSrc={ template.embed }
						selected={ form.template.value === template.id }
						onClick={ () => handleTemplateChange(template.id) }
					/>
				)) }
			</TemplateSelectGroup> */ }
		</Box>
	);
};

export default StyleSelection;
