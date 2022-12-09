import {
	SetupCardTask,
	Columns,
	ColumnsInterface,
	LaunchShippingWizard,
	LaunchShippingWizardInterface,
	LearnProductTypes,
	LearnProductTypesInterface
} from '@store/setup/layouts';

export interface SetupCardLayoutInterface {
	rows: Array<SetupCardRowInterface | LaunchShippingWizardInterface | ColumnsInterface | LearnProductTypesInterface>;
	completed?: boolean;
}

const SetupCardLayout: React.FC<SetupCardLayoutInterface> = (props) => {
	const { rows } = props;

	return (
		<>
			{
				rows?.map((row) => {
					switch (row.type) {
					case 'columns':
						return <Columns key={ row.id } { ...row } />;
					case 'launch-shipping-wizard':
						return <LaunchShippingWizard key={ row.id } />;
					case 'learn-product-types':
						return <LearnProductTypes key={ row.id } { ...row } />;
					default:
						return <SetupCardTask key={ row.id } { ...row } />;
					}
				})
			}
		</>
	);
};

export default SetupCardLayout;
