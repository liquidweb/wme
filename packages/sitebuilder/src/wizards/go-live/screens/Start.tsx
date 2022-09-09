import React from 'react';
import { Box, Link, Typography, useTheme } from '@mui/material';
import { CardSelectGroup, CardSelectItem, WizardSectionTitle } from '@stellarwp/wme-ui';
import { OpenInNew } from '@mui/icons-material';
import { __ } from '@wordpress/i18n';
import { IMAGE_DIR, NEXCESS_DOMAIN_REGISTRATION_URL } from '@sb/constants';
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
	const { goLiveState: { hasDomain, showGetDomain }, setHasDomain } = useGoLive();
	const { start: {
		screenTitle1,
		screenTitle2,
		screenDescription1,
		screenDescription2,
		actionLabel,
		actionTitle1,
		actionTitle2,
		actionContent1,
		actionContent2
	} } = GoLiveStringData;

	const title = showGetDomain ? screenTitle2 : screenTitle1;
	const description = showGetDomain ? screenDescription2 : screenDescription1;

	const cardSx = {
		'& .WmeCardSelectItem-root': {
			paddingLeft: 2,
			paddingRight: 2,
		}
	};

	const registerSx = {
		display: 'flex',
		alignItems: 'center',
		fontWeight: 500,
		cursor: 'pointer',
		'& .MuiSvgIcon-root': {
			fontSize: '1.25rem',
			marginLeft: '8px',
		}
	};

	const handleDomainPurchased = (event: React.MouseEvent<HTMLElement>, value:string) => {
		setHasDomain(value);
	};

	const handleRegisterDomainClick = () => {
		setHasDomain('yes');

		if (NEXCESS_DOMAIN_REGISTRATION_URL) {
			window.open(NEXCESS_DOMAIN_REGISTRATION_URL, '_blank');
		}
	};

	return (
		<Box sx={ { maxWidth: 425 } }>{ showGetDomain
			? <>
				<WizardSectionTitle
					heading={ title }
					headingVariant="h1"
					copy={ description }
					copyVariant="h4"
					iconSrc={ `${ IMAGE_DIR }/nexcess-logo.png` }
					sx={ {
						marginBottom: 4,

						'& .WmeWizardSectionTitle-iconContainer img': {
							width: '114px',
							height: '30px',
						}
					} }
				/>
				<Link
					variant="body2"
					underline="hover"
					target="_blank"
					sx={ registerSx }
					onClick={ handleRegisterDomainClick }
				>
					{ __('Register A Domain With Nexcess', 'nexcess-mapps') }
					<OpenInNew />
				</Link>
			</>
			: <>
				<WizardSectionTitle
					heading={ title }
					headingVariant="h1"
					copy={ description }
					copyVariant="h4"
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
			</>
		}
		</Box>
	);
};

export default Start;
