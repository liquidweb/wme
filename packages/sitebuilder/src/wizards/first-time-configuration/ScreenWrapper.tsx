import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ScreenWrapper = styled(Box, {
	name: 'FtcWrapper',
	slot: 'Root',
})(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	'& .WmeFormRoot': {
		marginTop: '16px',
	},
}));

export default ScreenWrapper;
