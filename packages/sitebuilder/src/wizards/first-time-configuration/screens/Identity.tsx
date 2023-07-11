import {
	FormField,
	MenuItem,
	SelectInput,
	TextInput,
	Form,
	AutoComplete,
} from '@moderntribe/wme-ui';
import { Stack, SelectChangeEvent } from '@mui/material';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { useEffect } from 'react';
import { FtcStringData } from '@ftc/data/constants';
import { FtcFormItemsInterface } from '../data/ftc-form';
import BusinessLocations from '@ftc/components/BusinessLocations';
import PageWrapper from '@ftc/components/PageWrapper';

const { iAm, businessLocation, industry, ownerName } = FtcStringData;

const YourInformation = () => {
	const {
		ftcState: { form, industryVerticals, businessLocationOptions },
		setFormValue,
		shouldBlockNextStep
	} = useFirstTimeConfiguration();

	const handleInputChange =
		(prop: keyof FtcFormItemsInterface) =>
			(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
				setFormValue(prop, event.target.value);
			};

	const handleSelectChange = (prop: keyof FtcFormItemsInterface) =>
		(event: SelectChangeEvent<unknown>) => {
			const value = event.target.value as string;
			setFormValue(prop, value);
		};

	const handleSimpleChange = (prop: keyof FtcFormItemsInterface) => (value: string) => {
		setFormValue(prop, value);
	};

	useEffect(() => {
		if (! form) {
			return;
		}
		shouldBlockNextStep(
			! form.ownerIdentity.value ||
				! form.ownerName.value ||
				! form.businessLocation.value ||
				! form.industry.value,
			1
		);
	}, [form]);

	return (
		<PageWrapper>
			<Form>
				<Stack spacing={ 2 }>
					<FormField
						field={
							<SelectInput
								fullWidth
								onChange={ handleSelectChange('ownerIdentity') }
								placeholder={ iAm.placeholder }
								required
								value={ form.ownerIdentity.value }
							>
								<MenuItem key={ 1 } value="An Individual">
									An Individual
								</MenuItem>
								<MenuItem key={ 2 } value="A Company">
									A Company
								</MenuItem>
								<MenuItem key={ 2 } value="An Organization">
									An Organization
								</MenuItem>
							</SelectInput>
						}
						label={ iAm.label }
					/>
					<FormField
						field={
							<TextInput
								fullWidth
								onChange={ handleInputChange('ownerName') }
								placeholder={
									ownerName.placeholder
								}
								required
								value={ form.ownerName.value }
							/>
						}
						label={ ownerName.label }
					/>
					<BusinessLocations
						value={ form.businessLocation.value }
						onChange={ handleSimpleChange('businessLocation') }
						options={ businessLocationOptions }
						label={ businessLocation.label }
					/>
					<FormField
						field={
							<AutoComplete
								id="search-industry"
								value={ form.industry.value }
								onChange={ handleSimpleChange('industry') }
								disablePortal
								options={ Object.keys(industryVerticals) }
								placeholder={
									industry.placeholder
								}
							/>
						}
						label={ industry.text }
					/>
				</Stack>
			</Form>
		</PageWrapper>
	);
};

export default YourInformation;
