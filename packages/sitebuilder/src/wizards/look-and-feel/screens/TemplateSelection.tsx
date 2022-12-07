import { useEffect } from '@wordpress/element';
import { Box, Grid, CircularProgress } from '@mui/material';
import { WizardSectionTitle } from '@moderntribe/wme-ui';
import { useLookAndFeel } from '@sb/hooks';
import { TemplateBox, Frame, PoweredByKadence } from '@sb/components';
import { lookAndFeelConsts } from '@look-and-feel/data/constants';

const TemplateSelection = () => {
	const { lookAndFeelState: { activeTemplate }, templates, setTemplateValue, ajaxTemplateData } = useLookAndFeel();
	const { templateSelection: { heading, text } } = lookAndFeelConsts;
	let activeTemplateSettings = '' || undefined;

	useEffect(() => {
		ajaxTemplateData();
	}, []);

	if (activeTemplate && templates) {
		activeTemplateSettings = templates?.find((template: { slug: string }) => template.slug === activeTemplate);
	}

	return (
		<Box sx={ {
			position: 'absolute',
			top: 0,
			left: 0,
			alignItems: 'center',
			minHeight: '100vh',
			display: 'flex',
			gap: 2,
			width: '100%',
		} }>
			<Box width="290px">
				<Box sx={ {
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					minHeight: '100vh',
					backgroundColor: 'sidebar.background',
					maxWidth: '100%',
				} }>
					<Box sx={ {
						paddingX: 3,
						margin: 'auto 0',
						maxHeight: 'calc(100vh - 175px)',
					} }>
						<WizardSectionTitle
							heading={ heading }
							headingVariant="h3"
							copy={ text }
						/>
					</Box>
					<PoweredByKadence />
				</Box>
			</Box>
			<Box sx={ {
				position: 'relative',
				height: '100vh',
				display: 'flex',
				width: 'calc(100% - 290px)',
			} }>
				<Frame>
					<Grid container spacing={ 3 } sx={ {
						alignItems: 'center',
						height: '100%',
						justifyContent: 'center',
						p: '35px',
					} }>
						{
							activeTemplateSettings &&
							<Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
								<TemplateBox
									template={ activeTemplateSettings }
									handleTemplateChange={ setTemplateValue }
									isActive={ true }
								/>
							</Grid>
						}
						{ templates?.length ? templates?.map((template: {slug: string}, i:number) => (
							template.slug !== activeTemplate &&
							<Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } key={ i }>
								<TemplateBox
									template={ template }
									handleTemplateChange={ setTemplateValue }
									isActive={ false }
								/>
							</Grid>
						)) : <Box><CircularProgress /></Box> }
					</Grid>
				</Frame>
			</Box>
		</Box>
	);
};

export default TemplateSelection;
