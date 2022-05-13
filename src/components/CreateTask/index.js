import './style.css';

import api from '../../services/api';
import Button from '../../components/Generic/Button';

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
				console.log('Falha ao Criar a tarefa');

			console.log('Tarefa concluída com sucesso!');
		}).catch(err => {
			if (err.request)
				console.log('error', err.request.response);
		});
	}

	return (
		<div className='conteiner-tarefas'>
			<h1>Crie aqui sua tarefa: </h1>
			<form className='form-tarefas' onSubmit={handleSubmit(onSubmit)}>
				<div className='div-input'>
					<p>Descrição da Tarefa:</p>
					<input className='description' type="text" placeholder="O que temos pra hoje?" {...register('description', { required: true })} />
				</div>
				<div className='div-input'>
					<p>Data de conclusão:</p>
					<input type="date" min={now} {...register('date', { required: true })} />
				</div>
				<div className='div-input'>
					<p>Hora de Conclusão:</p>
					<input type="time" {...register('time', { required: true })} />
				</div>
				<Button className='btn-task' type="submit" label='Criar Tarefa' />
			</form>
		</div>
	)
}