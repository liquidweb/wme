import React from 'react';
import {
	SetupCardTask,
} from '@store/setup';

export interface SetupCardTasksInterface {
	rows: Array<SetupCardRowInterface>;
	completed?: boolean;
}

const SetupCardTasks: React.FC<SetupCardTasksInterface> = (props) => {
	const { rows, completed } = props;

	return (
		<>
			{
				rows?.map((row) => {
					switch (row.type) {
					default:
						return <SetupCardTask key={ row.id } { ...row } />;
					}
				})
			}
		</>
	);
};

export default SetupCardTasks;
