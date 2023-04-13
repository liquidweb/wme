import { CardSelectGroup, CardSelectItem } from '@moderntribe/wme-ui';
import { Box, Stack, Typography } from '@mui/material';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { FtcStringData } from '@ftc/data/constants';
import { FTC_PROPS } from '@sb/constants';

const { siteDetails } = FtcStringData;
const cards = FTC_PROPS.goal_choices;

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
							key={ item.key }
							primary={ item.value }
							secondary={ item.description }
							icon={ item.icon }
							value={ item.key }
						/>
					)) }
				</CardSelectGroup>
			</Stack>
		</Box>
	);
};

export default Goals;
