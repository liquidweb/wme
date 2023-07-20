import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TonePersonalityInterface } from '../data/first-time-configuration-screen-data';
import { Button } from '@moderntribe/wme-ui';
import { Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface CustomSelectInterface {
	options: TonePersonalityInterface[];
	value: string;
	onChange: (newValue: string) => void;
	inputName: string;
}

export default function CustomSelectInput(props: CustomSelectInterface) {
	const { inputName, onChange, value, options } = props;
	const [selectedOption, setSelected] = React.useState<TonePersonalityInterface>();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	React.useEffect(() => {
		if (value && options) {
			const found = options.find((opt) => opt.name === value);
			setSelected(found);
		} else {
			setSelected(options[ 0 ]);
		}
	}, [value, options]);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (valueKey: string) => {
		if (valueKey) {
			onChange(valueKey);
		}
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				variant="outlined"
				color="secondary"
				id={ `${ inputName }-button` }
				aria-controls={ open ? inputName : undefined }
				aria-haspopup="true"
				aria-expanded={ open ? 'true' : undefined }
				onClick={ handleClick }
				endIcon={ <KeyboardArrowDownIcon /> }
			>
				<Box sx={ { textAlign: 'left' } }>
					<span style={ { fontWeight: 700 } }>{ selectedOption?.name }.</span>
					&nbsp;<span style={ { fontWeight: 400 } }>{ selectedOption?.description }</span>
				</Box>
			</Button>
			<Menu
				id={ `${ inputName }-menu` }
				anchorEl={ anchorEl }
				open={ open }
				onClose={ () => handleClose('') }
				MenuListProps={ {
					'aria-labelledby': `${ inputName }-button`,
				} }
				anchorOrigin={ {
					vertical: 'bottom',
					horizontal: 'left',
				} }
				transformOrigin={ {
					vertical: 'top',
					horizontal: 'left',
				} }
				sx={ {
					borderColor: 'border.ui',
					'& .MuiPaper-root': {
						maxWidth: '425px',
						'& .MuiMenuItem-root': {
							textAlign: 'left',
							display: 'inline-block',
							whiteSpace: 'break-spaces'
						}
					}
				} }
			>
				{ options.map((item) => (
					<MenuItem key={ item.name } onClick={ () => handleClose(item.name) }>
						<span style={ { fontWeight: 700 } }>{ item.name }</span>
						&nbsp;{ item.description }
					</MenuItem>
				)) }
			</Menu>
		</div>
	);
}
