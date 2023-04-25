import {
	Wizard,
	WizardHeader,
	Logo,
	ExitButton
} from '@moderntribe/wme-ui';
import { __ } from '@wordpress/i18n';
import WizardContent from '@store/wizards/WizardContent';
import { LOGO } from '@store/constants';

interface SimpleModalInterface {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const SimpleModal: React.FC<SimpleModalInterface> = (props) => {
	const {
		open,
		onClose,
		children
	} = props;

	return (
		<Wizard
			open={ open }
			onClose={ onClose }
		>
			<WizardHeader>
				<>
					<Logo
						width={ LOGO?.width }
						logoSrc={ LOGO?.src }
					/>
					<ExitButton onClick={ onClose }>
						<span>{ __('Exit to Setup', 'moderntribe-storebuilder') }</span>
					</ExitButton>
				</>
			</WizardHeader>
			<WizardContent>
				{ children }
			</WizardContent>
		</Wizard>
	);
};

export default SimpleModal;
