import { Box } from '@mui/material';

export interface PageWrapperInterface {
	children: React.ReactNode,
	width?: number | string;
	maxWidth?: number | string;
}

const PageWrapper = ({ children, maxWidth, width }: PageWrapperInterface) => {
	const validMaxWidth = () => {
		if (width && ! maxWidth) {
			return width;
		} else if (! maxWidth) {
			return 425;
		}
		return maxWidth;
	}
	return <Box sx={ { maxWidth: validMaxWidth(), width: width || 425 } }>{ children }</Box>;
};

export default PageWrapper;
