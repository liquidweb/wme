import {
	FormField,
	TextInput,
	Form
} from '@moderntribe/wme-ui';
import { Stack } from '@mui/material';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { useEffect } from 'react';
import { FtcStringData } from '@ftc/data/constants';
import { FtcFormItemsInterface } from '../data/ftc-form';
import PageWrapper from '@ftc/components/PageWrapper';

const { siteDescription } = FtcStringData;

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
		shouldBlockNextStep(! form.siteDescription.value);
	}, [form]);

	return (
		<PageWrapper>
			<Form>
				<Stack spacing={ 2 }>
					<FormField
						field={
							<TextInput
								multiline
								rows={ 9 }
								fullWidth
								onChange={ handleInputChange('siteDescription') }
								placeholder={ siteDescription.placeholder }
								required
								value={ form.siteDescription.value }
							/>
						}
						label={ `${ siteDescription.label } ${ form.ownerIdentity.value.split(' ')[ 1 ]?.toLowerCase() || 'business' }` }
					/>
				</Stack>
			</Form>
		</PageWrapper>
	);
};

export default About;
