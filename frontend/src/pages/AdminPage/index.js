import './style.css';
import { useState, useEffect } from 'react';

import { useStores } from '../../stores';

import api from '../../services/api';
import notify from '../../services/notify';

export function AdminPage() {
	const { userStore: { token, user } } = useStores();

	const [page, setPage] = useState(1);
	const [tasks, setTasks] = useState([]);
	const [pageSize, setPageSize] = useState(10);
	const [filterOverdue, setFilterOverdue] = useState(false);

	useEffect(() => {
		const configuration = { user, headers: { authorization: token }, params: { page, pageSize, filterOverdue } };

		api.get('/admin/list_all_tasks', configuration).then(response => {
			const { data, status } = response;
			console.log(data)
			if (status !== 200)
				notify('error', 'Falha ao trazer as tarefas');

			setTasks(data);
		}).catch(err => {
			if (err.request)
				notify('error', err.request.response);
		});
	});

	const changeFilters = (filter) => {
		setFilterOverdue(filter);
	}

	const changePage = (filter) => {
		setPage(filter);
	}

	const changePageSize = (filter) => {
		setPageSize(filter);
	}

	return (
		tasks.length ?
			< div className='container-admin-page' >
				<h1 className='chamada-lista-admin'>Tarefas Cadastradas:</h1>
				{
					tasks.map((task) => (
						<div className='form-lista-tarefas-adm' key={task.id}>
							<input disabled className='email-task-adm' value={task.email} />
							<input disabled className='description-task-adm' value={task.description} />
							<input disabled className='date-task-adm' value={task.deadline.date} />
							<input disabled className='time-task-adm' type="time" value={task.deadline.hours} />
							<p className='status-task-adm'>{task.deadline.status}</p>
						</div>
					))
				}
				<div className='div-container-options'>
					<div className='div-options'>
						<p className='name-filters'>Tamanho da lista: </p>
						<select className='change-filters' onChange={(event) => changePageSize(event.target.value)}>
							<option value='10'> 10</option>
							<option value='20'> 20</option>
							<option value='50'> 50</option>
							<option value='100'> 100</option>
						</select>
					</div>
					<div className='div-options'>
						<p className='name-filters'>Filtros: </p>
						<select className='change-filters' onChange={(event) => changeFilters(event.target.value)}>
							<option value='false'> Todas as Tarefas</option>
							<option value='true'> Tarefas Atrasadas</option>
						</select>
					</div>
				</div>
			</div > : <div className='message-no-tasks'>Ops... Parece que não existem tarefas cadastradas...</div>
	);
}
