import { useState, useCallback, useRef, useEffect } from '@wordpress/element';
import {
	Box,
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio
} from '@mui/material';
import { WizardSectionTitle } from '@moderntribe/wme-ui';
import { lookAndFeelConsts } from '@look-and-feel/data/constants';
import { useLookAndFeelColors, useLookAndFeel } from '@sb/hooks';
import { ColorLine, Frame, PoweredByKadence } from '@sb/components';
import IframeDisplay from '@look-and-feel/IframeDisplay';
import { __ } from '@wordpress/i18n';

const ColorSelection = () => {
	const colors = useLookAndFeelColors();
	const { lookAndFeelState: { color }, setColorValue } = useLookAndFeel();
	const { colorSelection: { heading, text } } = lookAndFeelConsts;

	const sectionTitleRef = useRef<HTMLInputElement>(null);
	const swatchesRef = useRef<HTMLInputElement>(null);

	const getWindowHeight = () => window.innerHeight ||
		document.documentElement.clientHeight ||
		document.body.clientHeight;

	const [swatchOverflow, setSwatchOverflow] = useState(false);

	const handleColorSel = useCallback((e: { target: { value: string } }) => {
		const selected = e.target.value;
		setColorValue(selected);
	}, [color]);

	useEffect(() => {
		function updateSize() {
			const sectionTitleHeight = sectionTitleRef?.current?.clientHeight;
			const swatchesHeight = swatchesRef?.current?.clientHeight;

			if (sectionTitleHeight && swatchesHeight) {
				setSwatchOverflow((sectionTitleHeight + swatchesHeight + 400) > getWindowHeight());
			}
		}
		window.addEventListener('resize', updateSize);
		updateSize();

		return () => window.removeEventListener('resize', updateSize);
	}, []);

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
						paddingLeft: 3,
						paddingRight: 3,
						margin: 'auto 0',
						maxHeight: 'calc(100vh - 225px)',
					} }>
						<Box ref={ sectionTitleRef }>
							<WizardSectionTitle
								heading={ heading }
								copy={ text }
								headingVariant="h3"
								sx={ { mb: '32px' } }
							/>
						</Box>
						<Box sx={ {
							width: '100%',
							...(swatchOverflow && {
								maxHeight: '50vh',
								overflowY: 'scroll',
							}),
						} }>
							<FormControl ref={ swatchesRef } sx={ { width: '100%' } }>
								<RadioGroup
									aria-label={ __('radio buttons for selecting color palette', 'nexcess-mapps') }
									value={ color }
									name="color-palette-selection"
									onChange={ handleColorSel }
								>
									{
										colors?.map((palettes, i) => (
											<FormControlLabel
												aria-label={ palettes.palette + __(' color palette', 'nexcess-mapps') }
												key={ i }
												value={ palettes.palette }
												control={ <Radio /> } label={ <ColorLine colorList={ palettes.colors } /> }
												sx={ {
													backgroundColor: 'primary.white',
													p: '2px 8px',
													borderRadius: '4px',
													mb: '8px',
													mr: 0,
												} }
											/>
										))
									}
								</RadioGroup>
							</FormControl>
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

export default ColorSelection;
