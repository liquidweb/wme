import { Box } from '@mui/material';

export interface PageWrapperInterface {
	children: React.ReactNode,
	width?: number;
	maxWidth?: number;
}

const PageWrapper = ({ children, maxWidth, width }: PageWrapperInterface) => {
	return <Box sx={ { maxWidth: maxWidth || 425, width: width || 425 } }>{ children }</Box>;
};

export default PageWrapper;
