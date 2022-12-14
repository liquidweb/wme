import { Box } from '@mui/material';
import { useWizard } from '../hooks/useWizard';

interface ChildrenProps {
    children: React.ReactNode;
}

export const Frame = ({ children }: ChildrenProps) => {
	const { currentStep, wizardState: { activeDevice } } = useWizard();

	const frameSx = {
		maxWidth: '98%',
		maxHeight: '80%',
		overflowY: currentStep === 1 ? 'auto' : 'inherit',
		boxShadow: currentStep === 1 ? 'none' : '0px 0px 32px 0px #0000001a',
		alignSelf: 'center',
		margin: '0px auto',
		width: activeDevice === 'desktop' ? '100%' : 'auto',
		height: '100%',
	};

	return (
		<Box sx={ frameSx }>
			{ children }
		</Box>
	);
};
