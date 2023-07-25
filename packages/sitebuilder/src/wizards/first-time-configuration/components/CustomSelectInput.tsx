import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@moderntribe/wme-ui';
import { Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface CustomSelectOptions {
	label: string;
	labelDescription?: string;
	value: string;
}

export interface CustomSelectInterface {
	options: CustomSelectOptions[];
	value: string;
	onChange: (newValue: string) => void;
	inputName: string;
}

export default function CustomSelectInput(props: CustomSelectInterface) {
	const { inputName, onChange, value, options } = props;
	const [selectedOption, setSelected] = React.useState<CustomSelectOptions>();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	React.useEffect(() => {
		if (value && options) {
			const found = options.find((opt) => opt.value === value);
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
					<span style={ { fontWeight: 700 } }>{ selectedOption?.label }.</span>
					&nbsp;<span style={ { fontWeight: 400 } }>{ selectedOption?.labelDescription }</span>
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
					<MenuItem key={ item.label } onClick={ () => handleClose(item.value) }>
						<span style={ { fontWeight: 700 } }>{ item.label }</span>
						&nbsp;{ item.labelDescription }
					</MenuItem>
				)) }
			</Menu>
		</div>
	);
}
