import './style.css';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useStores } from '../../stores';

import api from '../../services/api';
import Button from '../../components/Generic/Button';

export function TaskView() {
	const now = new Date();
	const { handleSubmit } = useForm();
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [tasks, setTasks] = useState([]);
	const [description, setDescription] = useState('');

	const { userStore: { token, user } } = useStores();

	useEffect(() => {
		const configuration = { user, headers: { authorization: token } };

		api.get('/user/list_task', configuration).then(response => {
			if (response.status !== 200)
				console.log('Falha ao trazer as tarefas');

			setTasks(response.data);
		}).catch(err => {
			if (err.request)
				console.log('error', err.request.response);
		});
	}, []);

	const updateTask = async (id) => {
		console.log(id, description, date, time)
		const deadline = new Date((date + " " + time));
		const configuration = { user, headers: { authorization: token } };

		api.post(`/user/update_task/${id}`, { description, deadline }, configuration).then(response => {
			console.log(response)
			if (response.status !== 200)
				console.log('Falha ao Atualizar a tarefa');

			console.log('Tarefa atualizada com sucesso!');
		}).catch(err => {
			if (err.request)
				console.log('error', err.request.response);
		});
	}

	const finalizeTask = async (id) => {
		const configuration = { user, params: { id } };
		api.post('/user/update_task', configuration).then(response => {
			if (response.status !== 200)
				console.log('Falha ao Atualizar a tarefa');

			console.log('Tarefa atualizada com sucesso!');
		}).catch(err => {
			if (err.request)
				console.log('error', err.request.response);
		});
	}


	return (
		<div className='conteiner-lista-tarefas'>
			<h1 className='chamada'>Lista de tarefas</h1>
			<div className='div-categories'>
				<p className='text'>Descrição</p>
				<p className='text'>Data de conclusão:</p>
				<p className='text'>Hora de Conclusão:</p>
				<p className='text'>Status</p>
			</div>
			{tasks.length ? tasks.map((task) => (
				<div className='lista-tarefas' key={task.id}>
					<input className='description-task' type="text" placeholder="O que temos pra hoje?" defaultValue={task.description} onChange={(value) => setDescription(value)} />
					<input className='date-task' type="date" min={now} defaultValue={task.deadline.date} onChange={(value) => setDate(value.target.value)} />
					<input className='time-task' type="time" defaultValue={task.deadline.hours} onChange={(value) => setTime(value.target.value)} />
					<p className='status-task'>{task.deadline.status}</p>
					<Button className='btn-task' type="submit" label='Atualizar Tarefa' onClick={handleSubmit(updateTask(task.id))} />
					<Button className='btn-task' type="submit" label='Finalizar Tarefa' onPress={handleSubmit(finalizeTask(task.id))} />
				</div>
			)) :
				<div className='container-not-found'>
					<p className='status-not-found'>Ops!</p>
					<p className='msg-not-found'>Não existem tarefas cadastradas</p>
				</div>
			}
		</div >
	)
}