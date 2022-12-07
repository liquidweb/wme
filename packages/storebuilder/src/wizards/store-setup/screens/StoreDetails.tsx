import { useEffect, useState } from '@wordpress/element';
import { Stack, Typography, MenuItem, SelectChangeEvent } from '@mui/material';
import {
	CardSelectGroup,
	CardSelectItem,
	Form,
	FormField,
	SelectInput,
	WizardSectionTitle
} from '@moderntribe/wme-ui';
import ScreenWrapper from '@setup/ScreenWrapper';
import { useStoreSetup } from '@store/hooks';
import { pxToRem } from '@moderntribe/wme-utils';
import {
	StoreSetupStringData,
	productCountOptions,
	productTypeOptions
} from '@setup/data/constants';

const { storeDetails: {
	title,
	copy,
	currencyLabelText,
	currencyHelperText,
	productTypesLabelText,
	productTypesHelperText,
	productCountLabelText
} } = StoreSetupStringData;

const cardSelectSx = {
	'& .WmeCardSelectItem-primary': {
		fontSize: pxToRem(12),
	},
	'&.Mui-disabled .WmeCardSelectItem-icon': {
		backgroundColor: 'transparent',
	}
};

const StoreDetails = () => {
	const {
		storeSetupState: { completed, currency, currencies, productCount, productTypes },
		setCurrency,
		setProductCount,
		setProductTypes,
	} = useStoreSetup();

	const [isProductTypesDisabled, setIsProductTypesDisabled] = useState<boolean>(false);
	const [isProductCountDisabled, setIsProductCountDisabled] = useState<boolean>(false);

	useEffect(() => {
		if (completed && productCount.length) {
			setIsProductCountDisabled(true);
		}
		if (completed && productTypes.length) {
			setIsProductTypesDisabled(true);
		}
	}, []);

	const handleCurrencyChange = (event: SelectChangeEvent<unknown>) => {
		const value = event.target.value as string;
		setCurrency(value);
	};

	const handleProductTypeChange = (e: React.MouseEvent<HTMLElement>, types: string[]) => {
		setProductTypes(types);
	};

	const handleProductCountChange = (e: React.MouseEvent<HTMLElement>, count: string) => {
		setProductCount(count);
	};

	return (
		<ScreenWrapper sx={ { maxWidth: 425 } }>
			<WizardSectionTitle
				heading={ title }
				headingVariant="h2"
				copy={ copy }
				sx={ { mb: 2 } }
			/>
			<Form>
				<Stack spacing={ 2 } sx={ { '& .WmeFormFieldLabel-root': { mb: 2 } } }>
					<FormField
						field={
							<SelectInput
								fullWidth
								onChange={ handleCurrencyChange }
								required
								sx={ { mt: 1, mb: '4px' } }
								defaultValue="USD"
								value={ currency }
							>
								<MenuItem disabled value="">Select</MenuItem>
								{ currencies && currencies.map((curr) => (
									<MenuItem key={ curr.value } value={ curr.value }>{ `${ curr.label } (${ curr.value })` }</MenuItem>
								)) }
							</SelectInput>
						}
						helperText={ currencyHelperText }
						label={ currencyLabelText }
					/>
					<FormField
						label={
							<>
								{ `${ productTypesLabelText } ` }
								<Typography
									sx={ { ml: '4px', fontSize: '14px' } }
									component="span"
								>{ productTypesHelperText }</Typography>
							</>
						}
					>
						<CardSelectGroup
							disabled={ isProductTypesDisabled }
							exclusive={ false }
							cardColumns={ 3 }
							value={ productTypes }
							onChange={ handleProductTypeChange }
						>
							{
								productTypeOptions.map((option) => (
									<CardSelectItem
										key={ option.value }
										primary={ option.label }
										icon={ option.icon }
										value={ option.value }
										sx={ cardSelectSx }
									/>
								))
							}
						</CardSelectGroup>
					</FormField>
					<FormField
						label={ productCountLabelText }
					>
						<CardSelectGroup
							disabled={ isProductCountDisabled }
							exclusive={ true }
							cardColumns={ 3 }
							value={ productCount }
							onChange={ handleProductCountChange }
							sx={ {
								'& .WmeCardSelectItem-icon': {
									background: 'transparent',
								},
								'& .WmeCardSelectItem-icon img': {
									width: 'auto',
								}
							} }
						>
							{
								productCountOptions.map((option) => (
									<CardSelectItem
										key={ option.value }
										primary={ option.label }
										icon={ option.icon }
										value={ option.value }
										sx={ cardSelectSx }
									/>
								))
							}
						</CardSelectGroup>
					</FormField>
				</Stack>
			</Form>
		</ScreenWrapper>
	);
};

export default StoreDetails;
