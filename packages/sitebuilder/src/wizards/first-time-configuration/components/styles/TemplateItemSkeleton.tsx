/* eslint-disable camelcase */
import { styled, keyframes, Box } from '@mui/material';

const pulse = keyframes`
	0% {
		background-position: 0% 0%
	}
	100% {
		background-position: -135% 0%
	}
`;

const TemplateItemContainer = styled(Box)(() => ({
	borderRadius: '8px',
	position: 'relative',
	width: '100%',
	height: 0,
	paddingBottom: '135%',
	overflow: 'hidden',
	background: 'linear-gradient(-90deg, #efefef 0%, #fcfcfc 50%, #efefef 100%)',
	backgroundSize: '400% 400%',
	transition: 'all 0.3s ease-in-out',
	animation: `${ pulse } 2.5s ease-in-out infinite`,
}));

export default function TemplateItemSkeleton() {
	return <TemplateItemContainer />;
}
