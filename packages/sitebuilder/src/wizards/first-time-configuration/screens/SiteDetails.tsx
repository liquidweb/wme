import { FormField, Form, TextInput } from '@moderntribe/wme-ui';
import { Box, Stack } from '@mui/material';
import FileUpload from '@sb/wizards/first-time-configuration/components/FileUpload';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { FtcStringData } from '@ftc/data/constants';
import { useEffect } from 'react';
import { FtcFormItemsInterface } from '../data/first-time-configuration-screen-data';

const { siteDetails, usernamePassword } = FtcStringData;

const SiteDetails = () => {
	const { ftcState: { form, isLoading }, setFormValue, shouldBlockNextStep } = useFirstTimeConfiguration();
	useEffect(() => {
		if (form && ! isLoading) {
			shouldBlockNextStep(! form.industry.value && ! form.subIndustry.value, 1);
		}
	}, [form, isLoading]);

	const handleChange = (prop: keyof FtcFormItemsInterface) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setFormValue(prop, event.target.value);
	};

	const setLogo = (id: string) => {
		setFormValue('logoId', id);
	};

	return (
		<Box sx={ { maxWidth: 425 } }>
			<Form>
				<Stack spacing={ 2 }>
					<FormField
						field={
							<TextInput
								fullWidth
								placeholder={ usernamePassword.siteNameLabelText }
								required
								value={ form.siteName.value }
								disabled
							/>
						}
						label={ usernamePassword.siteNameLabelText }
						helperText={ usernamePassword.siteNameHelpText }
					/>
					<FormField
						field={
							<TextInput
								onChange={ handleChange("tagline") }
								fullWidth
								placeholder={ siteDetails.siteTagnamePlaceholderText }
								required
								value={ form.tagline.value }
							/>
						}
						label={ siteDetails.siteTagnameLabelText }
					/>
					<FormField
						field={
							<FileUpload
								buttonId={ 'site-logo-upload' }
								buttonText={ siteDetails.addLogoButtonText }
								fileSizeWarning={ `${ siteDetails.maxFileSize } ${ siteDetails.logoMaxText }` }
								onSetFile={ setLogo }
							/>
						}
						helperText={ siteDetails.siteLogoHelperText }
						label={ siteDetails.siteLogoLabelText }
					/>
				</Stack>
			</Form>
		</Box>
	);
};

export default SiteDetails;
