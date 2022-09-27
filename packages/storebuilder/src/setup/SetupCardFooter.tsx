import React from 'react';
import { SetupCardFooter as WmeSetupCardFooter } from '@stellarwp/wme-ui';
import { Accordion, AccordionInterface, PaymentHelp, PaymentHelpInterface } from '@store/setup/footer';

type FooterRowType = AccordionInterface | PaymentHelpInterface;

export interface SetupCardFooterPropsInterface {
	footers?: FooterRowType;
}

const renderFooterRow = (row: FooterRowType) => {
	switch (row.type) {
	case 'accordion':
		return <Accordion key={ row.id } { ...row } />;
	case 'gateway-help':
		return <PaymentHelp key={ row.id } { ...row } />;
	default:
		return <></>;
	}
};

const SetupCardFooter = (props: SetupCardFooterPropsInterface): React.ReactElement => {
	const { footers } = props;

	if (! Array.isArray(footers) || footers.length === 0) {
		return <></>;
	}

	return (
		<WmeSetupCardFooter>
			{ footers.map((footer) => renderFooterRow(footer)) }
		</WmeSetupCardFooter>
	);
};

export default SetupCardFooter;
