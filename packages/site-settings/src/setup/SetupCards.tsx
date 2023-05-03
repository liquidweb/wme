import { Box, BoxProps, styled } from '@mui/material';
import { GoogleAnalytics, SiteDomain, SiteVisibility } from '@site/setup/cards';
import { Loader, SetupCardAccordion, SetupCardContent } from '@moderntribe/wme-ui';
import { SetupCardTasks } from '@site/setup';
import { useSiteSettings } from '@site/hooks';

const Container = styled(Box)<BoxProps>(({ theme }) => ({
	maxWidth: theme.spacing(100),
	margin: `${ theme.spacing(5) } auto`,
	'& .MuiChip-label': {
		display: 'inline-flex',
	}
}));

// Create styled loader component that has 10px width and height
const StyledLoader = styled(Box)(() => ({
	display: 'inline-flex',
	alignItems: 'center',
	marginRight: '4px',
	height: '18px',
	'& svg': {
		fontSize: '16px',
	}
}));

const SetupCards = () => {
	const { siteSettingsState, isLoading } = useSiteSettings();
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
							chipText={ card.id === 'site-visibility' ? <>{ isLoading ? <StyledLoader><Loader /></StyledLoader> : '' } { siteVisibilityValues?.chipText }</> : card.chipText }
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
