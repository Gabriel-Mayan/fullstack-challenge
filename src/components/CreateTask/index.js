import './style.css';

import api from '../../services/api';
import Button from '../../components/Generic/Button';
import notify from '../../utils/notify';

import { useForm } from 'react-hook-form';
import { useStores } from '../../stores';

export function CreateTask() {
	const now = new Date();
	const { register, handleSubmit } = useForm();
	const { userStore: { token, user } } = useStores();

	const onSubmit = async ({ description, date, time }) => {
		const deadline = new Date((date + " " + time));
		const configuration = { user, headers: { authorization: token } };

		api.post('/user/create_task', { description, deadline }, configuration).then(response => {
			if (response.status !== 200)
				notify('error', 'Falha ao Criar a tarefa');

			notify('success', 'Tarefa criada com sucesso!');
		}).catch(err => {
			if (err.request)
				notify('error', err.request.response);
		});
	}

	return (
		<div className='conteiner-create-tarefas'>
			<h1 className='chamada-create-tarefas'>Crie aqui uma tarefa: </h1>
			<form className='form-tarefas' onSubmit={handleSubmit(onSubmit)}>
				<p className='text'>Descrição da Tarefa:</p>
				<p className='text'>Data de conclusão:</p>
				<p className='text'>Hora de Conclusão:</p>
				<p className='text'>Ações:</p>
				<input className='description' type="text" placeholder="O que temos pra hoje?" {...register('description', { required: true })} />
				<input className='date' type="date" min={now} {...register('date', { required: true })} />
				<input className='time' type="time" {...register('time', { required: true })} />
				<Button className='btn-task' type="submit" label='Criar Tarefa' />
			</form>
		</div>
	)
}