import React from 'react';

import { SetupCardTask, GoLiveStatus } from '@sb/setup';

export interface SetupCardTasksInterface {
	rows: SetupCardRowInterface[];
}

const SetupCardTasks: React.FC<SetupCardTasksInterface> = (props) => {
	const { rows } = props;

	return (
		<>
			{
				rows?.map((row) => {
					switch (row.type) {
					case 'launch-domain-status':
						return <GoLiveStatus key={ row.id } />;
					default:
						return <SetupCardTask key={ row.id } { ...row } />;
					}
				})
			}
		</>
	);
};

export default SetupCardTasks;
