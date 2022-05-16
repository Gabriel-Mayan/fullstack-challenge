const { returnTaskStatus } = require('../helpers/utils');
const { getTasksPaginated, getTasksOverduePaginated } = require('../helpers/handleKnex');

const getAllTasks = async (request, response) => {
	try {
		let tasks;
		let showTask = [];
		const { page, pageSize, filterOverdue } = request.query;

		if (filterOverdue === 'true') {
			tasks = await getTasksOverduePaginated(page, pageSize);
		}
		else {
			tasks = await getTasksPaginated(page, pageSize);
		}

		tasks.map((info) => {
			info.deadline = returnTaskStatus(info);
			showTask.push(info);
		});

		return response.status(200).json(showTask);
	} catch (error) {
		return response.status(400).json('Falha ao Listar as tasks');
	}
}

module.exports = { getAllTasks };