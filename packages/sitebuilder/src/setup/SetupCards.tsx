import React from 'react';
import { Box } from '@mui/material';
import { SetupCard } from '@sb/setup';
import { CARDS } from '@sb/constants';

const SetupCards = () => (
	<Box mt={ 4 }>
		{
			CARDS.map((card: SetupCardInterface) => <SetupCard key={ card.id } { ...card } />)
		}
	</Box>
);

export default SetupCards;
