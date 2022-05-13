import './style.css';
import { CreateTask } from '../../components/CreateTask';

export function UserPage() {

	return (
		<div className='container-user-page'>
			<CreateTask className='create-task' />
		</div>
	);
}
