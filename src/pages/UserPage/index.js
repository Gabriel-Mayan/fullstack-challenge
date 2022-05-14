import './style.css';
import { TaskView } from '../../components/ViewTask';
import { CreateTask } from '../../components/CreateTask';

export function UserPage() {

	return (
		<div className='container-user-page'>
			<CreateTask />
			<TaskView />
		</div>
	);
}
