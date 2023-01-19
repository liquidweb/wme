import { Box, styled } from '@mui/material';

interface NextStepTileProps {
	variant?: 'vertical' | 'horizontal';
	children: React.ReactNode;
}

const StyledTile = styled(Box, {
	name: 'WmeNextStepTile',
	slot: 'root',
})<NextStepTileProps>(({ theme, variant }) => ({
	backgroundColor: theme.palette.sidebar.background,
	display: 'flex',
	alignItems: 'center',
	justifyContent: variant === 'horizontal' ? 'space-between' : 'center',
	flexDirection: variant === 'horizontal' ? 'row' : 'column',
	...(variant === 'horizontal' && {
		gap: theme.spacing(4),
		padding: theme.spacing(3),
		borderRadius: theme.shape.borderRadius,
	}),
	...(variant === 'vertical' && {
		backgroundPosition: 'top -50px right',
		right: 0,
		backgroundRepeat: 'no-repeat',
		top: '50%',
		transform: 'translateY(-50%)',
		height: 'calc(100vh - 180px)',
		position: 'absolute',
		width: '280px',
	}),
	'& .MuiButton-endIcon': {
		position: 'absolute',
		transition: 'all ease .3s',
		opacity: 0,
		right: '16px',
	},
}));

export const NextStepTile: React.FC<NextStepTileProps> = (props) => {
	const {
		variant = 'vertical',
		children
	} = props;

	return (
		<StyledTile className="WmeNextStepTileRoot" variant={ variant }>
			{ children }
		</StyledTile>
	);
};
