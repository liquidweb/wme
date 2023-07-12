import { Box, Typography } from '@mui/material';
import { BusinessLocationInterface } from '../data/first-time-configuration-screen-data';
import { FormFieldLabel } from '@moderntribe/wme-ui';

export interface BusinessLocationProps {
	value: string;
	onChange: (value: string) => void;
	options:BusinessLocationInterface[];
	label: string;
}

const BusinessLocations = (props: BusinessLocationProps) => {
	const { value, onChange, options, label } = props;

	return (
		<div>
			<FormFieldLabel>{ label }</FormFieldLabel>
			<Box sx={ { width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' } }>
				{ options.map((item) => (
					<Box
						key={ item.value }
						onClick={ () => onChange(item.value) }
						sx={ {
							cursor: 'pointer',
							display: 'flex',
							gap: '16px',
							flexDirection: 'column',
							border: '1px solid',
							borderColor: value === item.value ? 'success.main' : 'border.ui',
							padding: '13px',
							borderRadius: '4px'
						} }
					>
						{ item.icon }
						<Typography variant="body2" fontSize="13px" fontWeight={ 500 }>{ item.label }</Typography>
					</Box>
				))
				}
			</Box>
		</div>
	);
};

export default BusinessLocations;
