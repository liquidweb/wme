import React, { FC, ReactNode } from 'react';
import {
	Wizard,
	WizardHeader,
	Logo,
	ExitButton
} from '@moderntribe/wme-ui';
import { __ } from '@wordpress/i18n';
import WizardContent from '@store/wizards/WizardContent';
import { StoreBuilderLogo } from '@store/logos';

interface SimpleModalInterface {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
}

const SimpleModal: FC<SimpleModalInterface> = (props) => {
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
						width="100"
						logoSrc={ <StoreBuilderLogo /> }
					/>
					<ExitButton onClick={ onClose }>
						<span>{ __('Exit to Setup', 'nexcess-mapps') }</span>
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
