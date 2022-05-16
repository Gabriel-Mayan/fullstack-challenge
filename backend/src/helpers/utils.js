const { compareDate } = require('./handleDate');

const clearUserObject = (user) => {
	delete user.createdAt;
	delete user.updatedAt;
	delete user.deletedAt;
	delete user.password;

	return user;
};

const returnTaskStatus = (task) => {
	const test = compareDate(new Date(), task.deadline);
	const status = task.completedAt ?
		'Tarefa Completa!!!' : task.deletedAt ? 'Tarefa Excluida' : !test ? 'Tarefa Atrasada' : 'Em Progresso...';

	const date = formatDate(new Date(task.deadline));
	const hours = formatHours(new Date(task.deadline));

	return { status, date, hours }
};

function formatDate(date) {
	return [
		date.getFullYear(),
		(date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1),
		date.getDate(),
	].join('-');
}

function formatHours(date) {
	return (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" +
		(date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
}

module.exports = { clearUserObject, returnTaskStatus };
