import { Box } from '@mui/material';
import { SetupCards } from '@site/setup';
import { NexcessLogo } from '@site/logos';

const SetupScreen = () => {
	return (
		<Box pt={ 3 } pl={ '12px' } pr={ 4 }>
			<NexcessLogo />
			<SetupCards />
		</Box>
	);
};

export default SetupScreen;
