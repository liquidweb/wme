import React, { useState, useEffect } from 'react';
import {
	Box,
	FormControl,
	FormLabel,
	IconButton,
	TextField,
	InputAdornment
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
} from './partials';
import { WizardSectionTitle } from '@stellarwp/wme-ui';
import { GoLiveStringData } from '../data/constants';
import { useGoLive } from '@sb/hooks';
import { IMAGE_DIR } from '@sb/constants';

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
	const { verifyDomain: { screenTitle, screenDescription, goLiveLabelText, goLivePlaceholderText, errorDomainFormat } } = GoLiveStringData;

	const {
		goLiveState,
		setGoLiveState,
		submitDomainVerification,
	} = useGoLive();

	const {
		capturedDomain,
		verificationStatus,
		verificationErrorType,
		isLoading,
	} = goLiveState;

	const [validDomain, setValidDomain] = useState<boolean>(true);

	useEffect(() => {
		if (goLiveState.capturedDomain.length) {
			validateDomain();
		}
	}, [goLiveState.capturedDomain]);

	const handleDomainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGoLiveState({
			...goLiveState,
			capturedDomain: event.target.value,
			verificationStatus: 'default',
			verificationErrorType: false,
			verificationMessage: '',
		});
	};

	const validateDomain = () => {
		const pattern = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
		setValidDomain(pattern.test(goLiveState.capturedDomain));
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
				headingVariant="h1"
				copy={ screenDescription }
				copyVariant="h4"
				sx={ {
					marginBottom: 4,
				} }
			/>
			<Box
				component="form"
				onSubmit={ handleSubmit }
			>
				<FormControl fullWidth margin={ 'none' } sx={ { marginBottom: 3 } } color="error">
					<FormLabel id="site-domain-label">{ goLiveLabelText }</FormLabel>
					<Box sx={ { position: 'relative' } }>
						<TextField
							placeholder={ goLivePlaceholderText }
							required
							error={ verificationStatus === 'error' }
							disabled={ isLoading || verificationStatus === 'advanced' }
							margin={ 'dense' }
							value={ capturedDomain }
							onChange={ handleDomainChange }
							inputProps={ { 'aria-labelledby': 'site-domain-label' } }
							InputProps={ (verificationStatus === 'error' || verificationStatus === 'connected' || verificationStatus === 'connecting') ? {
								endAdornment: <InputAdornment position="end">
									{ verificationStatus === 'connected' && <CheckCircle color="success" /> }
									{ verificationStatus === 'connecting' && <Box component="img" src={ `${ IMAGE_DIR }/loading-icon.svg` } sx={ loadingSx } /> }
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
				{ <Box mt={ verificationStatus === 'error' ? 0 : 0.5 }>

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
