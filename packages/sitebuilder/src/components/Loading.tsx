import React from 'react';
import { Box, styled, BoxProps } from '@mui/material';

const StyledLoaderContainer = styled(Box, {
	name: 'WmeLoader',
	slot: 'Root',
})(() => ({
	textAlign: 'center',
}));

const StyledLoader = styled(Box, {
	name: 'WmeLoader',
	slot: 'Loader',
})(() => ({
	'@keyframes wme-ball-loader': {
		'33%': {
			transform: 'translateY(24px)'
		},
		'66%': {
			transform: 'translateY(-24px)'
		},
		'100%': {
			transform: 'translateY(0)'
		}
	},
	'& > div:nth-of-type(1)': {
		animation: 'wme-ball-loader 0.7s -0.14s infinite ease-in-out',
	},
	'& > div:nth-of-type(2)': {
		animation: 'wme-ball-loader 0.7s -0.07s infinite ease-in-out',
	},
	'& > div:nth-of-type(3)': {
		animation: 'wme-ball-loader 0.7s 0s infinite ease-in-out',
	}
}));

const StyledLoaderBall = styled(Box, {
	name: 'WmeLoader',
	slot: 'Ball',
})(({ theme }) => ({
	backgroundColor: theme.palette.border.ui,
	width: '15px',
	height: '15px',
	borderRadius: '50%',
	margin: '5px',
	display: 'inline-block',
}));

export function Loading(props: BoxProps) {
	return (
		<StyledLoaderContainer { ...props }>
			<StyledLoader>
				<StyledLoaderBall />
				<StyledLoaderBall />
				<StyledLoaderBall />
			</StyledLoader>
		</StyledLoaderContainer>
	);
}
