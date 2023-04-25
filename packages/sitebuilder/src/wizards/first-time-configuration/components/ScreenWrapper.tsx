import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const screenBottomMargin = '68px';
const screenTopMargin = '57px';

const ScreenWrapper: any = styled(Box, {
	name: 'FtcWrapper',
	slot: 'Root'
})(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'absolute',
	top: screenTopMargin,
	height: `calc(100vh - ${ screenTopMargin } - ${ screenBottomMargin })`,
	minHeight: `calc(100vh - ${ screenTopMargin } - ${ screenBottomMargin })`,
	width: '100%',
	overflowY: 'scroll'
}));

export default ScreenWrapper;
