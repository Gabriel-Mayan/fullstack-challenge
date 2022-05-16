import './style.css';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import api from '../../services/api';
import notify from '../../services/notify';

import { useStores } from '../../stores';

import Button from '../../components/Generic/Button';

export function ViewTask() {
	const now = new Date();
	const { handleSubmit } = useForm();
	const [date, setDate] = useState();
	const [hours, setHours] = useState();
	const [tasks, setTasks] = useState([]);
	const [description, setDescription] = useState();
	const { userStore: { token, user } } = useStores();

	useEffect(() => {
		const configuration = { user, headers: { authorization: token } };

		api.get('/user/list_task', configuration).then(response => {
			const { data, status } = response;

			if (status !== 200)
				notify('error', 'Falha ao trazer as tarefas');

			setTasks(data);
		}).catch(err => {
			if (err.request)
				notify('error', err.request.response);
		});
	});


	const updateTask = async (id, description, date, hours) => {
		const deadline = new Date((date + " " + hours));
		const configuration = { user, headers: { authorization: token } };

		api.post(`/user/update_task/${id}`, { description, deadline }, configuration).then(response => {
			if (response.status !== 200)
				notify('error', 'Falha ao atualizar a tarefa');

			notify('success', 'Tarefa atualizada com sucesso!');
		}).catch(err => {
			if (err.request)
				notify('error', err.request.response);
		});
	}

	const finalizeTask = async (id) => {
		const configuration = { user, headers: { authorization: token } };

		api.post(`/user/finalize_task/${id}`, {}, configuration).then(response => {
			if (response.status !== 200)
				notify('error', 'Falha ao finalizar a tarefa');

			notify('success', 'Tarefa finalizada com sucesso!');
		}).catch(err => {
			if (err.request)
				notify('error', err.request.response);
		});
	}

	return (
		tasks.length ?
			< div className='conteiner-lista-tarefas' >
				<h1 className='chamada-lista-tarefas'>Suas Tarefas:</h1>
				{
					tasks.map((task) => (
						<div className='form-lista-tarefas' key={task.id}>
							<input
								className='description-task'
								type="text"
								placeholder="O que temos pra hoje?"
								defaultValue={task.description}
								onChange={e => setDescription(e.target.value)}
							/>
							<input
								className='date-task'
								type="date" min={now}
								defaultValue={task.deadline.date}
								onChange={e =>
									setDate(e.target.value)}
							/>
							<input
								className='time-task'
								type="time"
								defaultValue={task.deadline.hours}
								onChange={e => setHours(e.target.value)}
							/>
							<p className='status-task'>{task.deadline.status}</p>
							<Button
								type="submit"
								label='Atualizar Tarefa'
								className='btn-list-task'
								onClick={handleSubmit(() => {
									updateTask(
										task.id,
										description ? description : task.description,
										date ? date : task.deadline.date,
										hours ? hours : task.deadline.hours
									)
								})}
							/>
							<Button
								type="submit"
								label='Finalizar Tarefa'
								className='btn-list-task'
								onClick={handleSubmit(() => finalizeTask(task.id))}
							/>
						</div>
					))
				}
			</div > : <></>
	);
}