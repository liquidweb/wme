import { ContentAccordion, SetupCardFooter as WmeSetupFooter } from '@moderntribe/wme-ui';
import FooterLinks from './footer/FooterLinks';
import FooterColumns from './footer/FooterColumns';
import { LearnTypes } from './layouts';

export interface SetupCardFooterInterface {
	footer: SetupCardFooter;
}

const SetupCardFooter = (props: SetupCardFooterInterface) => {
	const { footer } = props;

	const renderContent = () => {
		return footer.rows.map((row, index) => {
			if (row.type === 'columns') {
				return <FooterColumns key={ index } { ...row } />;
			} else if (row.type === 'links') {
				return <FooterLinks key={ index } { ...row } />;
			} else if (row.type === 'learn-types') {
				return <LearnTypes key={ index } { ...row } />;
			}

			return <div key={ index } />;
		});
	};

	return (
		<WmeSetupFooter>
			{ footer.collapsible ? (
				<ContentAccordion title={ footer.collapsibleLabel } id={ footer.collapsibleLabel }>
					{ renderContent() }
				</ContentAccordion>
			) : renderContent() }
		</WmeSetupFooter>
	);
};

export default SetupCardFooter;
