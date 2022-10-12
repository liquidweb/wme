import React from 'react';
import { SetupCardFooter as WmeSetupCardFooter } from '@moderntribe/wme-ui';
import { LookAndFeelFooter, LookAndFeelFooterInterface } from './footer';

type SetupCardFooterRenderProps = LookAndFeelFooterInterface;

export interface SetupCardFooterPropsInterface {
	footers?: SetupCardFooterRenderProps;
}

const renderFooterRow = (row: SetupCardFooterRenderProps) => {
	switch (row.id) {
	case 'look-and-feel-wizard':
		return <LookAndFeelFooter key={ row.id } { ...row } />;
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
