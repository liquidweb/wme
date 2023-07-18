import { SelectInput } from '@moderntribe/wme-ui';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { FtcStringData } from '@ftc/data/constants';
import { useEffect } from 'react';
import { FtcFormItemsInterface } from '../data/ftc-form';
import PageWrapper from '@ftc/components/PageWrapper';
import { Box, ImageList, ImageListItem, MenuItem, SelectChangeEvent, Typography } from '@mui/material';
import KadenceTemplateGroup from '../components/styles/KadenceTemplateGroup';

const { imageCollection } = FtcStringData;

const imageCollections = ['My Collection', 'Your Collection', 'Your Mom\'s Collection'];
const collectionGroups = [
	{
		name: 'Featured',
		images: [
			'https://images.pexels.com/photos/797793/pexels-photo-797793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/1207978/pexels-photo-1207978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/4505447/pexels-photo-4505447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/2086862/pexels-photo-2086862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/796620/pexels-photo-796620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/1207978/pexels-photo-1207978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/2086862/pexels-photo-2086862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		]
	},
	{
		name: 'Background',
		images: [
			'https://images.pexels.com/photos/797793/pexels-photo-797793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/1207978/pexels-photo-1207978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/4505447/pexels-photo-4505447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/2086862/pexels-photo-2086862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/796620/pexels-photo-796620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/1207978/pexels-photo-1207978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/2086862/pexels-photo-2086862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		]
	}
];

const SiteDetails = () => {
	const { ftcState: { form, isLoading }, setFormValue, shouldBlockNextStep } = useFirstTimeConfiguration();

	useEffect(() => {
		if (form && ! isLoading) {
			shouldBlockNextStep(! form.siteName.value);
			if (! form.imageCollection.value) {
				setFormValue('imageCollection', imageCollections[ 0 ]);
			}
		}
	}, [form, isLoading]);

	const handleChange = (prop: keyof FtcFormItemsInterface) => (event: SelectChangeEvent<any>) => {
		setFormValue(prop, event.target.value);
	};

	return (
		<PageWrapper width="90%">
			<Box sx={ { display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '48px' } }>
				<Typography variant="body1" fontWeight={ 600 }>{ imageCollection.label }</Typography>
				<SelectInput
					fullWidth
					sx={ { maxWidth: '400px' } }
					onChange={ handleChange('imageCollection') }
					value={ form.imageCollection.value }
				>
					{ imageCollections.map((opt) => (
						<MenuItem key={ opt } value={ opt }>
							{ opt }
						</MenuItem>
					)) }
				</SelectInput>
			</Box>
			<KadenceTemplateGroup>
				{ collectionGroups.map((item) => (
					<Box key={ item.name }
						sx={ {
							border: '1px solid',
							borderColor: 'border.ui',
							padding: 3,
							display: 'flex',
							flexDirection: 'column',
							gap: 2
						} }
					>
						<Box sx={ { textAlign: 'center' } }>
							<Typography variant="body1" sx={ { fontWeight: 600, marginBottom: '16px' } }>{ item.name }</Typography>
							<Typography variant="body2">We’ll need some copy here that explains that these are from keywords and that they can edit this, or that its a pre-made collection for them to use.</Typography>
						</Box>
						<ImageList sx={ { width: '100%', height: 'auto', '& li': { marginBottom: 0 } } } cols={ 3 } gap={ 4 }>
							{ item.images.map((image) => (
								<ImageListItem key={ image }>
									<img
										alt="plants"
										width="200px"
										src={ image }
										srcSet={ image }
										loading="lazy"
										style={ { objectFit: 'cover', aspectRatio: '1/1' } }
									/>
								</ImageListItem>
							)) }
						</ImageList>
						<Box sx={ { borderTop: '1px solid', borderColor: 'border.ui', paddingTop: '16px', textAlign: 'center' } }>
							<a href={ `${ window.location.origin }/wp-admin/upload.php` } target="_blank" rel="noreferrer">Edit Collection</a>
						</Box>
					</Box>
				)) }
			</KadenceTemplateGroup>
		</PageWrapper>
	);
};

export default SiteDetails;
