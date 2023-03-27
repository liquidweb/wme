import { Box, BoxProps, styled } from '@mui/material';
import { GoogleAnalytics, SiteDomain, SiteVisibility } from '@site/setup/cards';
import { CARDS } from '@site/constants';
import {SetupCardAccordion, SetupCardContent} from '@moderntribe/wme-ui';
import { SetupCardTasks } from '@site/setup';

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
								<SetupCardContent>
									{
										((card.id === 'site-visibility') && <SiteVisibility />) ||
										((card.id === 'google-analytics') && <GoogleAnalytics />) ||
										((card.id === 'launch-domain') && <SiteDomain />) ||
										<></>
									}
									<SetupCardTasks rows={ card.rows } />
								</SetupCardContent>
							}
						</SetupCardAccordion>
					);
				})
			}
		</Container>
	);
};

export default SetupCards;
