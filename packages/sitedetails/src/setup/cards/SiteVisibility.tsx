import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	Button,
	CheckboxInput,
	Form,
	FormField,
	InputLabel,
	PasswordInput,
	SetupCardAccordion,
	SetupCardContent
} from '@moderntribe/wme-ui';
import { Box, styled } from '@mui/material';

import type { SetupCardAccordionProps } from '@moderntribe/wme-ui/src/components/setup-card-accordion/setup-card-accordion';

const PasswordWrapper = styled(Box)(() => ({
	'& .MuiInputBase-root': {
		minWidth: '415px',
	}
}));

const SiteVisibility = (props: SetupCardAccordionProps) => {
	const {
		id = '',
		header = '',
		subHeader = '',
		chipText = '',
		chipBackground = 'default',
		...rest
	} = props;

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
		<SetupCardAccordion
			id={ id }
			header={ header }
			subHeader={ subHeader }
			chipBackground={ chipBackground }
			chipText={ chipText }
			defaultExpanded={ true }
			{ ...rest }
		>
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
		</SetupCardAccordion>
	);
};

export default SiteVisibility;
