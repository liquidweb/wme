import React from 'react';
import { WizardSectionTitle, FormField, TextInput, Form } from '@stellarwp/wme-ui';
import { Stack } from '@mui/material';
import ScreenWrapper from '@setup/ScreenWrapper';
import { useStoreSetup } from '@store/hooks';
import { FtcFormItemsInterface } from '@setup/data/store-setup-screen-data';
import { FtcStringData } from '@setup/data/constants';

const { siteDetails } = FtcStringData;

const StoreDetails = () => {
	const { ftcState: { form }, setFormValue } = useStoreSetup();
	const siteName = form.siteName.value;
	const tagline = form.tagline.value;

	const handleChange = (prop: keyof FtcFormItemsInterface) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		// setFormValue(prop, event.target.value);
	};

	return (
		<ScreenWrapper sx={ { maxWidth: 425 } }>
			<WizardSectionTitle
				heading={ siteDetails.title }
				headingVariant="h2"
			/>
			<Form>
				<Stack spacing={ 2 }>
					<FormField
						field={
							<TextInput
								fullWidth
								onChange={ handleChange('siteName') }
								placeholder={ siteDetails.siteNameLabelText }
								required
								value={ siteName }
							/>
						}
						helperText={ siteDetails.siteNameHelperText }
						label={ siteDetails.siteNameLabelText }
					/>
					<FormField
						field={
							<TextInput
								fullWidth
								onChange={ handleChange('tagline') }
								placeholder={ siteDetails.siteTagnamePlaceholderText }
								required
								value={ tagline }
							/>
						}
						helperText={ siteDetails.siteTaglineHelperText }
						label={ siteDetails.siteTagnameLabelText }
					/>
				</Stack>
			</Form>
		</ScreenWrapper>
	);
};

export default StoreDetails;
