import React from 'react';
import { ErrorStatusMessage } from '.';
import { Link, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { NEXCESS_SUPPORT_URL } from '@sb/constants';
import { useGoLive } from '@sb/hooks';
import { GoLiveStringData } from '@go-live/data/constants';

const ErrorDomainGeneral = () => {
	const { goLiveState: { verificationMessage } } = useGoLive();
	const { errorDomainGeneral: { accountContent, accountCta } } = GoLiveStringData;
	return (
		<>
			<ErrorStatusMessage message={ verificationMessage } />
			<Typography variant="body2" mb={ 3 }>{ accountContent }</Typography>
			<Typography variant="body2">
				<Link
					href={ NEXCESS_SUPPORT_URL }
					target="_blank"
					underline="hover"
					sx={ { display: 'flex', alignItems: 'center', marginBottom: 3 } }
				>
					{ `${ accountCta }` }
					<OpenInNewIcon sx={ { fontSize: '1.125rem', marginLeft: 1 } } />
				</Link>
			</Typography>
		</>
	);
};

export default ErrorDomainGeneral;
