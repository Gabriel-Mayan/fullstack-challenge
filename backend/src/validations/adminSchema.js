const yup = require('yup');

const isAdmin = yup.object().shape({
	userType: yup
		.string()
		.strict()
		.required()
		.test('equals', 'O usuario deve ser Administrador', (user) => user === 'admin')
});

const getTasksSchema = yup.object().shape({
	page: yup
		.string()
		.test('equals', 'É necessário adcionar um numero pra pagina', (page) => page == Number(page)),

	pageSize: yup
		.string()
		.test('equals', 'É necessário adcionar um numero pra quantidade de itens da pagina', (pageSize) => pageSize == Number(pageSize)),
});

module.exports = { isAdmin, getTasksSchema }