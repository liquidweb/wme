import { Box } from '@mui/material';

export const ColorLine = (props: { colorList: Array<string> }) => {
	const { colorList } = props;

	return (
		<Box sx={ {
			display: 'flex',
		} }>
			{
				colorList?.map((color: string, i: number) => (
					<Box key={ i } sx={ {
						width: '18px',
						height: '18px',
						background: color,
						border: '1px solid #000000',
						borderRadius: '4px',
						marginRight: '4px',
					} } />
				))
			}
		</Box>
	);
};
