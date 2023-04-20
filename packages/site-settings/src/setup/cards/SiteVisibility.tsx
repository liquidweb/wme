import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	Button,
	CheckboxInput,
	Form,
	FormField,
	InputLabel,
	PasswordInput
} from '@moderntribe/wme-ui';
import { Box, styled } from '@mui/material';
import { getPasswordStrength } from '@site/utils';

const PasswordWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'flex-start',
	gap: theme.spacing(1),
	'& .MuiInputBase-root': {
		minWidth: '415px',
	},
}));

const SiteVisibility = () => {
	const [visibilityValues, setVisibilityValues] = useState({
		hideSearchEngines: false,
		restrictAccess: false,
		password: '',
	});

	const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthType>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setVisibilityValues({
			...visibilityValues,
			[ event.target.name ]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
	};

	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const strength = getPasswordStrength(event.target.value);

		setPasswordStrength(strength as PasswordStrengthType);
		setVisibilityValues({ ...visibilityValues, password: event.target.value });
	};

	return (
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
						label={ __('Hide my sites from search engines, and whatever else.', 'moderntribe-sitebuilder') }
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
						label={ __('Restrict access to visitors with the password.', 'moderntribe-sitebuilder') }
						checked={ visibilityValues.restrictAccess }
					/>
				}
			/>
			{ visibilityValues.restrictAccess && (
				<>
					<PasswordWrapper mt={ 2 } mb={ 3 }>
						<FormField
							field={
								<PasswordInput
									name="password"
									value={ visibilityValues.password }
									chipColor={ passwordStrength?.color }
									chipLabel={ passwordStrength?.label }
									onChange={ handlePasswordChange }
								/>
							}
							label={ __('Password', 'moderntribe-sitebuilder') }
							helperText={ __('Users will be asked for this password when accessing your site.', 'moderntribe-sitebuilder') }
						/>
						<Button
							variant="contained"
							sx={ { marginTop: '26px' } }
						>
							{ __('Save', 'moderntribe-sitebuilder') }
						</Button>
					</PasswordWrapper>
				</>
			) }
		</Form>
	);
};

export default SiteVisibility;
