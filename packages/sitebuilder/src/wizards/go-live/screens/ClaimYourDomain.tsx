import {
	Box,
	Typography
} from '@mui/material';
import { __, sprintf } from '@wordpress/i18n';
import { useSearchParams } from 'react-router-dom';
import { IMAGE_DIR } from '@sb/constants';
import { GoLiveStringData } from '../data/constants';

const ClaimYourDomain = () => {
	const {
		claimYourDomain: {
			screenTitle,
			screenDescription,
		}
	} = GoLiveStringData;
	const [searchParams] = useSearchParams();

	// TODO: Make it works with more than one domain.
	const domain = searchParams.get('domain') || __('The domain', 'moderntribe-sitebuilder');
	const title = sprintf('%1$s %2$s',
		domain,
		screenTitle
	);
	return (
		<Box sx={ { maxWidth: 465 } }>
			<Box
				component="img"
				sx={ {
					display: 'block',
					width: '64px',
					height: '64px',
					mb: 3,
					mx: 'auto',
				} }
				src={ `${ IMAGE_DIR }tada-icon.png` }
			/>
			<Typography
				sx={ { letterSpacing: '-0.05em', mb: 3 } }
				variant="h1"
				component="h2"
				align={ 'center' }>
				{ title }
			</Typography>
			<Typography
				variant="body2"
				component="p"
				ml={ 'auto' }
				mr={ 'auto' }
				mb={ 3 }
				align={ 'center' }>
				{ screenDescription }
			</Typography>
		</Box>
	);
};

export default ClaimYourDomain;
