import { Fragment } from 'react';
import {
	Box,
	List,
	ThemeProvider,
	createTheme
} from '@mui/material';
import { ListItemCheckout, WizardSectionTitle } from '@moderntribe/wme-ui';

import { useGoLive } from '@sb/hooks';
import { parseDomainListItem } from '@sb/utils/parseDomainListItem';
import { GoLiveStringData } from '../data/constants';

const ConnectWithNexcess = () => {
	const {
		connectWithNexcess: {
			screenTitle,
			screenDescription
		}
	} = GoLiveStringData;

	const {
		goLiveState,
	} = useGoLive();

	const {
		selectedDomains,
	} = goLiveState;

	return (
		<Box sx={ { maxWidth: 505, margin: '0 auto' } }>
			<ThemeProvider
				theme={ (theme: any) =>
					createTheme({
						...theme,
						palette: {
							...theme.palette,
							primary: {
								...theme.palette.primary,
								dark: '#0033B8',
							},
						},
					})
				}
			>
				<List>
					{ selectedDomains.map((domain, index) => {
						const domainListItem = parseDomainListItem(domain, true);
						return (
							<Fragment key={ domain.domain }>
								<ListItemCheckout { ...domainListItem } sx={ {
									backgroundColor: 'sidebar.background',
									padding: '12px 24px',
									'& .MuiListItemSecondaryAction-root .MuiButtonBase-root': {
										cursor: 'default',
										'&:hover': {
											backgroundColor: 'transparent',
										},
										'& .MuiTouchRipple-root': {
											display: 'none',
										},
									}
								} } />
								{ index < selectedDomains.length - 1 && (
									<Box sx={ { paddingTop: '8px', paddingBottom: '8px' } }>
									</Box>
								) }
							</Fragment>

						);
					}) }
				</List>
			</ThemeProvider>

			<WizardSectionTitle
				heading={ screenTitle }
				headingVariant="h2"
				copy={ screenDescription }
				copyVariant="body2"
				sx={ {
					marginTop: 5,
					textAlign: 'center',
				} }
			/>
		</Box>
	);
};

export default ConnectWithNexcess;
