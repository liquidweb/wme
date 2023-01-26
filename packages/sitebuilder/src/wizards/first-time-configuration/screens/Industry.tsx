import { FormField, MenuItem, SelectInput, TextInput, Form, AutoComplete, ChipInput } from '@moderntribe/wme-ui';
import { Stack } from '@mui/material';
import ScreenWrapper from '@sb/wizards/first-time-configuration/components/ScreenWrapper';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { useCallback, useEffect, useState } from 'react';
import { FtcStringData } from '@ftc/data/constants';
import { FtcFormItemsInterface } from '../data/first-time-configuration-screen-data';
const { industryDetails } = FtcStringData;

const Industry = () => {
	const { ftcState: { form, isLoading, personalityOptions, industryVerticals }, setFormValue, shouldAllowNextStep } = useFirstTimeConfiguration();
	const [subVerticals, setSubVerticals] = useState<string[]>([]);
	const [showTextInput, setShowTextInput] = useState(false);

	const handleInputChange = (prop: keyof FtcFormItemsInterface) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setFormValue(prop, event.target.value);
	};

	const handleSelectChange = (prop: keyof FtcFormItemsInterface, value: string[]) => {
		setFormValue(prop, value);
	};

	useEffect(() => {
		if (! form || isLoading) {
			return;
		}

		shouldAllowNextStep(form.siteDescription.value && form.sitePersonality.value && form.siteKeywords.value, 3);
	}, [form, isLoading]);

	const verticalChange = useCallback((vertical: string | null) => {
		setFormValue('industry', (vertical || ''));
		setFormValue('subIndustry', '');

		if (! vertical) {
			setSubVerticals([]);
			setShowTextInput(false);
		} else if (vertical === 'Other') {
			setShowTextInput(true);
		} else {
			setSubVerticals(industryVerticals[ (vertical || '') ]);
			setShowTextInput(false);
		}
	}, []);

	const subVerticalChange = (category: string) => {
		setFormValue('subIndustry', category);
	};

	return (
		<ScreenWrapper sx={ { maxWidth: 425, width: 425 } }>
			<Form>
				<Stack spacing={ 2 }>
					<FormField
						field={
							<AutoComplete
								id="search-industry"
								value={ form.industry.value }
								onChange={ verticalChange }
								disablePortal
								options={ Object.keys(industryVerticals) }
								placeholder={ industryDetails.siteIndustryPlaceholder }
							/>
						}
						label={ industryDetails.siteIndustryText }
					/>
					<FormField
						field={ showTextInput ? (
							<TextInput
								fullWidth
								onChange={ handleInputChange('subIndustry') }
								placeholder={ industryDetails.siteSubIndustryPlaceholder }
								required
								value={ form.subIndustry.value }
							/>
						) : (
							<SelectInput
								fullWidth
								onChange={ (e) => subVerticalChange(e.target.value as string) }
								placeholder={ industryDetails.siteSubIndustryPlaceholder }
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
						label={ industryDetails.siteSubIndustryText }
					/>
					<FormField
						field={
							<TextInput
								fullWidth
								multiline
								minRows={ 3 }
								onChange={ handleInputChange('siteDescription') }
								placeholder={ industryDetails.businessDescriptionPlaceholder }
								required
								value={ form.siteDescription.value }
							/>
						}
						label={ industryDetails.businessDescriptionLabel }
					/>
					<FormField
						field={
							<ChipInput
								selectedTags={ (tags: string[]) => setFormValue('siteKeywords', tags) }
								placeholder={ 'Blog, tech...' }
								required
								tags={ form.siteKeywords.value }
							/>
						}
						helperText={ 'Separate each keyword with a comma' }
						label={ 'Keywords' }
					/>
					<FormField
						field={
							<SelectInput
								fullWidth
								onChange={ (e) => handleSelectChange('sitePersonality', e.target.value as string[]) }
								value={ form.sitePersonality.value }
								placeholder={ 'Select an option...' }
							>
								{ personalityOptions.map((item) => (
									<MenuItem id={ item } key={ item } value={ item }>{ item }</MenuItem>
								)) }
							</SelectInput>
						}
						label={ 'Describe your personality' }
					/>
				</Stack>
			</Form>
		</ScreenWrapper>
	);
};

export default Industry;
