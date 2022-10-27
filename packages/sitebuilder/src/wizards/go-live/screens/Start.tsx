import React from 'react';
import { Box, Link, Typography, useTheme } from '@mui/material';
import { CardSelectGroup, CardSelectItem, WizardSectionTitle } from '@moderntribe/wme-ui';
import { __ } from '@wordpress/i18n';
import { IMAGE_DIR } from '@sb/constants';
import { useGoLive } from '@sb/hooks';
import { GoLiveStringData } from '../data/constants';

const PoweredByNexcessFooter = () => {
	const theme = useTheme();
	const footerSx = {
		fontSize: 10,
		textTransform: 'initial',
		color: theme.palette.text.primary,
		lineHeight: 1.6,
		marginTop: 2,
	};

	return (
		<Typography sx={ footerSx }>
			{ `${ __('Powered by', 'nexcess-mapps') } ` }
			<Link underline="hover" href="https://www.nexcess.net/" target="_blank">{ __('Nexcess', 'nexcess-mapps') }</Link>
		</Typography>
	);
};

const Start = () => {
	const { goLiveState: { hasDomain }, setHasDomain } = useGoLive();
	const { start: {
		screenTitle1: title,
		screenDescription1: description,
		actionLabel,
		actionTitle1,
		actionTitle2,
		actionContent1,
		actionContent2
	} } = GoLiveStringData;

	const handleDomainPurchased = (event: React.MouseEvent<HTMLElement>, value:string) => {
		setHasDomain(value);
	};

	const cardSx = {
		'& .WmeCardSelectItem-root': {
			paddingLeft: 2,
			paddingRight: 2,
		}
	};

	return (
		<Box sx={ { maxWidth: 425 } }>
			<WizardSectionTitle
				heading={ title }
				headingVariant="h2"
				copy={ description }
				copyVariant="body2"
				sx={ { marginBottom: 4.5 } }
			/>
			<Typography variant="body2" mb={ 2 } fontWeight={ 600 }>
				{ actionLabel }
			</Typography>
			<CardSelectGroup
				sx={ cardSx }
				exclusive
				cardColumns={ 2 }
				cardSpacing={ 1 }
				cardPadding="md"
				value={ hasDomain }
				onChange={ handleDomainPurchased }
			>
				<CardSelectItem
					icon={ `${ IMAGE_DIR }site-domain-checkmark.png` }
					value="yes"
					primary={ actionTitle1 }
					secondary={ actionContent1 }
				/>
				<CardSelectItem
					icon={ `${ IMAGE_DIR }site-domain-cart.png` }
					value="no"
					primary={ actionTitle2 }
					secondary={ actionContent2 }
					footer={ <PoweredByNexcessFooter /> }
				/>
			</CardSelectGroup>
		</Box>
	);
};

export default Start;
