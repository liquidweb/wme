import { Box } from '@mui/material';

const ErrorScreenWrapper = {
	position: 'fixed',
	top: '0',
	left: '0',
	width: '100vw',
	height: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#fff',
	zIndex: 15
};

export const NotificationOverlay = (props: { children: React.ReactNode }) => {
	const { children } = props;

	return <Box sx={ ErrorScreenWrapper }>{ children }</Box>;
};
