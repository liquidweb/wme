import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import {
	Box,
	FormControl,
	FormLabel,
	IconButton,
	TextField,
	InputAdornment,
	Link,
	FormHelperText
} from '@mui/material';
import {
	ArrowForward,
	CheckCircle,
	Error
} from '@mui/icons-material';
import {
	SuccessDomainConnected,
	ErrorStatusMessage,
	ErrorDomainRegisteredNotPointing,
	ErrorDomainGeneral,
	ErrorDomainNotRegistered
} from '@site/wizards/go-live/partials';
import { WizardSectionTitle } from '@moderntribe/wme-ui';
import { IMAGE_DIR, SITE_DOMAIN_DATA } from '@site/constants';
import {useDomainConnect, useSiteSettings} from '@site/hooks';

const loadingSx = {
	'@keyframes fadeIn': {
		from: {
			opacity: 0.25,
		}
	},
	'@keyframes rotate': {
		from: {
			transform: 'rotate(0deg)',
		},
		to: {
			transform: 'rotate(359deg)',
		},
	},
	animation: 'rotate 1s infinite linear',
};

const VerifyDomain = () => {
	const {
		verifyDomain: {
			screenTitle,
			screenDescription,
			screenNotice,
			goLiveLabelText,
			goLivePlaceholderText,
			errorDomainFormat
		}
	} = SITE_DOMAIN_DATA;

	const {
		goLiveState,
		setGoLiveState,
		submitDomainVerification,
	} = useDomainConnect();

	const {
		siteSettingsState,
		siteSettingsState: { capturedDomain = '' },
		setSiteSettingsState
	} = useSiteSettings();

	const {
		verificationStatus,
		verificationErrorType,
		isLoading,
	} = goLiveState;

	const [validDomain, setValidDomain] = useState<boolean>(true);

	useEffect(() => {
		if (capturedDomain.length) {
			validateDomain();
		}
	}, [capturedDomain]);

	const handleDomainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSiteSettingsState({
			...siteSettingsState,
			capturedDomain: event.target.value
		});

		setGoLiveState({
			...goLiveState,
			verificationStatus: 'default',
			verificationErrorType: false,
			verificationMessage: '',
		});
	};

	const validateDomain = () => {
		const pattern = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
		setValidDomain(pattern.test(capturedDomain));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (! validDomain) {
			setGoLiveState({
				...goLiveState,
				isLoading: false,
				verificationStatus: 'error',
			});
			return false;
		}

		submitDomainVerification();
	};

	return (
		<Box sx={ { maxWidth: 425, margin: '0 auto' } }>
			<WizardSectionTitle
				heading={ screenTitle }
				headingVariant="h2"
				copy={ screenDescription }
				copyVariant="body2"
				sx={ {
					marginBottom: 4,
				} }
			/>
			<Box
				component="form"
				onSubmit={ handleSubmit }
			>
				<FormControl fullWidth margin={ 'none' } sx={ { marginBottom: 1 } } color="error">
					<FormLabel id="site-domain-label">{ goLiveLabelText }</FormLabel>
					<Box sx={ { position: 'relative' } }>
						<TextField
							placeholder={ goLivePlaceholderText }
							required
							error={ verificationStatus === 'error' }
							disabled={ isLoading || verificationStatus === 'advanced' }
							margin={ 'dense' }
							value={ siteSettingsState.capturedDomain }
							onChange={ handleDomainChange }
							inputProps={ { 'aria-labelledby': 'site-domain-label' } }
							InputProps={ (verificationStatus === 'error' || verificationStatus === 'connected' || verificationStatus === 'connecting') ? {
								endAdornment: <InputAdornment position="end">
									{ verificationStatus === 'connected' && <CheckCircle color="success" /> }
									{ verificationStatus === 'connecting' && <Box component="img" src={ `${ IMAGE_DIR }loading-icon.svg` } sx={ loadingSx } /> }
									{ verificationStatus === 'error' && <Error color="error" /> }
								</InputAdornment>
							} : undefined }
							sx={ {
								width: '100%',

								'& .Mui-error .MuiOutlinedInput-input': {
									color: (theme) => theme.palette.error.main,
								},

								'& .MuiInputBase-input.MuiInputBase-input': {
									paddingTop: '5px',
									paddingBottom: '5px',
									paddingRight: '50px',
								}
							} }
						/>
						{ verificationStatus === 'default' && <IconButton type="submit" sx={ { position: 'absolute', top: '10px', right: '6px', padding: '6px' } }>
							<ArrowForward />
						</IconButton> }
					</Box>
				</FormControl>
				<FormHelperText>
					{ `${ screenNotice } ` }
					<Link href="email:storebuilder@nexcess.net">{ __('storebuilder@nexcess.net', 'moderntribe-sitebuilder') }</Link>.
				</FormHelperText>
				{ <Box mt={ 3 }>

					{ (verificationStatus === 'error' && ! validDomain) && <ErrorStatusMessage message={ errorDomainFormat } /> }
					{ (verificationStatus === 'connected' && validDomain) && <SuccessDomainConnected /> }
					{ (verificationErrorType === 'general' && validDomain) && <ErrorDomainGeneral /> }
					{ (verificationErrorType === 'registration' && validDomain) && <ErrorDomainNotRegistered /> }
					{ ((verificationErrorType === 'pointed' && validDomain) && (verificationStatus === 'error' || verificationStatus === 'advanced')) && <ErrorDomainRegisteredNotPointing /> }

				</Box> }
			</Box>
		</Box>
	);
};

export default VerifyDomain;
