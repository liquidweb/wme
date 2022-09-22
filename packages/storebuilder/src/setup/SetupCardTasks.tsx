import React from 'react';
import {
	SetupCardTask,
	Columns,
	ColumnsInterface,
	LaunchShippingWizard,
	LaunchShippingWizardInterface
} from '@store/setup';

export interface SetupCardTasksInterface {
	rows: Array<SetupCardRowInterface | LaunchShippingWizardInterface | ColumnsInterface>;
	completed?: boolean;
}

const SetupCardTasks: React.FC<SetupCardTasksInterface> = (props) => {
	const { rows } = props;

	return (
		<>
			{
				rows?.map((row) => {
					switch (row.type) {
					case 'columns':
						return <Columns key={ row.id } { ...row } />;
					case 'launch-shipping-wizard':
						return <LaunchShippingWizard key={ row.id } />
					default:
						return <SetupCardTask key={ row.id } { ...row } />;
					}
				})
			}
		</>
	);
};

export default SetupCardTasks;
