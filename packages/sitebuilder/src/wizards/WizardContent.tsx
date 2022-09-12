import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

export interface WizardContentInterface extends BoxProps {
	isLookAndFeel: boolean;
}

const StyledWizardContent = styled(Box, {
	name: 'WmeWizard',
	slot: 'Content',
})<WizardContentInterface>(({ isLookAndFeel }) => ({
	minHeight: 'calc(100vh - 200px)',
	width: isLookAndFeel ? '100%' : '700px',
	marginRight: 'auto',
	marginLeft: 'auto',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
}));

const WizardContent: React.FC<BoxProps> = ({ children }) => {
	const location = useLocation();

	return (
		<StyledWizardContent isLookAndFeel={ location.pathname === '/wizard/look-and-feel' }>
			{ children }
		</StyledWizardContent>
	);
};

export default WizardContent;
