import { Typography } from '@mui/material';
import { GoLiveStringData } from '@go-live/data/constants';

const SuccessDomainConnected = () => {
	const { successDomainConnected: { statusSuccessPart1, statusSuccessPart2, statusSuccessNote } } = GoLiveStringData;

	return (
		<>
			<Typography variant="body2" mt={ 0.5 } mb={ 3 }>
				<Typography variant="body2" component="span" sx={ { color: (theme) => theme.palette.success.main, fontWeight: 600 } }>
					{ statusSuccessPart1 }
				</Typography>
				{ ` ${ statusSuccessPart2 }` }
			</Typography>
			<Typography variant="caption">
				{ statusSuccessNote }
			</Typography>
		</>
	);
};

export default SuccessDomainConnected;
