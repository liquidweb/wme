import React from'react';
import {
	Autocomplete,
	Grid,
	InputAdornment,
	TextField,
	Stack
} from '@mui/material';
import {
	Form,
	FormField,
	TextInput,
	WizardSectionTitle
} from '@stellarwp/wme-ui';
import Search from '@mui/icons-material/Search';
import ScreenWrapper from '@setup/ScreenWrapper';
import { useStoreSetup } from '@store/hooks';
import { StoreSetupStringData } from '@setup/data/constants';

const { storeLocation: {
	title,
	copy,
	addressLine1Placeholder,
	addressLine1Label,
	addressLine2Label,
	countryPlaceholder,
	countryLabel,
	statePlaceholder,
	cityLabel,
	postCodeLabel
} } = StoreSetupStringData;

const StoreLocation = () => {
	const {
		setupState,
	} = useStoreSetup();

	return (
		<ScreenWrapper sx={ { maxWidth: 425 } }>
			<WizardSectionTitle
				heading={ title }
				headingVariant="h2"
				copy={ copy }
			/>
			<Form>
				<Stack spacing={ 2 }>
					<FormField
						field={
							<TextInput
								fullWidth
								onChange={ handleChange('addressLine1') }
								placeholder={ addressLine1Placeholder }
								required
								value={ ftcState?.form?.addressLine1?.value }
							/>
						}
						label={ addressLine1Label }
					/>
					<FormField
						field={
							<TextInput
								fullWidth
								onChange={ handleChange('addressLine2') }
								value={ ftcState?.form?.addressLine2?.value }
							/>
						}
						label={ addressLine2Label }
					/>
					<FormField
						field={ regions?.length > 0 && (
							<Autocomplete
								getOptionLabel={ (option) => option.label }
								isOptionEqualToValue={ (option, value) => option.value === value.value }
								options={ regions }
								onInputChange={ (_, newValue) => {
									handleRegionChange(newValue);
								} }
								renderInput={ (params) => (
									<TextField
										{ ...params }
										fullWidth
										margin={ 'dense' }
										placeholder={ countryPlaceholder }
										required
										InputProps={ {
											...params.InputProps,
											startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
											type: 'text',
										} }
									/>
								) }
								value={ selectedRegion[ 0 ] }
							/>
						) }
						label={ countryLabel }
					/>
					{ states?.length > 0 && (
						<FormField
							field={
								<Autocomplete
									disabled={ ftcState.isStatesLoading }
									getOptionLabel={ (option) => option.label }
									isOptionEqualToValue={ (option, value) => option.value === value.value }
									onInputChange={ (_, newValue) => {
										handleStateChange(newValue);
									} }
									options={ states }
									renderInput={ (params) => (
										<TextField
											{ ...params }
											fullWidth
											margin={ 'dense' }
											placeholder={ statePlaceholder }
											required
											InputProps={ {
												...params.InputProps,
												startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
												type: 'text',
											} }
										/>
									) }
									value={ selectedState[ 0 ] }
								/>
							}
							label={ currentLocale }
						/>
					) }
					<Grid container flexWrap="nowrap" gap={ 2 }>
						<Grid item md={ 6 }>
							<FormField
								field={
									<TextInput
										fullWidth
										onChange={ handleChange('city') }
										placeholder={ cityLabel }
										required
										value={ ftcState?.form?.city?.value }
									/>
								}
								label={ cityLabel }
							/>
						</Grid>
						<Grid item md={ 6 }>
							<FormField
								field={
									<TextInput
										fullWidth
										onChange={ handleChange('postCode') }
										placeholder={ postCodeLabel }
										required
										value={ ftcState?.form?.postCode?.value }
									/>
								}
								label={ postCodeLabel }
							/>
						</Grid>
					</Grid>
				</Stack>
			</Form>
		</ScreenWrapper>
	);
};

export default StoreLocation;
