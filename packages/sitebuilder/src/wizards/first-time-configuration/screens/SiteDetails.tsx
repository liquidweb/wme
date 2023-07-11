import { FormField, Form, TextInput } from '@moderntribe/wme-ui';
import { Stack } from '@mui/material';
import FileUpload from '@sb/wizards/first-time-configuration/components/FileUpload';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { FtcStringData } from '@ftc/data/constants';
import { useEffect } from 'react';
import { FtcFormItemsInterface } from '../data/ftc-form';
import PageWrapper from '@ftc/components/PageWrapper';

const { siteDetails, usernamePassword } = FtcStringData;

const SiteDetails = () => {
	const { ftcState: { form, isLoading }, setFormValue, shouldBlockNextStep } = useFirstTimeConfiguration();
	useEffect(() => {
		if (form && ! isLoading) {
			shouldBlockNextStep(! form.siteName.value || ! form.tagline.value || ! form.logoId, 1);
		}
	}, [form, isLoading]);

	const handleChange = (prop: keyof FtcFormItemsInterface) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setFormValue(prop, event.target.value);
	};

	const setLogo = (id: string) => {
		setFormValue('logoId', id);
	};

	return (
		<PageWrapper>
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
								onChange={ handleChange('tagline') }
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
		</PageWrapper>
	);
};

export default SiteDetails;
