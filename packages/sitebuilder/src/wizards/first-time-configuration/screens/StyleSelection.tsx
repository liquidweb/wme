import { useFirstTimeConfiguration, useKadencePages } from '@sb/hooks';
import { Box } from '@mui/material';
// import getTemplateStyles from '../data/styles';
import { useEffect, useState } from 'react';
import KadenceTemplateItem, { TemplateSelectItemProps } from '../components/KadenceTemplateItem';
import KadenceTemplateGroup from '../components/KadenceTemplateGroup';

const StyleSelection = () => {
	// const {
	// 	ftcState: { form },
	// 	setFormValue,
	// 	shouldBlockNextStep
	// } = useFirstTimeConfiguration();

	const { data, loading, error } = useKadencePages();
	const [pages, setPages] = useState<TemplateSelectItemProps[]>();
	// const styles = getTemplateStyles();

	// const handleTemplateChange = (value: string) => {
	// 	setFormValue('template', value);
	// 	shouldBlockNextStep(false, 4);
	// };

	useEffect(() => {
		if (! loading && data) {
			console.log('Kadence pages', data);
			const homePageKeys = Object.keys(data).filter((key) => data[ key ].name.includes('Home'));
			setPages(homePageKeys.map((key) => data[ key ]));
		}

		if (! loading && error) {
			console.log('Error', error);
		}
	}, [loading, data]);

	return (
		// Padding/margin doesn't take effect here - using a percent width instead
		<Box sx={ { width: '95%', minHeight: '100%' } }>
			<KadenceTemplateGroup>
				{ pages?.map((page) => (
					<KadenceTemplateItem key={ page.slug } { ...page } />
				)) }
			</KadenceTemplateGroup>
		</Box>
	);
};

export default StyleSelection;
