import { Box, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { SetupCardInfoRow } from '@moderntribe/wme-ui';
import { SITE_DOMAIN_DATA, SITE_SETTINGS } from '@site/constants';

interface StatusWrapperInterface {
	children?: React.ReactNode;
}

interface SiteDomainInterface {
	completed?: boolean;
}

interface StandardStatusInterface {
	domain: string;
	completed: boolean;
}

const { goLiveStatus } = SITE_DOMAIN_DATA;

const iconSx = {
	fontSize: '1rem',
	lineHeight: 1,
	marginRight: '4px',
};

const StatusWrapper: React.FC<StatusWrapperInterface> = ({ children }) => (
	<Box component="span" sx={ { display: 'flex', alignItems: 'center' } }>
		{ children }
	</Box>
);

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

const SiteDomain: React.FC<SiteDomainInterface> = (props) => {
	const { completed = false } = props;
	const domain = SITE_SETTINGS.site_url.replace(/^https?:\/\//, '');

	return (
		<>
			<SetupCardInfoRow
				sx={ { mb: 3 } }
				primary={ <StandardStatus domain={ domain } completed={ completed } /> }
			/>
		</>
	);
};

export default SiteDomain;
