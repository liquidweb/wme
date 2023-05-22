import { useFirstTimeConfiguration, useKadencePages } from '@sb/hooks';
import { Box } from '@mui/material';
import getTemplateStyles from '../data/styles';
import { useEffect, useState } from 'react';
import KadenceTemplateItem, { TemplateSelectItemProps } from '../components/KadenceTemplateItem';
import KadenceTemplateGroup from '../components/KadenceTemplateGroup';
import TemplateItemSkeletonItem from '../components/TemplateItemSkeleton';

const StyleSelection = () => {
	const {
		ftcState: { form },
		setFormValue,
		shouldBlockNextStep
	} = useFirstTimeConfiguration();

	const { data, loading } = useKadencePages();
	const [pages, setPages] = useState<TemplateSelectItemProps[]>();
	const styles = getTemplateStyles();

	const handleTemplateChange = (value: string) => {
		setFormValue('template', value);
		shouldBlockNextStep(false, 4);
	};

	useEffect(() => {
		if (! loading && data) {
			const homePageKeys = Object.keys(data).filter((key) => data[ key ].categories.home);
			const homePages = homePageKeys.map((key) => data[ key ]);
			setPages(homePages.slice(0, 8));
		}
	}, [loading, data]);

	return (
		<Box sx={ { width: '90%', minHeight: '100%', paddingTop: '48px' } }>
			<KadenceTemplateGroup>
				{ pages ? pages.map((page, index) => (
					<KadenceTemplateItem
						key={ page.slug }
						{ ...page }
						style={ styles[ index ] }
						onClick={ handleTemplateChange }
						selected={ page.slug === form.template.value }
					/>
				)) : (
					Array.from('123456').map((key) => (
						<TemplateItemSkeletonItem key={ key } />
					))
				) }
			</KadenceTemplateGroup>
		</Box>
	);
};

export default StyleSelection;
