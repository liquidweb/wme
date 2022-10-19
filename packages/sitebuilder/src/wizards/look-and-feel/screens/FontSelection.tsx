import React from 'react';
import { Box } from '@mui/material';
import { WizardSectionTitle } from '@moderntribe/wme-ui';
import { useLookAndFeelFonts, useLookAndFeel } from '@sb/hooks';
import { lookAndFeelConsts } from '@look-and-feel/data/constants';
import IframeDisplay from '@look-and-feel/IframeDisplay';
import { Frame, PoweredByKadence } from '@sb/components';

const FontSelection = () => {
	const fonts = useLookAndFeelFonts();
	const { lookAndFeelState: { font }, setFontValue } = useLookAndFeel();
	const { fontSelection: { heading, text } } = lookAndFeelConsts;

	const capitalize = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	return (
		<Box sx={ {
			position: 'absolute',
			top: 0,
			left: 0,
			alignItems: 'center',
			minHeight: '100vh',
			width: '100%',
			display: 'flex',
			gap: 2,
		} }>
			<Box width="291px">
				<Box sx={ {
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					minHeight: '100vh',
					backgroundColor: 'sidebar.background',
					maxWidth: '100%',
				} }>
					<Box sx={ {
						paddingLeft: 3,
						paddingRight: 2,
						margin: 'auto 0',
						maxHeight: 'calc(100vh - 225px)',
					} }>
						<WizardSectionTitle
							heading={ heading }
							copy={ text }
							headingVariant="h3"
							sx={ { mb: '32px', width: 'auto' } }
						/>
						<Box sx={ {
							display: 'flex',
							flexWrap: 'wrap',
							marginX: '-4px',
						} }>
							{ fonts?.map((f, i) => (
								<Box
									sx={ {
										flex: '0 0 28%',
										padding: '5px',
									} }
									key={ i }
									onClick={ () => setFontValue(f.font) }
								>
									<Box sx={ {
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										'&:hover': {
											cursor: 'pointer',
										},
										border: font === f.font ? 'solid 1px #2A3353' : 'none',
										borderRadius: '4px',
										backgroundColor: 'primary.white',
										padding: '10px',
										maxWidth: '100px',
									} }>
										<img
											src={ f.img }
											alt={ f.font }
											style={ { width: '100%' } }
										/>
										<Box sx={ {
											fontSize: '10px',
										} }>
											{ capitalize(f.font) }
										</Box>
									</Box>
								</Box>
							)) }
						</Box>
					</Box>
					<PoweredByKadence />
				</Box>
			</Box>
			<Box sx={ {
				position: 'relative',
				height: '100vh',
				display: 'flex',
				width: 'calc(100% - 290px)'
			} }>
				<Frame>
					<IframeDisplay />
				</Frame>
			</Box>
		</Box>
	);
};

export default FontSelection;
