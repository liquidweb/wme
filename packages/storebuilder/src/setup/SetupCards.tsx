import { Box } from '@mui/material';
import { SetupCard } from '@store/setup';
import { CARDS } from '@store/constants';

const SetupCards = () => {
	return (<Box mt={ 4 }>
		{
			CARDS.map((card: SetupCardInterface) => <SetupCard key={ card.id } { ...card } />)
		}
	</Box>);
};

export default SetupCards;
