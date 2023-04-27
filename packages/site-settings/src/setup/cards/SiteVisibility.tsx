import { __ } from '@wordpress/i18n';
import { useState, useReducer } from '@wordpress/element';
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
import {
	removeNulls,
	handleActionRequest
} from '@moderntribe/wme-utils';

const PasswordWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'flex-start',
	gap: theme.spacing(1),
	'& .MuiInputBase-root': {
		minWidth: '415px',
	},
}));

const SiteVisibility = (cardData:SetupCardAccordionInterface) => {
	const { ajax, hideFromSearch, restrictAccess } = cardData;

	const [visibility, updateVisibility] = useReducer((prev, next) => {
		return { ...prev, ...next };
	}, {
		hideFromSearch: JSON.parse(hideFromSearch),
		restrictAccess: JSON.parse(restrictAccess),
		password: '',
	});

	const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthType>();

	const handleSubmit = (visibilityData) => {
		const data = removeNulls({
			_wpnonce: ajax.nonce,
			action: ajax.action,
			sub_action: 'save',
			hideFromSearch: visibilityData.hideFromSearch,
			restrictAccess: visibilityData.restrictAccess,
			password: visibilityData.password,
		});

		handleActionRequest(data)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => console.log(error));
	};

	const handleHideFromSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const updatedVisibility = {
			...visibility,
			[event.target.name]: event.target.checked,
		};
		updateVisibility(updatedVisibility);
		handleSubmit(updatedVisibility);
	};

	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const strength = getPasswordStrength(event.target.value);

		setPasswordStrength(strength as PasswordStrengthType);
		updateVisibility({ password: event.target.value });
	};

	return (
		<Form>
			<FormField
				field={
					<InputLabel
						control={
							<CheckboxInput
								checked={ visibility.hideFromSearch }
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
								checked={ visibility.restrictAccess }
								onChange={ (e) => updateVisibility({ restrictAccess: e.target.checked }) }
								name="restrictAccess"
							/>
						}
						label={ __('Restrict access to visitors with the password.', 'moderntribe-sitebuilder') }
						checked={ visibility.restrictAccess }
					/>
				}
			/>
			{ visibility.restrictAccess && (
				<>
					<PasswordWrapper mt={ 2 } mb={ 3 }>
						<FormField
							field={
								<PasswordInput
									name="password"
									value={ visibility.password }
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
							onClick={ handleSubmit }
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
