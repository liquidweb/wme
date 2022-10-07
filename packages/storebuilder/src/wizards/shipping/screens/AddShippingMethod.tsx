import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { Box, Typography } from '@mui/material';
import { CardSelectGroup, CardSelectItem, Chip } from '@stellarwp/wme-ui';
import { pxToRem } from '@store/utils';
import { IMAGE_DIR, SHIPPING_PROPS, USPS_PLUGIN_SLUG } from '@store/constants';
import { useShipping } from '@store/hooks';

import { ShippingStringData } from '@shipping/data/constants';

const cardSx = {
	'& .WmeCardSelectItem-root': {
		paddingLeft: 2,
		paddingRight: 2,
	},
	'& .WmeCardSelectItem-footer': {
		marginLeft: -0.5,
		marginRight: -0.5,
	}
};

const AddShippingMethod = () => {

	const { addShippingMethod: {
		title,
		card1,
		card2
	} } = ShippingStringData;

	const { shippingState: {
			activatedProviders,
			shippingProviders
		}, 
		setShippingProviders 
	} = useShipping();
	// const { nonce, action } = SHIPPING_PROPS?.ajaxTelemetry?.started || '';
	const pluginSlug = USPS_PLUGIN_SLUG;

	const handleShippingSelection = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => {
		if (value && Array.isArray(value)) {
			setShippingProviders(value);
		}
	};

	// useEffect(() => {
	// 	handleTelemetryRequest(nonce, action, pluginSlug);
	// }, []);

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
					// sx={ cardSx }
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
						primary={ card1.title }
						secondary={ card1.content }
						footer={ card1.footer }
						sx={ {
							'&.Mui-disabled.Mui-selected .WmeCardSelectItem-icon': {
								backgroundColor: '#f5f5f5',
							},
						} }
					/>
					<CardSelectItem
						icon={ `${ IMAGE_DIR }${ card2.img.src }` }
						value="elex-usps-shipping-method"
						primary={ card2.title }
						secondary={ card2.content }
						footer={ card2.footer }
						completedIcon={ activatedProviders.includes('elex-usps-shipping-method') && (
							<Chip
								size="small"
								color="success"
								label={ __('Active', 'nexcess-mapps') }
							/>
						) }
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
