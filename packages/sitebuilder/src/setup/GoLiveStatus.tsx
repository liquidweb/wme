import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import { CheckCircle, Warning } from '@mui/icons-material';
import { SetupCardInfoRow } from '@moderntribe/wme-ui';
import { useSiteBuilder } from '@sb/hooks';
import { SITEBUILDER } from '@sb/constants';

import { SetupData } from '@sb/setup/data/constants';

export interface GoLiveStatusRowInterface extends Omit<SetupCardRowInterface, 'type'> {
	type: 'launch-domain-status';
	completed: boolean;
}

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
	const { siteBuilderState: { capturedDomain = '' } } = useSiteBuilder();
	const navigate = useNavigate();
	const domain = SITEBUILDER.site_url.replace(/^https?:\/\//, '');

	const retryVerificationStep = () => {
		navigate('/wizard/go-live?step=2&retry=true');
	};

	return <SetupCardInfoRow
		primary={ ! completed && !! capturedDomain ? <RetryStatus domain={ capturedDomain } /> : <StandardStatus domain={ domain } completed={ completed } /> }
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
