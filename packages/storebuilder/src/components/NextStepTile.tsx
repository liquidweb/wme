import React from 'react';
import { Box, styled } from '@mui/material';

const StyledTile = styled(Box, {
	name: 'WmeNextStepTile',
	slot: 'root',
})(({ theme }) => ({
	backgroundColor: theme.palette.sidebar.background,
	backgroundPosition: 'top -50px right',
	backgroundRepeat: 'no-repeat',
	width: '280px',
	position: 'absolute',
	right: 0,
	height: 'calc(100vh - 180px)',
	top: '50%',
	transform: 'translateY(-50%)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',

	'& .MuiButton-endIcon': {
		position: 'absolute',
		transition: 'all ease .3s',
		opacity: 0,
		right: '16px',
	},
}));

export const NextStepTile = ({ children }: { children: React.ReactNode }) => {
	return (
		<StyledTile className="WmeNextStepTileRoot">
			{ children }
		</StyledTile>
	);
};
