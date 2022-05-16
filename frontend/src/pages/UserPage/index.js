import './style.css';
import { ViewTask } from '../../components/ViewTask';
import { CreateTask } from '../../components/CreateTask';

export function UserPage() {

	return (
		<div className='container-user-page'>
			<CreateTask />
			<ViewTask />
		</div>
	);
}
