import { Box } from '@mui/material';
import { SetupCards } from '@store/setup';
import { NexcessLogo } from '@store/logos';

const SetupScreen = () => {
	return (
		<Box pt={ 3 } pl={ '12px' } pr={ 4 }>
			<NexcessLogo />
			<SetupCards />
		</Box>
	);
};

export default SetupScreen;
