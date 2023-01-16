import { Grid } from '@mui/material';
import { WizardSidebar as Sidebar } from '@moderntribe/wme-ui';

export const WizardSidebar = (props: { show: boolean; label?: string; description?: string; icon: React.ReactNode }) => {
	const { show = false, label = '', description = '', icon } = props;

	if (! show) {
		return null;
	}

	return (<Grid item xs={ 2.5 } sx={ {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		zIndex: 2
	} }>
		<Sidebar
			heading={ label }
			body={ description }
			icon={ icon }
		/>
	</Grid>
	);
};
