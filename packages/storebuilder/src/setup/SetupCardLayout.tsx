import {
	SetupCardTask,
	Columns,
	LaunchShippingWizard,
	LearnProductTypes
} from '@store/setup/layouts';

export interface SetupCardLayoutInterface {
	rows: SetupCardInterface['rows'];
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
					case 'button':
						return <LaunchShippingWizard key={ row.id } { ...row } />;
					case 'learn-product-types':
						return <LearnProductTypes key={ row.id } { ...row } />;
					case 'task':
						return <SetupCardTask key={ row.id } { ...row } />;
					default:
						return <div />;
					}
				})
			}
		</>
	);
};

export default SetupCardLayout;
