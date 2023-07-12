import { Box, Menu, Typography } from '@mui/material';
import FilterIcon from '@sb/contexts/FilterIcon';
import { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControlLabel, Switch } from '@moderntribe/wme-ui';

export interface FilterOption {
	value: string;
	label: string;
}

export interface TemplateFilterProps {
	options: FilterOption[];
	defaultSelected?: FilterOption[];
	updateSelected?: (selected: FilterOption[]) => void;
}

const TemplateFilter = (props: TemplateFilterProps) => {
	const { options, updateSelected, defaultSelected } = props;
	const [selected, setSelected] = useState(defaultSelected || []);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleSelect = (newItem?: FilterOption) => {
		if (! newItem) {
			return;
		}
		const filteredItems = selected.filter((item) => item.value !== newItem.value);

		if (filteredItems.length !== selected.length) {
			setSelected(filteredItems);
		} else {
			setSelected([...selected, newItem]);
		}
	};

	useEffect(() => {
		if (updateSelected) {
			updateSelected(selected || []);
		}
	}, [selected]);

	return (
		<Box
			sx={ {
				display: 'flex',
				alignItems: 'center',
				gap: '8px',
				marginBottom: '16px'
			} }
		>
			<FilterIcon />
			<Typography variant="body2" sx={ { fontWeight: 600 } }>Filter:</Typography>
			<div>
				<Box
					sx={ { display: 'flex', gap: '3px', alignItems: 'center', cursor: 'pointer' } }
					onClick={ handleClick }
					id="basic-button"
					aria-controls={ open ? 'basic-menu' : undefined }
					aria-haspopup="true"
					aria-expanded={ open ? 'true' : undefined }
				>
					<Typography variant="body2" sx={ { textDecoration: 'underline' } }>{
						selected.length > 0 ? selected.map((item) => item.label).join(', ')
							: 'All'
					}</Typography>
					<KeyboardArrowDownIcon fontSize="small" sx={ { transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' } } />
				</Box>
				<Menu
					id="basic-menu"
					anchorEl={ anchorEl }
					open={ open }
					onClose={ () => setAnchorEl(null) }
					MenuListProps={ {
						'aria-labelledby': 'basic-button',
					} }
					sx={ { '.MuiPaper-root': {
						minWidth: '180px',
						padding: '20px',
					},
					'.MuiMenu-list': {
						padding: 0,
						display: 'flex',
						flexDirection: 'column',
						gap: '10px'
					} } }
				>
					{ options.map((opt) => (
						<Box key={ opt.value } sx={ { width: '100%' } }>
							<FormControlLabel
								sx={ { justifyContent: 'space-between', marginLeft: 0, width: '100%' } }
								value="start"
								control={
									<Switch
										checked={ Boolean(selected.find((item) => item.value === opt.value)) }
										size="small"
										onChange={ () => handleSelect(opt) }
									/>
								}
								label={ opt.label }
								labelPlacement="start"
							/>
						</Box>
					)) }
				</Menu>
			</div>
		</Box>
	);
};

export default TemplateFilter;
