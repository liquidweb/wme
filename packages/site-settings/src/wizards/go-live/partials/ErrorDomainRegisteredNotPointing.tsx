import { Box, Checkbox, FormLabel, Link, Typography, useTheme } from '@mui/material';
import { OpenInNew, Refresh } from '@mui/icons-material';
import { ErrorStatusMessage } from '.';
import { useDomainConnect } from '@site/hooks';
import { GoLiveStringData } from '@go-live/data/constants';

const ErrorDomainRegisteredNotPointing = () => {
	const theme = useTheme();
	const { goLiveState, setGoLiveState } = useDomainConnect();
	const { verificationStatus, skipDnsVerification, steps } = goLiveState;
	const { errorDomainRegisteredNotPointing: {
		helpHeadlinePart1,
		helpHeadlinePart2,
		helpHeadlinePart3,
		helpContentPart1,
		helpContentPart1a,
		helpContentPart1b,
		helpContentPart1c,
		helpContentPart2,
		helpContentPart3,
		retryConnection,
		advancedLabelPart1,
		advancedLabelPart2,
		advancedContentPart1,
		advancedContentPart2,
		advancedContentPart3
	} } = GoLiveStringData;

	const resetSx = {
		fontSize: '1.15em',
		marginLeft: 0.5,
		verticalAlign: 'middle',
	};

	const nsCodeSx = {
		display: 'block',
		padding: theme.spacing(2),
		backgroundColor: '#F5F5F5',
		color: theme.palette.primary.main
	};

	const handleSkipDnsVerification = () => {
		const currentStatus = ! skipDnsVerification ? 'advanced' : 'error';

		steps[ 1 ].disableNext = !! skipDnsVerification;

		setGoLiveState({
			...goLiveState,
			verificationStatus: currentStatus,
			skipDnsVerification: ! skipDnsVerification,
			steps,
		});
	};

	return (
		<>
			{ verificationStatus !== 'advanced' && (
				<>
					<ErrorStatusMessage message={ goLiveState.verificationMessage } />
					<Typography variant="body2" mb={ 1 } fontWeight={ 500 }>{ helpHeadlinePart1 }</Typography>
					<Typography variant="body2" mb={ 3 }>
						{ helpContentPart1 }
					</Typography>
					<Box component="pre" mb={ 3 }>
						<Box component="code" sx={ nsCodeSx }>
							<Box
								component="ol"
								sx={ {
									my: 0,
									'& li:last-of-type': {
										mb: 0
									}
								} }
							>
								<li>ns1.nexcess.net</li>
								<li>ns2.nexcess.net</li>
								<li>ns3.nexcess.net</li>
								<li>ns4.nexcess.net</li>
							</Box>
						</Box>
					</Box>
					<Typography variant="body2" mb={ 3 }>
						{ helpContentPart1a }
					</Typography>
					<Typography variant="body2" mb={ 3 }>
						{ `${ helpContentPart1b } ` }
						<Link underline="always" target="_blank" href="https://help.nexcess.net/74095-wordpress/how-to-edit-or-add-an-a-host-dns-record-to-go-live-with-your-site">{ helpContentPart1c }<OpenInNew sx={ { fontSize: '0.875rem', marginLeft: '4px', verticalAlign: 'middle' } } /></Link>
					</Typography>
					<Typography variant="body2" mb={ 1 } fontWeight={ 500 }>{ helpHeadlinePart2 }</Typography>
					<Typography variant="body2">
						{ helpContentPart2 }
					</Typography>
					<Box my={ 2 }>
						<Link
							variant="body2"
							component="button"
							underline="always"
							type="submit"
						>
							{ retryConnection }<Refresh sx={ resetSx } />
						</Link>
					</Box>
					<Typography variant="body2" mb={ 1 } fontWeight={ 500 }>{ helpHeadlinePart3 }</Typography>
					<Typography variant="body2">
						{ helpContentPart3 }
					</Typography>
					<Box component="hr" mt={ 2 } mb={ 4 } />
				</>
			) }

			<FormLabel sx={ { display: 'block', margin: '0 -9px 24px -9px' } }>
				<Checkbox onChange={ handleSkipDnsVerification } checked={ skipDnsVerification } />
				{ advancedLabelPart1 }
				<Box component="span" sx={ { fontWeight: 'normal' } }>
					{ ` ${ advancedLabelPart2 }` }
				</Box>
			</FormLabel>

			{ verificationStatus === 'advanced' && (
				<>
					<Typography variant="body2" mb={ 3 }>
						{ advancedContentPart1 }
					</Typography>
					<Typography variant="body2" mb={ 3 }>
						{ advancedContentPart2 }
					</Typography>
					<Typography variant="body2">
						{ advancedContentPart3 }
					</Typography>
				</>
			) }
		</>
	);
};

export default ErrorDomainRegisteredNotPointing;
