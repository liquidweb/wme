import { SetupCardFooter as WmeSetupCardFooter } from '@moderntribe/wme-ui';
import { LookAndFeelFooter, SiteDomainFooter } from './footer';

type SetupCardFooterRenderProps = SetupCardFooterInterface;

export interface SetupCardFooterPropsInterface {
	footers?: SetupCardFooterRenderProps;
}

const renderFooterRow = (row: SetupCardFooterRenderProps) => {
	switch (row.id) {
	case 'site-domain-wizard':
		return <SiteDomainFooter key={ row.id } { ...row } />;
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
