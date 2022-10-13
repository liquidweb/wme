import React from 'react';
import {
	Box,
	FormControl,
	FormHelperText,
	FormLabel,
	IconButton,
	InputAdornment,
	TextField,
	Typography
} from '@mui/material';
import { useGoLive, useSiteBuilder } from '@sb/hooks';
import { Loading } from '@sb/components';
import { WizardSectionTitle } from '@moderntribe/wme-ui';
import { __, sprintf } from '@wordpress/i18n';
import { copyToClipboard } from '@sb/utils';
import { ContentCopy } from '@mui/icons-material';
import { IMAGE_DIR } from '@sb/constants';
import { GoLiveStringData } from '../data/constants';

const UpdateSiteUrl = () => {
	const { siteBuilderState: { capturedDomain = '' } } = useSiteBuilder();
	const { goLiveState: { isLoading } } = useGoLive();
	const {
		updateSiteUrl: {
			screenTitle,
			screenDescription,
			launchImgAltText,
			descriptionProcessing,
			loginUrlLabelText,
			loginUrlHelperText
		}
	} = GoLiveStringData;

	const titleProcessing = sprintf('%1$s %2$s',
		capturedDomain,
		__('will be ready in just a few moments.', 'nexcess-mapps')
	);

	const loginUrl = `${ capturedDomain }/wp-admin`;

	return (
		<Box sx={ { maxWidth: 465 } }>
			{ isLoading ? <>
				<Loading mb={ 4 } />
				<WizardSectionTitle
					heading={ titleProcessing }
					headingVariant="h2"
					copy={ descriptionProcessing }
					bookend={ true }
					sx={ {
						marginBottom: 3,
					} }
				/>
			</> : <>
				<Box
					component="img"
					sx={ {
						display: 'block',
						width: '64px',
						height: '64px',
						mb: 3,
						mx: 'auto',
					} }
					src={ `${ IMAGE_DIR }rocket-icon.png` }
					alt={ launchImgAltText }
				/>
				<Typography
					sx={ { letterSpacing: '-0.05em' } }
					variant="h1"
					component="h2"
					align={ 'center' }>
					{ screenTitle }
				</Typography>
				<Typography
					sx={ { letterSpacing: '-0.05em', mb: 3 } }
					variant="h1"
					component="h2"
					align={ 'center' }>
					{ capturedDomain }
				</Typography>
				<Typography
					variant="body1"
					component="p"
					ml={ 'auto' }
					mr={ 'auto' }
					mb={ 3 }
					align={ 'center' }>
					{ screenDescription }
				</Typography>
			</> }
			<FormControl fullWidth margin={ 'normal' }>
				<FormLabel id="login-url-label" sx={ { textAlign: 'center' } }>{ loginUrlLabelText }</FormLabel>
				<TextField
					required
					defaultValue={ loginUrl }
					margin={ 'dense' }
					fullWidth
					disabled
					inputProps={ { 'aria-labelledby': 'login-url-label' } }
					InputProps={ {
						endAdornment: <InputAdornment position="end">
							<IconButton
								onClick={ () => copyToClipboard(loginUrl) }
								sx={ { marginRight: '-12px', opacity: '0.5' } }
								aria-label={ __('copy to clipboard', 'nexcess-mapps') }
							>
								<ContentCopy />
							</IconButton>
						</InputAdornment>,
					} }
				/>
				<FormHelperText sx={ { textAlign: 'center' } }>{ loginUrlHelperText }</FormHelperText>
			</FormControl>
		</Box>
	);
};

export default UpdateSiteUrl;
