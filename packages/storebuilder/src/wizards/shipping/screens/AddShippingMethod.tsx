import React from 'react';
import { __ } from '@wordpress/i18n';
import { Box, Typography } from '@mui/material';
import { CardSelectGroup, CardSelectItem, Chip } from '@stellarwp/wme-ui';
import { pxToRem } from '@store/utils';
import { IMAGE_DIR, USPS_PLUGIN_SLUG } from '@store/constants';
import { useShipping } from '@store/hooks';

import { ShippingStringData } from '@shipping/data/constants';

const cardSx = {
	'& .WmeCardSelectItem-footer': {
		marginLeft: -2,
		marginRight: -2,
	}
};

const AddShippingMethod = () => {
	const { addShippingMethod: {
		title,
		card1,
		card2
	} } = ShippingStringData;

	const { shippingState: {
		shippingProviders
	},
	setShippingProviders
	} = useShipping();

	const pluginSlug = USPS_PLUGIN_SLUG;

	const handleShippingSelection = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => {
		if (value && Array.isArray(value)) {
			setShippingProviders(value);
		}
	};

	return (
		<Box sx={ { maxWidth: 544 } }>{
			<>
				<Typography
					sx={ { fontSize: pxToRem(32) } }
					variant="h3"
					component="h2"
					textAlign="center"
					mb={ 4.5 }
				>
					{ title }
				</Typography>
				<CardSelectGroup
					sx={ cardSx }
					cardColumns={ 2 }
					cardSpacing={ 1 }
					cardPadding="md"
					value={ shippingProviders }
					onChange={ handleShippingSelection }
				>
					<CardSelectItem
						icon={ `${ IMAGE_DIR }${ card1.img.src }` }
						value="yes"
						selected
						disabled
						completedIcon={
							<Chip
								size="small"
								color="success"
								label={ __('Active', 'nexcess-mapps') }
							/>
						}
						primary={
							<Typography variant="body2" mb={ 1 } fontWeight="600">{ card1.title }</Typography>
						}
						secondary={
							<Typography variant="body2" fontSize="12px">{ card1.content }</Typography>
						}
						footer={ card1.footer }
						sx={ {
							'&.Mui-disabled.Mui-selected .WmeCardSelectItem-icon': {
								backgroundColor: '#f5f5f5',
							},
						} }
					/>
					<CardSelectItem
						icon={ `${ IMAGE_DIR }${ card2.img.src }` }
						value={ pluginSlug }
						primary={
							<Typography variant="body2" mb={ 1 } fontWeight="600">{ card2.title }</Typography>
						}
						secondary={
							<Typography variant="body2" fontSize="12px">{ card2.content }</Typography>
						}
						footer={ card2.footer }
						sx={ {
							'.WmeCardSelectItem-icon img': {
								width: '38px',
							}
						} }
					/>
				</CardSelectGroup>
			</>
		}
		</Box>
	);
};

export default AddShippingMethod;
