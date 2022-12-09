import { Box, useTheme, SelectChangeEvent } from '@mui/material';
import {
	Form,
	FormFieldLabel,
	SelectInput,
	MenuItem,
	InputHelperText,
	WizardSectionTitle
} from '@moderntribe/wme-ui';
import { IMAGE_DIR } from '@store/constants';
import { paymentsPaypalConsts, dropdownItems } from '../data/constants';
import { usePaymentsPaypal } from '@store/hooks';

// PayPal Get Started Wizard screen
const GetStarted = () => {
	const theme = useTheme();
	const { paymentsPaypalState: { plan }, setPlan } = usePaymentsPaypal();
	const { getStarted: { heading, copy, dropdownLabel, helperText, paypalAlt } } = paymentsPaypalConsts;
	const paypalIcon = `${ IMAGE_DIR }paypal-logo.png`;

	const handlePlanChange = (event: SelectChangeEvent<unknown>) => {
		setPlan(event.target.value as string);
	};

	if (dropdownItems) {
		return (
			<Box sx={ { maxWidth: 500 } }>
				<WizardSectionTitle
					iconSrc={ paypalIcon }
					iconAlt={ paypalAlt }
					heading={ heading }
					headingVariant={ 'h2' }
					copy={ copy }
					bookend={ true }
					sx={ { mb: theme.spacing(4) } }
				/>
				<Form sx={ { px: theme.spacing(4) } }>
					<FormFieldLabel>{ dropdownLabel }</FormFieldLabel>
					<SelectInput
						variant="outlined"
						onChange={ handlePlanChange }
						value={ plan }
						fullWidth
						renderValue={ (value) => {
							if (value) {
								return dropdownItems.find((item) => item.value === value)?.text;
							}
						} }
					>
						{ dropdownItems.map((item) => {
							return <MenuItem id={ item.id } key={ item.key } value={ item.value }>{ item.text }</MenuItem>;
						}
						) }
					</SelectInput>
					<InputHelperText>{ helperText }</InputHelperText>
				</Form>
			</Box>
		);
	}
	return null;
};

export default GetStarted;
