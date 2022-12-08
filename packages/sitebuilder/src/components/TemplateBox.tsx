import { Box } from '@mui/material';
import { __ } from '@wordpress/i18n';
import { ActiveOverlay } from './index';
import { useLookAndFeel } from '@sb/hooks/useLookAndFeel';

export const TemplateBox = (props:any) => {
	const {
		template,
		isActive,
	} = props;

	const { setTemplateValue } = useLookAndFeel();

	const PREVIEW_TEXT = __('Preview', 'moderntribe-sitebuilder');

	const templateBlock = {
		position: 'relative',
		width: '100%',
		height: 0,
		paddingBottom: '90%',
		overflow: 'hidden',
		borderRadius: '4px',
		// TODO: replace with theme variable
		boxShadow: '0px 0px 32px 0px #0000001a',

		'&::before': {
			position: 'absolute',
			top: 0,
			right: 0,
			left: 0,
			width: '100%',
			height: '100%',
			content: '""',
			backgroundColor: 'rgba(0, 0, 0, 0)',
			transition: '0.5s ease',
		},

		'&:hover': {
			opacity: 1,
			cursor: 'pointer',

			'&::before': {
				backgroundColor: 'rgba(255, 255, 255, 0.9)',
			},

			'& div': {
				opacity: 1,
			}
		},

		'&:focus': {
			cursor: 'pointer',
			opacity: 1,

			'&::before': {
				backgroundColor: 'rgba(255, 255, 255, 0.9)',
			}
		}
	};

	const templateBlockName = {
		position: 'absolute',
		bottom: '15px',
		left: '50%',
		fontSize: '14px',
		fontWeight: '600',
		textAlign: 'center',
		opacity: 0,
		transition: '0.5s ease',
		transform: 'translate(-50%, 0)',
	};

	const templateBlockImage = {
		maxWidth: '100%',
		opacity: 1,
		transition: '0.5s ease',

		'&:hover': {
			boxSizing: 'border-box',
			cursor: 'pointer',
			border: '1px solid #ebeefe',
			opacity: '0.3',
		},

		'&:focus': {
			boxSizing: 'border-box',
			cursor: 'pointer',
			border: '1px solid #ebeefe',
			opacity: '0.3',
		}
	};

	const templateBlockButton = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		padding: '8px 18px',
		fontSize: '16px',
		color: 'primary.white',
		textAlign: 'center',
		backgroundColor: 'primary.dark',
		borderRadius: '4px',
		opacity: 0,
		transform: 'translate(-50%, -50%)',
		cursor: 'pointer',
		transition: '0.5s ease',
	};

	return (
		template ? <Box
			onClick={ () => setTemplateValue(template) }
			sx={ templateBlock }
		>
			{
				isActive &&
				<ActiveOverlay themeName={ template?.name } />
			}
			<Box
				component="img"
				src={ template.pages.home.image }
				alt={ template.name + ' template image' }
				sx={ templateBlockImage }
			/>
			<Box sx={ templateBlockButton }>
				{ PREVIEW_TEXT }
			</Box>
			<Box sx={ templateBlockName }>
				{ template.name }
			</Box>
		</Box> : <Box sx={ templateBlock } />
	);
};
