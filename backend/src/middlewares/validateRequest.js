const validateRequest = (schema) => async (request, response, next) => {
	try {
		await schema.validate(request);
		next();
	} catch (error) {
		return response.status(500).json(error.message);
	}
};

const validateBody = (schema) => async (request, response, next) => {
	try {
		await schema.validate(request.body);
		next();
	} catch (error) {
		return response.status(500).json(error.message);
	}
};

const validateParams = (schema) => async (request, response, next) => {
	try {
		await schema.validate(request.params);
		next();
	} catch (error) {
		return response.status(500).json(error.message);
	}
};

const validateQuery = (schema) => async (request, response, next) => {
	try {
		await schema.validate(request.query);
		next();
	} catch (error) {
		return response.status(500).json(error.message);
	}
};

const validateUser = (schema) => async (request, response, next) => {
	try {
		await schema.validate(request.user);
		next();
	} catch (error) {
		return response.status(500).json(error.message);
	}
};

module.exports = { validateRequest, validateBody, validateParams, validateQuery, validateUser };
