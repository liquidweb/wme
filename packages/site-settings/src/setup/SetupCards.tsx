import { Box, BoxProps, styled } from '@mui/material';
import { GoogleAnalytics, SiteVisibility } from '@site/setup/cards';
import { CARDS } from '@site/constants';
import { SetupCardAccordion } from '@moderntribe/wme-ui';

const Container = styled(Box)<BoxProps>(({ theme }) => ({
	maxWidth: theme.spacing(100),
	margin: `${ theme.spacing(5) } auto`,
}));

const SetupCards = () => {
	return (
		<Container>
			{
				CARDS.map((card: SetupCardAccordionInterface) => {
					return (
						<SetupCardAccordion
							key={ card.id }
							id={ card.id }
							header={ card.title }
							subHeader={ card.intro }
						>
							{
								((card.id === 'site-visibility') && <SiteVisibility />) ||
								((card.id === 'google-analytics') && <GoogleAnalytics />) ||
								<></>
							}
						</SetupCardAccordion>
					);
				})
			}
		</Container>
	);
};

export default SetupCards;
