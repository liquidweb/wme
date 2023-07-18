import { CardSelectGroup, CardSelectItem } from '@moderntribe/wme-ui';
import { Box, Stack, Typography } from '@mui/material';
import { useFirstTimeConfiguration } from '@sb/hooks';
import { FtcStringData } from '@ftc/data/constants';
import { FTC_PROPS } from '@sb/constants';
import {
	Article,
	ChatBubbleOutline,
	Info,
	PriceChange,
	ShoppingCart,
	SupervisorAccount,
	WebAsset
} from '@mui/icons-material';

const { siteDetails } = FtcStringData;
const cards = FTC_PROPS.goal_choices;

const Goals = () => {
	const {
		ftcState: { form },
		setFormValue
	} = useFirstTimeConfiguration();

	const handleSelect = (value: string[]) => {
		setFormValue('goals', value);
		console.log('value', value);
	};

	const goalIcon = (icon: any) => {
		switch (icon) {
		case 'Article':
			return <Article />;
		case 'ChatBubble':
			return <ChatBubbleOutline />;
		case 'Default':
			return <Info />;
		case 'PriceChange':
			return <PriceChange />;
		case 'ShoppingCart':
			return <ShoppingCart />;
		case 'SupervisorAccount':
			return <SupervisorAccount />;
		case 'WebAsset':
			return <WebAsset />;
		default:
			return icon;
		}
	};

	return (
		<Box sx={ { maxWidth: 560, width: 560 } }>
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
					{ cards.map((item: any) => (
						<CardSelectItem
							key={ item.key }
							secondary={ item.value }
							icon={ goalIcon(item.icon) }
							value={ item.key }
						/>
					)) }
				</CardSelectGroup>
			</Stack>
		</Box>
	);
};

export default Goals;
