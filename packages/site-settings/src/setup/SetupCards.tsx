import { Box, BoxProps, styled } from '@mui/material';
import { GoogleAnalytics, SiteDomain, SiteVisibility } from '@site/setup/cards';
import { SetupCardAccordion, SetupCardContent } from '@moderntribe/wme-ui';
import { SetupCardTasks } from '@site/setup';
import { useSiteSettings } from '@site/hooks';

const Container = styled(Box)<BoxProps>(({ theme }) => ({
	maxWidth: theme.spacing(100),
	margin: `${ theme.spacing(5) } auto`,
}));

const SetupCards = () => {
	const { siteSettingsState } = useSiteSettings();
	const { cards, siteVisibilityValues } = siteSettingsState;

	return (
		<Container>
			{
				cards?.map((card: SetupCardAccordionInterface) => {
					return (
						<SetupCardAccordion
							key={ card.id }
							id={ card.id }
							header={ card.title }
							subHeader={ card.intro }
							chipText={ card.id === 'site-visibility' ? siteVisibilityValues?.chipText : card.chipText }
							chipBackground={ card.id === 'site-visibility' ? siteVisibilityValues?.chipBackground : card.chipBackground }
						>
							{
								<SetupCardContent>
									{
										((card.id === 'site-visibility') && <SiteVisibility key={ card.id } { ...card } />) ||
										((card.id === 'google-analytics') && <GoogleAnalytics key={ card.id } { ...card } />) ||
										((card.id === 'launch-domain') && <SiteDomain key={ card.id } { ...card } />) ||
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
