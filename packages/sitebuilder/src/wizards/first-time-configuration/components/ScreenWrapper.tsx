import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const mBottom = '68px';
const mTop = '57px';

const ScreenWrapper: any = styled(Box, {
	name: 'FtcWrapper',
	slot: 'Root',
})(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: mTop,
	marginBottom: mBottom,
	minHeight: `calc(100vh - ${ mTop } - ${ mBottom })`,
	'& .WmeFormRoot': {
		marginTop: '16px',
	},
}));

export default ScreenWrapper;
