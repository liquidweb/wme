import { CardSelectGroup, CardSelectItem } from '@moderntribe/wme-ui';
import { Box, Stack, Typography } from '@mui/material';
import { useFirstTimeConfiguration } from '@sb/hooks';
import {
	NewspaperIcon,
	GraduationIcon,
	ShoppingBagIcon,
	TicketIcon
} from '@sb/icons';
import { FtcStringData } from '@ftc/data/constants';
const { siteDetails } = FtcStringData;

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
	const {
		ftcState: { form },
		setFormValue
	} = useFirstTimeConfiguration();

	const handleSelect = (value: string[]) => {
		setFormValue('goals', value);
	};

	return (
		<Box sx={ { maxWidth: 560 } }>
			<Stack spacing={ 2 }>
				<Typography component="h3" sx={ { fontWeight: 500 } }>
					{ siteDetails.goalsSelectText }
				</Typography>
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
		</Box>
	);
};

export default Goals;
