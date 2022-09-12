import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import { CheckCircle, Warning } from '@mui/icons-material';
import { SetupCardInfoRow } from '@stellarwp/wme-ui';
import { useGoLive } from '@sb/hooks';

import { SetupData } from '@sb/setup/data/constants';

interface StatusWrapperInterface {
	children?: ReactNode;
}

interface GoLiveStatusInterface {
	completed?: boolean;
}

interface StandardStatusInterface {
	domain: string;
	completed: boolean;
}

interface RetryStatusInterface {
	domain: string;
}

const { goLiveStatus } = SetupData;

const iconSx = {
	fontSize: '1rem',
	lineHeight: 1,
	marginRight: '4px',
};

const StatusWrapper: React.FC<StatusWrapperInterface> = ({ children }) => <Box component="span" sx={ { display: 'flex', alignItems: 'center' } }>{ children }</Box>;

const StandardStatus: React.FC<StandardStatusInterface> = ({ domain, completed }) => (
	<StatusWrapper>
		{ completed && <CheckCircle color="success" sx={ iconSx } /> }
		<Typography component="span" variant="body2" mr={ 0.5 } color="#666666">
			{ `${ goLiveStatus.statusMessage } ` }
		</Typography>
		<Typography component="span" variant="body2" fontWeight={ 600 }>
			{ domain }
		</Typography>
	</StatusWrapper>
);

const RetryStatus: React.FC<RetryStatusInterface> = ({ domain }) => (
	<StatusWrapper>
		<Warning color="primary" sx={ iconSx } />
		<Typography component="span" variant="body2" mr={ 0.5 } color="#666666">
			{ `${ goLiveStatus.verifyMsgPart1 } ` }
			<Typography component="span" variant="body2" fontWeight={ 600 }>
				{ `${ domain }. ` }
			</Typography>
			{ `${ goLiveStatus.verifyMsgPart2 }` }
		</Typography>
	</StatusWrapper>
);

const GoLiveStatus: React.FC<GoLiveStatusInterface> = (props) => {
	const { completed = false } = props;

	// const { retryVerificationStep } = useGoLive();

	// @todo: Get current domain from window object.
	// const domain = SETTINGS.site_url.replace(/^https?:\/\//, '');
	const domain = window.location.host;

	// @todo: Find alternative to provider for getting this value, once set.
	const capturedDomain = '';

	const retryVerificationStep = () => {};

	const navigate = useNavigate();

	return <SetupCardInfoRow
		primary={ ! completed && !! capturedDomain ? <RetryStatus domain={ domain } /> : <StandardStatus domain={ domain } completed={ completed } /> }
		secondary={ (completed || !! capturedDomain) && (
			<Link
				variant="body2"
				underline="hover"
				sx={ { cursor: 'pointer' } }
				onClick={ () => completed ? navigate('/wizard/go-live') : retryVerificationStep() }
			>{ completed ? goLiveStatus.manage : goLiveStatus.tryAgain }</Link>
		) }
	/>;
};

export default GoLiveStatus;
