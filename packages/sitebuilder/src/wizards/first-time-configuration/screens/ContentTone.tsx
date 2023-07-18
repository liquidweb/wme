import {
	FormField,
	Form,
	ChipInput
} from '@moderntribe/wme-ui';
import { Box, Stack, Typography } from '@mui/material';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { useEffect } from 'react';
import { FtcStringData } from '@ftc/data/constants';
import PageWrapper from '@ftc/components/PageWrapper';
import CustomSelectInput from '../components/CustomSelectInput';

const { keywords, contentPersonality } = FtcStringData;

const ContentTone = () => {
	const {
		ftcState: { form, personalityOptions },
		setFormValue,
		shouldBlockNextStep
	} = useFirstTimeConfiguration();

	const updateKeywords = (tags: string[]) => {
		setFormValue('siteKeywords', tags);
	};
	const updatePersonality = (value: string) => {
		setFormValue('sitePersonality', value);
	};

	useEffect(() => {
		if (! form) {
			return;
		}
		shouldBlockNextStep(! form.siteKeywords.value || ! form.sitePersonality.value);
	}, [form]);

	return (
		<PageWrapper>
			<Form>
				<Stack spacing={ 4 }>
					<Box sx={ { display: 'flex', flexDirection: 'column', gap: 1 } }>
						<Typography variant="h3">{ keywords.title }</Typography>
						<Typography variant="body2" sx={ { color: 'text.secondary', marginBottom: '8x' } }>{ keywords.description }</Typography>
						<FormField
							field={
								<ChipInput
									rows={ 3 }
									selectedTags={ updateKeywords }
									placeholder={
										keywords.placeholder
									}
									required
									tags={ form.siteKeywords.value }
								/>
							}
							helperText={ keywords.helperText }
						/>
					</Box>
					<Box sx={ { display: 'flex', flexDirection: 'column', gap: 1 } }>
						<Typography variant="h3">{ contentPersonality.title }</Typography>
						<Typography variant="body2" sx={ { color: 'text.secondary', marginBottom: '8px' } }>{ contentPersonality.description }</Typography>
						<FormField
							field={
								<CustomSelectInput
									options={ personalityOptions }
									value={ form.sitePersonality.value || personalityOptions[ 0 ].name }
									onChange={ (val) => updatePersonality(val) }
									inputName="sitePersonality"
								/>
							}
						/>
					</Box>
				</Stack>
			</Form>
		</PageWrapper>
	);
};

export default ContentTone;
