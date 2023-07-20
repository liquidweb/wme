import { Typography } from '@mui/material';
import { useFirstTimeConfiguration } from '@sb/hooks';
import PageWrapper from '../components/PageWrapper';
import { useEffect, useState } from 'react';
import getTemplateStyles, { StyleInterface } from '@ftc/data/styles';
import Template from '../components/styles/Template';
import root from 'react-shadow';

const StyleReview = () => {
	const {
		ftcState: { form },
		kadenceTemplates
	} = useFirstTimeConfiguration();
	const styles = getTemplateStyles();

	const [template, setTemplate] = useState<any>();
	const [theme, setTheme] = useState<StyleInterface>();
	const [fonts, setFonts] = useState<StyleInterface>();

	useEffect(() => {
		if (form) {
			const foundTemplate = kadenceTemplates?.[ form.template?.value ] || {};
			setTemplate(foundTemplate);

			const foundPalette = styles.find((style) => style.id === form.colorPalette?.value);
			setTheme(foundPalette);

			const foundFonts = styles.find((style) => style.id === form.fontPairing?.value);
			setFonts(foundFonts || foundPalette);
		}
	}, [form]);

	return (
		<PageWrapper width="90%">
			{ ! theme || ! template ? (
				<Typography variant="h4" textAlign="center" >No template found!</Typography>
			) : (
				// @ts-ignore
				<root.div >
					<Template slug="customization" rows_html={ template.rows_html } theme={ theme } fontPairing={ fonts } />
				</root.div>
			) }
		</PageWrapper>
	);
};

export default StyleReview;
