import React, { useState } from 'react';
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
} from '@moderntribe/wme-ui';
import Search from '@mui/icons-material/Search';
import ScreenWrapper from '@setup/ScreenWrapper';
import { useStoreSetup } from '@store/hooks';
import { StoreSetupStringData } from '@setup/data/constants';
import { StoreSetupFormItemsInterface } from '@setup/data/store-setup-screen-data';

const { storeLocation: {
	title,
	copy,
	addressLineOnePlaceholder,
	addressLineOneLabel,
	addressLineTwoLabel,
	countryPlaceholder,
	countryLabel,
	statePlaceholder,
	cityLabel,
	postCodeLabel
} } = StoreSetupStringData;

const StoreLocation = () => {
	const {
		storeSetupState: {
			addressLineOne,
			addressLineTwo,
			city,
			postCode,
			isLoading
		},
		setStateAndFormValue,
		getCurrentLocale,
		setRegion,
		getRegions,
		getSelectedRegion,
		getStates,
		getSelectedState
	} = useStoreSetup();

	const [isInitialState, setIsInitialState] = useState<boolean>(true);

	const currentLocale = getCurrentLocale();
	const regions = getRegions();
	const selectedRegion = getSelectedRegion();
	const states = getStates();
	const selectedState = getSelectedState();

	const handleChange = (prop: keyof StoreSetupFormItemsInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setStateAndFormValue(prop, event.target.value);
	};

	const handleRegionChange = (value: string) => {
		const region = regions?.filter((item) => item.label === value);
		if (region[ 0 ]?.value) {
			setRegion(region[ 0 ].value);
		}
	};

	const handleStateChange = (value: string) => {
		const state = states?.filter((item) => item.label === value);
		if (state[ 0 ]?.value) {
			setStateAndFormValue('state', state[ 0 ].value, ! isInitialState);
			setIsInitialState(false);
		}
	};

	return (
		<ScreenWrapper sx={ { maxWidth: 425 } }>
			<WizardSectionTitle
				heading={ title }
				headingVariant="h2"
				copy={ copy }
				sx={ { mb: 4 } }
			/>
			<Form>
				<Stack spacing={ 2 }>
					<FormField
						field={
							<TextInput
								fullWidth
								onChange={ handleChange('addressLineOne') }
								placeholder={ addressLineOnePlaceholder }
								required
								value={ addressLineOne }
							/>
						}
						label={ addressLineOneLabel }
					/>
					<FormField
						field={
							<TextInput
								fullWidth
								onChange={ handleChange('addressLineTwo') }
								value={ addressLineTwo }
							/>
						}
						label={ addressLineTwoLabel }
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
									disabled={ isLoading }
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
										value={ city }
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
										value={ postCode }
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
