import { SetupCardTask, GoLiveStatus, GoLiveStatusRowInterface } from '@sb/setup';

export interface SetupCardTasksInterface {
	rows: Array<SetupCardRowInterface | GoLiveStatusRowInterface>;
}

const SetupCardTasks: React.FC<SetupCardTasksInterface> = (props) => {
	const { rows } = props;

	return (
		<>
			{
				rows?.map((row) => {
					switch (row.type) {
					case 'launch-domain-status':
						return <GoLiveStatus key={ row.id } completed={ row.completed } />;
					default:
						return <SetupCardTask key={ row.id } { ...row } />;
					}
				})
			}
		</>
	);
};

export default SetupCardTasks;
