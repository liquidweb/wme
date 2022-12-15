import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	Button,
	CheckboxInput,
	Form,
	FormField,
	InputLabel,
	PasswordInput,
	SetupCardContent
} from '@moderntribe/wme-ui';
import { Box, styled } from '@mui/material';

const PasswordWrapper = styled(Box)(() => ({
	'& .MuiInputBase-root': {
		minWidth: '415px',
	}
}));

const SiteVisibility = () => {

	const [visibilityValues, setVisibilityValues] = useState({
		hideSearchEngines: false,
		restrictAccess: false,
		password: '',
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setVisibilityValues({
			...visibilityValues,
			[ event.target.name ]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
	};

	return (
		<SetupCardContent>
			<Form>
				<FormField
					field={
						<InputLabel
							control={
								<CheckboxInput
									checked={ visibilityValues.hideSearchEngines }
									onChange={ handleChange }
									name="hideSearchEngines"
								/>
							}
							label={ __('Hide my sites from search engines, and whatever else.', 'moderntribe-storebuilder') }
						/>
					}
				/>
				<FormField
					field={
						<InputLabel
							control={
								<CheckboxInput
									checked={ visibilityValues.restrictAccess }
									onChange={ handleChange }
									name="restrictAccess"
								/>
							}
							label={ __('Restrict access to visitors with the password.', 'moderntribe-storebuilder') }
							checked={ visibilityValues.restrictAccess }
						/>
					}
				/>
				<PasswordWrapper mt={ 2 } mb={3}>
					<FormField
						field={
							<PasswordInput
								name="password"
								value={ visibilityValues.password }
								chipColor="error"
								chipLabel="weak"
								onChange={ handleChange }
							/>
						}
						label={ __('Password', 'moderntribe-storebuilder') }
						helperText={ __('Users will be asked for this password when accessing your site.', 'moderntribe-storebuilder') }
					/>
				</PasswordWrapper>
				<Button
					variant="contained"
					color="secondary">
					{ __('Save', 'moderntribe-storebuilder') }
				</Button>
			</Form>
		</SetupCardContent>
	);
};

export default SiteVisibility;
