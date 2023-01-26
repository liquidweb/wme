import { CardSelectGroup, CardSelectItem } from '@moderntribe/wme-ui';
import { Stack, Typography } from '@mui/material';
import ScreenWrapper from '@sb/wizards/first-time-configuration/components/ScreenWrapper';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { useEffect } from 'react';
import { NewspaperIcon, GraduationIcon, ShoppingBagIcon, TicketIcon } from '@sb/icons';
// import { FtcStringData } from '@ftc/data/constants';
// const { contentDetails } = FtcStringData;

const cards = [
	{
		value: 'I want to Book Digital or In-Person appointments',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		icon: <GraduationIcon />
	},
	{
		value: 'I want to offer classes',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		icon: <NewspaperIcon />
	},
	{
		value: 'I want to share news and write blogs',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		icon: <ShoppingBagIcon />
	},
	{
		value: 'I want to sell retail goods',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		icon: <TicketIcon />
	}
];

const Goals = () => {
	const { ftcState: { form, isLoading }, setFormValue, shouldAllowNextStep } = useFirstTimeConfiguration();

	useEffect(() => {
		if (! form || isLoading) {
			return;
		}

		shouldAllowNextStep(form.goals.value?.length > 0, 4);
	}, [form, isLoading]);

	const handleSelect = (value: string[]) => {
		setFormValue('goals', value);
	};

	return (
		<ScreenWrapper sx={ { maxWidth: 560, width: 560 } }>
			<Stack spacing={ 2 }>
				<Typography component="h3" sx={ { fontWeight: 500 } }>Select all that apply</Typography>
				<CardSelectGroup
					orientation="vertical"
					cardPadding="sm"
					value={ form.goals.value }
					onChange={ (e, value) => handleSelect(value) }
				>
					{ cards.map((item) => (
						<CardSelectItem
							key={ item.value }
							primary={ item.value }
							secondary={ item.description }
							icon={ item.icon }
							value={ item.value }
						/>
					)) }
				</CardSelectGroup>

			</Stack>
		</ScreenWrapper>
	);
};

export default Goals;
