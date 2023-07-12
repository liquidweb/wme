import {
	FormField,
	Form,
	ChipInput
} from '@moderntribe/wme-ui';
import { Stack, Typography } from '@mui/material';
import { useFirstTimeConfiguration } from '@sb/hooks';
// import { useEffect } from 'react';
import { FtcStringData } from '@ftc/data/constants';
// import { FtcFormItemsInterface } from '../data/ftc-form';
import PageWrapper from '@ftc/components/PageWrapper';

const { keywords } = FtcStringData;

const ContentTone = () => {
	const {
		ftcState: { form },
		setFormValue,
	} = useFirstTimeConfiguration();

	// const handleInputChange =
	// 	(prop: keyof FtcFormItemsInterface) =>
	// 		(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<unknown>) => {
	// 			setFormValue(prop, event.target.value as string);
	// 		};

	const updateKeywords = (tags: string[]) => {
		setFormValue('siteKeywords', tags);
	};

	// useEffect(() => {
	// 	if (! form) {
	// 		return;
	// 	}
	// 	shouldBlockNextStep(
	// 		! form.siteDescription.value ||
	// 			! form.customerDescription.value ||
	// 			! form.valueProposition.value ||
	// 			! form.productsAndServices.value,
	// 		2
	// 	);
	// }, [form]);

	return (
		<PageWrapper>
			<Form>
				<Stack spacing={ 2 }>
					<div>
						<Typography variant="h3">{ keywords.title }</Typography>
						<Typography variant="body2" sx={ { color: 'text.secondary', marginTop: '8px' } }>{ keywords.description }</Typography>
					</div>
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
					{ /* <FormField
						field={
							<SelectInput
								fullWidth
								onChange={ handleInputChange('sitePersonality') }
								value={ form.sitePersonality.value }
								placeholder={
									industryDetails.personalityPlaceholder
								}
							>
								{ personalityOptions.map((item) => (
									<MenuItem id={ item } key={ item } value={ item }>
										{ item }
									</MenuItem>
								)) }
							</SelectInput>
						}
						label={ industryDetails.personalityLabel }
					/> */ }
				</Stack>
			</Form>
		</PageWrapper>
	);
};

export default ContentTone;
