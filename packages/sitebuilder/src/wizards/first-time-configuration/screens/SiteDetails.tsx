import { WizardSectionTitle, FormField, Form, TextInput, SelectInput, MenuItem } from '@moderntribe/wme-ui';
import { Autocomplete, Stack, TextField } from '@mui/material';
import FileUpload from '@sb/wizards/first-time-configuration/components/FileUpload';
import ScreenWrapper from '@sb/wizards/first-time-configuration/components/ScreenWrapper';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { FtcFormItemsInterface } from '@ftc/data/first-time-configuration-screen-data';
import { FtcStringData } from '@ftc/data/constants';
import { useState } from 'react';

const { siteDetails } = FtcStringData;

const SiteDetails = () => {
	const { ftcState: { form, industryVerticals }, setFormValue } = useFirstTimeConfiguration();
	const [subVerticals, setSubVerticals] = useState<string[]>([]);

	const handleChange = (prop: keyof FtcFormItemsInterface) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setFormValue(prop, event.target.value);
	};

	const setLogo = (id: string) => {
		setFormValue('logoId', id);
	};

	const verticalChange = (vertical: string | null) => {
		console.log('vertical', vertical);
		setFormValue('industry', (vertical || ''));
		if (! vertical) {
			setSubVerticals([]);
		} else {
			setSubVerticals(industryVerticals[ (vertical || '') ]);
		}
	};

	const subVerticalChange = (category: string) => {
		setFormValue('subIndustry', category);
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
								value={ form.siteName.value }
							/>
						}
						helperText={ siteDetails.siteNameHelperText }
						label={ siteDetails.siteNameLabelText }
					/>
					<FormField
						field={
							<Autocomplete
								id="search-industry"
								value={ form.industry.value }
								onChange={ (_event: any, newValue: string | null) => {
									verticalChange(newValue);
								} }
								disablePortal
								options={ Object.keys(industryVerticals) }
								renderInput={ (params) => <TextField { ...params } /> }
							/>
						}
						label={ siteDetails.siteIndustryText }
					/>
					<FormField
						field={
							<SelectInput
								fullWidth
								onChange={ (e) => subVerticalChange(e.target.value as string) }
								placeholder={ siteDetails.siteIndustryPlaceholder }
								required
								value={ form.subIndustry.value }
							>
								{ subVerticals.map((vert) => (
									<MenuItem key={ vert } value={ vert }>
										{ vert }
									</MenuItem>
								)) }
							</SelectInput>
						}
						label={ siteDetails.siteSubIndustryText }
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
