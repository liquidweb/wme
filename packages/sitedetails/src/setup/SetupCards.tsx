import { Box, BoxProps, styled } from '@mui/material';
import { GoogleAnalytics, SiteVisibility } from '@site/setup/cards';
import { CARDS } from '@site/constants';
import { SetupCardAccordion } from '@moderntribe/wme-ui';

const Container = styled(Box)<BoxProps>(({ theme }) => ({
	maxWidth: theme.spacing(100),
	margin: `${ theme.spacing(3) } auto`,
}));

const CardAccordionWrapper = styled(SetupCardAccordion)(({ theme }) => ({
	'& .MuiChip-colorError.MuiChip-filledError': {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.error.contrastText,
	}
}));

const SetupCards = () => {
	return (
		<Container>
			{
				CARDS.map((card: SetupCardAccordionInterface) => {
					return (
						<CardAccordionWrapper
							key={ card.id }
							id={ card.id }
							header={ card.header }
							subHeader={ card.subHeader }
							chipBackground={ card.chipBackground }
							chipText={ card.chipText }
							defaultExpanded
						>
							{
								((card.id === 'site-visibility') && <SiteVisibility />) ||
								((card.id === 'google-analytics') && <GoogleAnalytics />) ||
								<></>
							}
						</CardAccordionWrapper>
					);
				})
			}
		</Container>
	);
};

export default SetupCards;
