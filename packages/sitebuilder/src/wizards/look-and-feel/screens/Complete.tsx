import React from 'react';
import { WizardSectionTitle, Button } from '@moderntribe/wme-ui';
import { Box, Typography } from '@mui/material';
import { lookAndFeelConsts } from '@look-and-feel/data/constants';
import { IMAGE_DIR, LOOK_AND_FEEL_PROPS, SITEBUILDER_URL } from '@sb/constants';

const designStepSx = {
	backgroundColor: '#FAFAFA',
	backgroundImage: `url(${ IMAGE_DIR }setup-background.png)`,
	backgroundPosition: 'top -50px right',
	backgroundRepeat: 'no-repeat',
	width: '280px',
	position: 'absolute',
	right: 0,
	height: 'calc(100vh - 180px)',
	top: '50%',
	transform: 'translateY(-50%)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',

	'& .MuiButton-endIcon': {
		position: 'absolute',
		transition: 'all ease .3s',
		opacity: 0,
		right: '16px',
	},
};

const handleRedirect = () => {
	window.location.assign(LOOK_AND_FEEL_PROPS?.storeDetailsURL || SITEBUILDER_URL);
};

const Complete = () => {
	const { complete: { description, title, designStepTitleText, designStepButtonText } } = lookAndFeelConsts;

	return (
		<Box sx={ { maxWidth: 425 } }>
			<WizardSectionTitle
				bookend
				copy={ description }
				heading={ title }
				headingVariant="h2"
				iconAlt={ title }
				iconSrc={ `${ IMAGE_DIR }party-emoji.png` }
				sx={ {
					img: {
						maxWidth: '86px',
					}
				} }
				width="425px"
			/>

			<Box sx={ designStepSx }>
				<Box sx={ {
					width: '181px',
					height: '198px',
					backgroundImage: `url(${ IMAGE_DIR }ftc-design-preview.png)`,
					backgroundSize: 'contain',
					filter: 'drop-shadow(0px 12px 36px rgba(41, 50, 84, 0.1))',
					mb: 3,
				} } />
				<Typography
					variant="h3"
					component="h3"
					mb={ 2 }
					sx={ {
						maxWidth: '190px',
					} }
					align={ 'center' }>
					{ designStepTitleText }
				</Typography>
				<Button
					onClick={ handleRedirect }
					variant="contained"
					color="primary"
				>
					{ designStepButtonText }
				</Button>
				<Box sx={ {
					fontSize: '10px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'absolute',
					bottom: '40px',
				} }>
				</Box>
			</Box>
		</Box>
	);
};

export default Complete;
