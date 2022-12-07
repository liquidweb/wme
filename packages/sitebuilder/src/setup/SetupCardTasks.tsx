import { SetupCardTask, GoLiveStatus, GoLiveStatusRowInterface } from '@sb/setup';

export interface SetupCardTasksInterface {
	rows: Array<SetupCardRowInterface | GoLiveStatusRowInterface>;
	completed?: boolean;
}

const SetupCardTasks: React.FC<SetupCardTasksInterface> = (props) => {
	const { rows, completed } = props;

	return (
		<>
			{
				rows?.map((row) => {
					switch (row.type) {
					case 'launch-domain-status':
						return <GoLiveStatus key={ row.id } completed={ completed } />;
					default:
						return <SetupCardTask key={ row.id } { ...row } />;
					}
				})
			}
		</>
	);
};

export default SetupCardTasks;
