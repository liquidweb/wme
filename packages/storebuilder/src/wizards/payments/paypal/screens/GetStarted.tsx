import { Box, Link, SelectChangeEvent, Typography } from '@mui/material';
import {
	Form,
	FormFieldLabel,
	SelectInput,
	MenuItem
} from '@moderntribe/wme-ui';
import { paymentsPaypalConsts, dropdownItems } from '../data/constants';
import { usePaymentsPaypal } from '@store/hooks';

// PayPal Get Started Wizard screen
const GetStarted = () => {
	const { paymentsPaypalState: { plan }, setPlan } = usePaymentsPaypal();
	const { getStarted: { dropdownLabel, helperText, helperLink, helperLinkText } } = paymentsPaypalConsts;

	const handlePlanChange = (event: SelectChangeEvent<unknown>) => {
		setPlan(event.target.value as string);
	};

	if (dropdownItems) {
		return (
			<Box sx={ { maxWidth: 415, width: '100%' } }>
				<Form>
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
					<Typography align="center" variant="body2" sx={ { mt: 3 } }>
						{ helperText } <Link href={ helperLink } target="_blank">{ helperLinkText }</Link>
					</Typography>
				</Form>
			</Box>
		);
	}
	return null;
};

export default GetStarted;
