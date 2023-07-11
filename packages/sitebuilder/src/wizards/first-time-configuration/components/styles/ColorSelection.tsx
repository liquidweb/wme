import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { ColorLine } from '@sb/components';
import getTemplateStyles, { StyleInterface } from '@ftc/data/styles';
import { useCallback, useEffect, useState } from 'react';
import { useFirstTimeConfiguration } from '@sb/hooks';

const ColorSelection = () => {
	const {
		ftcState: { form },
		setFormValue
	} = useFirstTimeConfiguration();
	const styles = getTemplateStyles();
	const [color, setColorValue] = useState(form.colorPalette.value);

	const handleColorSel = useCallback((e) => {
		const selected = e.target.value;
		setColorValue(selected);
	}, [color]);

	useEffect(() => {
		if (color) {
			setFormValue('colorPalette', color);
		}
	}, [color]);

	const getPalette = (theme: StyleInterface) => {
		return [
			theme.accent1,
			theme.accent2,
			theme.contrast1,
			theme.contrast2,
			theme.contrast3,
			theme.contrast4,
			theme.base1,
			theme.base2,
			theme.base3,
		];
	};

	return (

		<Box sx={ {
			width: '100%',
		} }>
			<FormControl sx={ { width: '100%' } }>
				<RadioGroup
					value={ color }
					name="color-palette-selection"
					onChange={ handleColorSel }
				>
					{
						styles?.map((theme) => (
							<FormControlLabel
								key={ theme.id }
								value={ theme.id }
								control={ <Radio size="small" /> }
								label={ <ColorLine colorList={ getPalette(theme) } /> }
								sx={ {
									backgroundColor: '#fff',
									p: 0,
									borderRadius: '4px',
									mb: '5px',
									mr: 0,
									ml: 0,
									'.MuiFormControlLabel-label': {
										width: '100%'
									}
								} }
							/>
						))
					}
				</RadioGroup>
			</FormControl>
		</Box>
	);
};

export default ColorSelection;
