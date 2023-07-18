import { Grid } from '@mui/material';
import { WizardSidebar as Sidebar } from '@moderntribe/wme-ui';
import { screenBottomMargin } from '@sb/wizards/first-time-configuration/components/ScreenWrapper';

export interface WizardSidebarProps {
	show: boolean;
	label?: string;
	description?: string;
	icon: React.ReactNode;
	subText?: string;
	logo: React.ReactNode;
	component?: React.ReactNode;
}

export const WizardSidebar = (props: WizardSidebarProps) => {
	const { show = false, label = '', description = '', subText, logo, component } = props;

	if (! show) {
		return null;
	}
	/*
	*  The outer grid item is used for page spacing and the inner grid item is
	*  to size and display the sidebar in a fixed position
	*/
	return (
		<Grid item xs={ 2.5 } sx={ {
			display: 'flex',
			flexDirection: 'column',
			position: 'relative',
			zIndex: 2
		} }>
			<Grid item
				xs={ 2.5 }
				sx={ {
					display: 'flex',
					flexDirection: 'column',
					position: 'fixed',
					top: 0,
					left: 0,
					height: `calc(100vh - ${ screenBottomMargin } + 6px)`,
					width: '100%'
				} }
			>
				<Sidebar
					logo={ logo }
					heading={ label }
					body={ description }
					subtext={ subText }
				>
					{ component ? component : null }
				</Sidebar>
			</Grid>
		</Grid>
	);
};
