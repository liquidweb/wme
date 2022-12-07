import { Box } from '@mui/material';
import { IMAGE_DIR } from '@sb/constants';
import { __ } from '@wordpress/i18n';

export const ActiveOverlay = (props:any) => {
	const { themeName } = props;
	const activeText = __('Active', 'nexcess-mapps');
	const checkbox = `${ IMAGE_DIR }check.svg`;

	const overlaySx = {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: '30px',
		backgroundColor: 'primary.dark',
		display: 'flex',
		color: 'text.white',
		padding: '11px',
		alignItems: 'center',
	};

	return (
		<Box sx={ overlaySx }>
			<Box sx={ {
				fontSize: '13px',
				fontWeight: '600',
				flex: 1,
			} }>
				{ themeName }
			</Box>
			<Box sx={ {
				fontSize: '12px',
				justifyContent: 'flex-end',
				display: 'flex',
				paddingRight: '25px',
			} }>
				<Box sx={ {
					paddingRight: '6px',
				} }>
					{ activeText }
				</Box>
				<Box sx={ {
					height: '16px',
					width: '16px',
					backgroundColor: 'primary.white',
					borderRadius: '50%',
					textAlign: 'center',
				} }>
					{ <img src={ checkbox } alt="checkbox icon" /> }
				</Box>
			</Box>
		</Box>
	);
};
