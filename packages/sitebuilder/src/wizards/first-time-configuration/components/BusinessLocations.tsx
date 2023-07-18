import { Box, Typography } from '@mui/material';
import { BusinessLocationInterface } from '../data/first-time-configuration-screen-data';
import { FormField, FormFieldLabel, TextInput } from '@moderntribe/wme-ui';
import { useState } from 'react';
import { FtcStringData } from '@ftc/data/constants';

const { businessLocations: locations } = FtcStringData;


export interface BusinessLocationProps {
	value: string;
	onChange: (value: string) => void;
	options: BusinessLocationInterface[];
	label: string;
}

const textMapping: Record<string, { label: string, help?: string }> = {
	address: {
		label: 'Street Address, City, State, Zipcode, Country',
	},
	serviceArea: {
		label: 'District, City, State, Zipcode, Country',
		help: 'E.g.: Skokie, Chicago, IL 60076, USA'
	}
};

const BusinessLocations = (props: BusinessLocationProps) => {
	const { value, onChange, options, label } = props;
	const [locationType, setLocationType] = useState<string>();

	const formatColor = (itemValue: string) => {
		if (locationType === itemValue) {
			return 'primary.main';
		} else if (locationType) {
			return 'text.disabled';
		}

		return 'text.primary';
	}

	return (
		<div>
			<FormFieldLabel>{ label }</FormFieldLabel>
			<Box sx={ { width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' } }>
				{ options.map((item) => (
					<Box
						key={ item.value }
						onClick={ () => setLocationType(item.value) }
						sx={ {
							cursor: 'pointer',
							display: 'flex',
							gap: '16px',
							flexDirection: 'column',
							border: '1px solid',
							borderColor: locationType === item.value ? 'primary.main' : 'border.ui',
							color: formatColor(item.value),
							padding: '13px',
							borderRadius: '4px'
						} }
					>
						{ item.icon }
						<Typography
							variant="body2"
							fontSize="13px"
							fontWeight={ 500 }
							color={ formatColor(item.value) }
						>
							{ item.label }
						</Typography>
					</Box>
				))
				}
			</Box>
			{ locationType && <Box sx={ { marginTop: '16px' } }>
				<FormField
					field={
						<TextInput
							fullWidth
							onChange={ (e) => onChange(e.target.value) }
							placeholder={ textMapping[ locationType ]?.label }
							required
							value={ value }
						/>
					}
					helperText={ textMapping[ locationType ]?.help }
					label={ locations.label }
				/>
			</Box> }
		</div>
	);
};

export default BusinessLocations;
