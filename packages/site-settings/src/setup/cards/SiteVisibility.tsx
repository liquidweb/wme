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
import { useSiteSettings } from '@site/hooks';

const PasswordWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'flex-start',
	gap: theme.spacing(1),
	'& .MuiInputBase-root': {
		minWidth: '415px',
	},
}));

const SiteVisibility = () => {
	const {
		siteSettingsState,
		setSiteVisibilityValues,
		submitSiteVisibilityForm,
	} = useSiteSettings();

	const { siteVisibilityValues } = siteSettingsState;

	const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthType>();

	const handleHideFromSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSiteVisibilityValues({
			...siteVisibilityValues,
			[ event.target.name ]: event.target.checked,
		});
		submitSiteVisibilityForm({
			[ event.target.name ]: event.target.checked
		});
	};

	const handleRestrictAccessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSiteVisibilityValues({
			...siteVisibilityValues,
			[ event.target.name ]: event.target.checked,
		});
		if (! event.target.checked) {
			submitSiteVisibilityForm({
				[ event.target.name ]: event.target.checked
			});
		}
	};

	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const strength = getPasswordStrength(event.target.value);

		setPasswordStrength(strength as PasswordStrengthType);
		setSiteVisibilityValues({
			...siteVisibilityValues,
			[ event.target.name ]: event.target.value,
		});
	};

	return (
		<Form>
			<FormField
				field={
					<InputLabel
						control={
							<CheckboxInput
								checked={ siteVisibilityValues?.hideFromSearch }
								onChange={ handleHideFromSearchChange }
								name="hideFromSearch"
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
								checked={ siteVisibilityValues?.restrictAccess }
								onChange={ handleRestrictAccessChange }
								name="restrictAccess"></CheckboxInput>
						}
						label={ __('Restrict access to visitors with the password.', 'moderntribe-sitebuilder') }
					/>
				}
			/>
			{ siteVisibilityValues?.restrictAccess && (
				<>
					<PasswordWrapper mt={ 2 } mb={ 3 }>
						<FormField
							field={
								<PasswordInput
									name="password"
									value={ siteVisibilityValues?.password }
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
							onClick={ () => {
								submitSiteVisibilityForm();
							} }
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
