const { Router } = require('express');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/user');
const { getAllTasks } = require('./controllers/admin');
const { createTask, finalizeTask, updateTask, listTask } = require('./controllers/task');

const { loginSchema } = require('./validations/loginSchema');
const { createUserSchema } = require('./validations/userSchema');
const { createTaskSchema, updateTaskSchema } = require('./validations/taskSchema');
const { testParamsSchema, checkEmptyRequestSchema } = require('./validations/genericSchema');
const { isAdmin, getTasksSchema } = require('./validations/adminSchema');

const authentication = require('./middlewares/authentication');
const { validateBody, validateParams, validateRequest, validateQuery, validateUser } = require('./middlewares/validateRequest');

const routes = Router();

routes.get('/', (_, response) => response.status(200).json({ message: 'Teste OK' }));

routes.post('/login', validateBody(loginSchema), login);
routes.post('/create_user', validateBody(createUserSchema), createUser);

routes.get('/user/list_task', authentication, listTask);
routes.post('/user/create_task', authentication, validateBody(createTaskSchema), createTask);
routes.post('/user/finalize_task/:id', authentication, validateParams(testParamsSchema), finalizeTask);
routes.post('/user/update_task/:id', authentication, validateRequest(checkEmptyRequestSchema), validateParams(testParamsSchema), validateBody(updateTaskSchema), updateTask);

routes.get('/admin/list_all_tasks', authentication, validateUser(isAdmin), validateQuery(getTasksSchema), getAllTasks);

module.exports = routes;
