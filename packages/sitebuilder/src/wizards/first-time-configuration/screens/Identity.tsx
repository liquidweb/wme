import {
	FormField,
	MenuItem,
	SelectInput,
	TextInput,
	Form,
	AutoComplete
} from '@moderntribe/wme-ui';
import { Stack, SelectChangeEvent } from '@mui/material';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { useEffect, useState } from 'react';
import { FtcStringData } from '@ftc/data/constants';
import { FtcFormItemsInterface } from '../data/ftc-form';
import BusinessLocations from '@ftc/components/BusinessLocations';
import PageWrapper from '@ftc/components/PageWrapper';

const { iAm, businessLocation, industry, ownerName } = FtcStringData;

export interface NameFieldMappingProps {
	'An Individual': string;
	'A Company': string;
	'An Organization': string;
}
const nameFieldMapping: NameFieldMappingProps = {
	'An Individual': 'Name',
	'A Company': 'Company',
	'An Organization': 'Organization'
};

const identityOptions = [
	'An Individual', 'A Company', 'An Organization'
];

const YourInformation = () => {
	const {
		ftcState: { form, industryVerticals, businessLocationOptions },
		setFormValue,
		shouldBlockNextStep
	} = useFirstTimeConfiguration();
	const [nameFieldLabel, setNameFieldLabel] = useState('Name');

	const handleInputChange =
		(prop: keyof FtcFormItemsInterface) =>
			(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<unknown>) => {
				setFormValue(prop, event.target.value as string);
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
				! form.industry.value
		);

		setNameFieldLabel(form.ownerIdentity.value ? nameFieldMapping[ form.ownerIdentity.value as keyof NameFieldMappingProps ] : identityOptions[ 0 ]);
	}, [form]);

	return (
		<PageWrapper>
			<Form>
				<Stack spacing={ 2 }>
					<FormField
						field={
							<SelectInput
								fullWidth
								onChange={ handleInputChange('ownerIdentity') }
								placeholder={ iAm.placeholder }
								required
								value={ form.ownerIdentity.value }
							>
								{ identityOptions.map((opt) => (
									<MenuItem key={ opt } value={ opt }>
										{ opt }
									</MenuItem>
								)) }
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
									`Your ${ nameFieldLabel }`
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
								freeSolo
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
