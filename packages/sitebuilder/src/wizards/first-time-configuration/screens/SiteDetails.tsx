import { WizardSectionTitle, FormField, TextInput, Form } from '@moderntribe/wme-ui';
import { Stack } from '@mui/material';
import FileUpload from '@ftc/FileUpload';
import ScreenWrapper from '@ftc/ScreenWrapper';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { FtcFormItemsInterface } from '@ftc/data/first-time-configuration-screen-data';
import { FtcStringData } from '@ftc/data/constants';

const { siteDetails } = FtcStringData;

const SiteDetails = () => {
	const { ftcState: { form }, setFormValue } = useFirstTimeConfiguration();
	const siteName = form.siteName.value;
	const tagline = form.tagline.value;

	const handleChange = (prop: keyof FtcFormItemsInterface) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setFormValue(prop, event.target.value);
	};

	const setLogo = (id: string) => {
		setFormValue('logoId', id);
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
		</ScreenWrapper>
	);
};

export default SiteDetails;
