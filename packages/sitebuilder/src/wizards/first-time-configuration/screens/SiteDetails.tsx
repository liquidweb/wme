import { FormField, Form } from '@moderntribe/wme-ui';
import { Stack } from '@mui/material';
import FileUpload from '@sb/wizards/first-time-configuration/components/FileUpload';
import ScreenWrapper from '@sb/wizards/first-time-configuration/components/ScreenWrapper';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { FtcStringData } from '@ftc/data/constants';
import { useEffect } from 'react';

const { siteDetails } = FtcStringData;

const SiteDetails = () => {
	const { ftcState: { form, isLoading }, setFormValue, shouldAllowNextStep } = useFirstTimeConfiguration();
	useEffect(() => {
		if (form && ! isLoading) {
			shouldAllowNextStep(! form.industry.value && ! form.subIndustry.value, 1);
		}
	}, [form, isLoading]);

	// const handleChange = (prop: keyof FtcFormItemsInterface) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
	// 	setFormValue(prop, event.target.value);
	// };

	const setLogo = (id: string) => {
		setFormValue('logoId', id);
	};

	return (
		<ScreenWrapper sx={ { maxWidth: 425 } }>
			<Form>
				<Stack spacing={ 2 }>
					{ /* <FormField
						field={
							<AutoComplete
								id="search-industry"
								value={ form.industry.value }
								onChange={ verticalChange }
								disablePortal
								options={ Object.keys(industryVerticals) }
								placeholder={ siteDetails.siteIndustryPlaceholder }
							/>
						}
						label={ siteDetails.siteIndustryText }
					/>
					<FormField
						field={ showTextInput ? (
							<TextInput
								fullWidth
								onChange={ handleChange('subIndustry') }
								placeholder={ siteDetails.siteIndustryPlaceholder }
								required
								value={ form.subIndustry.value }
							/>
						) : (
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
						) }
						label={ siteDetails.siteSubIndustryText }
					/> */ }
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
