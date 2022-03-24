import * as React from 'react';
import { Box, BoxProps, Button, CardActionArea, Typography } from '@mui/material';
import { Avatar, AvatarProps } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/system';

import { ConditionalWrapper } from '../../utils';

interface TaskButton {
	label: string;
	url: string;
	backgroundColor: string;
}

interface Props extends BoxProps {
	title?: string;
	intro?: string;
	children?: React.ReactNode;
	button?: TaskButton;
	avatarProps?: AvatarProps;
	variant?: 'action' | 'task' | undefined;
}

interface TaskProps extends BoxProps {
	variant?: 'action' | 'task' | undefined;
	button?: boolean;
}

const Task = styled(Box, {
	name: 'WmeTask',
	slot: 'Root',
	overridesResolver: (props, styles) => [
		styles.root,
	],
})<TaskProps>(({ variant, theme }) => ({
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
	marginTop: theme.spacing(3),
	marginBottom: theme.spacing(3),

	'&:first-of-type': {
		marginTop: theme.spacing(4),
	},

	'&:last-of-type': {
		marginBottom: 0
	},

	'& .MuiAvatar-root': {
		marginRight: theme.spacing(2),
		width: 64,
		height: 64,
	},
	
	...(variant === 'task' &&
	{
		marginTop: theme.spacing(2.5),
		marginBottom: theme.spacing(-1.5),
		marginRight: theme.spacing(-1.5),
		marginLeft: theme.spacing(-1.5),

		'& > button': {
			display: 'flex',
			padding: theme.spacing(1.5),
			justifyContent: 'flex-start',
			alignItems: 'center',
			borderRadius: 1,
		}
	}),
}));

const GetStarted = styled(Box, {
	name: 'WmeGetStarted',
	slot: 'Root',
})<BoxProps>(() => ({
	display: 'flex', 
	alignItems: 'center',
}));

const SetupCardTask: React.FC<Props> = (props) => {
	const { title, intro, button, avatarProps, variant, sx } = props;
	const variantType = variant === 'action' ? 'action' : 'task';

	return (
		<Task variant={ variantType }>
			<ConditionalWrapper
				condition={ variantType === 'task' }
				wrapper={
					(children: React.ReactNode) => <CardActionArea>{ children }</CardActionArea>
				}
			>
				<Avatar { ...avatarProps } />
				<Box sx={ { flexGrow: 1 } }>
					{ title && <Typography component="h3" variant="h4" mb={ 1 }>{ title }</Typography> }
					{ intro && <Typography variant="body2">{ intro }</Typography> }
					{ props.children }
				</Box>
				{ variantType === 'action' ? <Button
					// disabled={ disabled }
					variant="contained"
					href={ button?.url }
					>{ button?.label }</Button>
					: <GetStarted>
						<Typography
							variant="body2"
							sx={ {
								fontWeight: 600,
								letterSpacing: '-0.25px',
								// lineHeight: pxToRem(26),
								opacity: 0,
								transform: 'translateX(-10px)',
								transition: 'all 0.3s ease-in-out',

								'.MuiButtonBase-root:hover &, .Mui-focusVisible &': {
									opacity: 1,
									transform: 'translateX(0)',
								}
							} }
							className="sb-get-started__text"
						>Get Started</Typography>
						<ChevronRight />
					</GetStarted>
				}
			</ConditionalWrapper>
		</Task>
	);
};

export default SetupCardTask;