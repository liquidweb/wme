import {
	FormField,
	TextInput,
	Form,
} from '@moderntribe/wme-ui';
import { Stack } from '@mui/material';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { useEffect } from 'react';
import { FtcStringData } from '@ftc/data/constants';
import { FtcFormItemsInterface } from '../data/ftc-form';
import PageWrapper from '@ftc/components/PageWrapper';

const { siteDescription, customerDescription, valueProposition, productsAndServices } = FtcStringData;

const About = () => {
	const {
		ftcState: { form },
		setFormValue,
		shouldBlockNextStep
	} = useFirstTimeConfiguration();

	const handleInputChange =
		(prop: keyof FtcFormItemsInterface) =>
			(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
				setFormValue(prop, event.target.value);
			};

	useEffect(() => {
		if (! form) {
			return;
		}
		shouldBlockNextStep(
			! form.siteDescription.value ||
				! form.customerDescription.value ||
				! form.valueProposition.value ||
				! form.productsAndServices.value,
			2
		);
	}, [form]);

	return (
		<PageWrapper>
			<Form>
				<Stack spacing={ 2 }>
					<FormField
						field={
							<TextInput
								multiline
								rows={ 3 }
								fullWidth
								onChange={ handleInputChange('siteDescription') }
								placeholder={
									siteDescription.placeholder
								}
								required
								value={ form.siteDescription.value }
							/>
						}
						label={ siteDescription.label }
					/>
					<FormField
						field={
							<TextInput
								multiline
								rows={ 3 }
								fullWidth
								onChange={ handleInputChange('customerDescription') }
								placeholder={
									customerDescription.placeholder
								}
								required
								value={ form.customerDescription.value }
							/>
						}
						label={ customerDescription.label }
					/>
					<FormField
						field={
							<TextInput
								multiline
								rows={ 3 }
								fullWidth
								onChange={ handleInputChange('valueProposition') }
								placeholder={
									valueProposition.placeholder
								}
								required
								value={ form.valueProposition.value }
							/>
						}
						label={ valueProposition.label }
					/>
					<FormField
						field={
							<TextInput
								multiline
								rows={ 3 }
								fullWidth
								onChange={ handleInputChange('productsAndServices') }
								placeholder={
									productsAndServices.placeholder
								}
								required
								value={ form.productsAndServices.value }
							/>
						}
						label={ productsAndServices.label }
					/>
				</Stack>
			</Form>
		</PageWrapper>
	);
};

export default About;
