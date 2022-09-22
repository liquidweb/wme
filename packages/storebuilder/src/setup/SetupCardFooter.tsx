import React from 'react';
import { SetupCardFooter as WmeSetupCardFooter } from '@stellarwp/wme-ui';
// import { LookAndFeelFooter, LookAndFeelFooterInterface } from './footer';

// type SetupCardFooterRenderProps = LookAndFeelFooterInterface;

export interface SetupCardFooterPropsInterface {
	footers?: any;
}

const renderFooterRow = (row: any) => {
	switch (row.id) {
	case 'look-and-feel-wizard':
		return <div>footer</div>;
		// return <LookAndFeelFooter key={ row.id } { ...row } />;
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
