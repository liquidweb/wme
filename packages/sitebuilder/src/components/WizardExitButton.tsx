import { ExitButton } from '@moderntribe/wme-ui';
import { Box, styled } from '@mui/material';

interface ChildrenProps {
    text: string;
	onExit: () => void;
}

const ExitButtonPanel: any = styled(Box, {
	name: 'WizardExitButton',
	slot: 'Root',
})(() => ({
	position: 'fixed',
	left: 0,
	top: 0,
	width: '100%',
	textAlign: 'right',
	background: 'white',
	padding: '10px 0',
	zIndex: 1
}));

export const WizardExitButton = ({ text, onExit }: ChildrenProps) => {
	return (
		<ExitButtonPanel>
			<ExitButton onClick={ onExit }>
				<span>{ text }</span>
			</ExitButton>
		</ExitButtonPanel>
	);
};
