import { SetupCardTask } from '@site/setup';

export interface SetupCardTasksInterface {
	rows: Array<SetupCardRowInterface>;
}

const SetupCardTasks: React.FC<SetupCardTasksInterface> = (props) => {
	const { rows } = props;

	return (
		<>
			{
				rows?.map((row) => {
					return <SetupCardTask key={ row.id } { ...row } />;
				})
			}
		</>
	);
};

export default SetupCardTasks;
