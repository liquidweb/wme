import getTemplateStyles from '@ftc/data/styles';
import { useMemo, useState } from 'react';

const GoogleFonts = () => {
	const styles = getTemplateStyles();
	// This will load the link tag asynchronously
	const [mediaType, setMediaType] = useState('print');

	const fontsUrl = useMemo(() => {
		if (styles && styles.length > 0) {
			const uniqueFamilies = styles.reduce((acc, item) => {
				return {
					...acc,
					[ item.baseFont ]: item.baseFont,
					[ item.headingFont ]: item.headingFont
				};
			}, {});
			const familiesArray = Object.keys(uniqueFamilies).map((key) => `family=${ key.replace(/ /g, '+') }`);
			return `//fonts.googleapis.com/css2?${ familiesArray.join('&') }&display=swap`;
		}
	}, [styles]);

	const onLinkLoad = () => {
		setMediaType('all');
	}

	if (! fontsUrl) {
		<span style={ { display: 'hidden' } }>Waiting to load template fonts...</span>;
	}
	return (
		<link href={ fontsUrl } rel="stylesheet" type="text/css" media={ mediaType } onLoad={ onLinkLoad }></link>
	)
};

export default GoogleFonts;
