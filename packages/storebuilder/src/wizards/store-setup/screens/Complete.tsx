import React from 'react';
import { WizardSectionTitle, Button } from '@stellarwp/wme-ui';
import { Box, Typography } from '@mui/material';
import { useStoreSetup } from '@store/hooks';
import ScreenWrapper from '@setup/ScreenWrapper';
import { KadenceIcon } from '@store/logos';
import { FtcStringData } from '@setup/data/constants';
import { IMAGE_DIR } from '@store/constants';

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

const Complete = () => {
	const { submitForm } = useStoreSetup();
	const { complete } = FtcStringData;

	return (
		<ScreenWrapper sx={ { maxWidth: 425 } }>
			<WizardSectionTitle
				bookend
				copy={ complete.description }
				heading={ complete.title }
				headingVariant="h2"
				iconAlt={ complete.title }
				iconSrc={ `${ IMAGE_DIR }ftc-complete.png` }
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
						fontWeight: 500,
						maxWidth: '190px',
						letterSpacing: '-0.05em',
					} }
					align={ 'center' }>
					{ complete.designStepTitleText }
				</Typography>
				<Button
					onClick={ () => submitForm(true) }
					variant="contained"
					sx={ {
						backgroundColor: 'primary.dark',
					} }>
					{ complete.designStepButtonText }
				</Button>
				<Box sx={ {
					fontSize: '10px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'absolute',
					bottom: '40px',
				} }>
					<Box mr={ 1 } sx={ { display: 'flex' } }>
						<KadenceIcon />
					</Box>
					{ complete.poweredByText }
					<Box
						component="div"
						sx={ {
							textDecoration: 'underline',
							marginLeft: '4px',
							'& a': {
								color: 'primary.dark',
							},
						} }>
						<a href="https://kadencewp.com/" target="_blank" rel="noreferrer">Kadence</a>
					</Box>
				</Box>
			</Box>
		</ScreenWrapper>
	);
};

export default Complete;
