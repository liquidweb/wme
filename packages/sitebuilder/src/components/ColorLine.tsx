import { Box, darken } from '@mui/material';
import { useEffect, useState } from 'react';

export const ColorLine = (props: { colorList: Array<string> }) => {
	const { colorList } = props;

	return (
		<Box sx={ {
			display: 'flex',
		} }>
			{
				colorList?.map((color: string) => (
					<ColorSwatch key={ color } color={ color } />
				))
			}
		</Box>
	);
};

const ColorSwatch = ({ color }: { color: string }) => {
	const [contrast, setContrast] = useState(1);

	useEffect(() => {
		const foregroundRgb = fromHexToRgb(color);

		const backBrightness = 255; // White: #fff
		const foreBrightness = ((299 * foregroundRgb[ 0 ]) + (587 * foregroundRgb[ 1 ]) + (114 * foregroundRgb[ 2 ])) / 1000;

		const contrastRatio = backBrightness - foreBrightness;
		setContrast(contrastRatio);
		console.log('contrast', color, contrastRatio);
	}, [color]);

	const fromHexToRgb = (hexCode: string) => {
		const converted = hexCode.replace('#', '').match(/.{1,2}/g);
		if (! converted) {
			return [0, 0, 0];
		}
		const aRgb = [
			parseInt(converted[ 0 ], 16),
			parseInt(converted[ 1 ], 16),
			parseInt(converted[ 2 ], 16)
		];
		return aRgb;
	};

	return (
		<Box sx={ {
			width: '18px',
			height: '18px',
			background: color,
			border: '1px solid',
			borderColor: contrast < 30 ? darken(color, .1) : color,
			borderRadius: '4px',
			marginRight: '4px',
		} }

		/>
	);
};

export default ColorLine;
