const { generateUuid } = require('../../helpers/handleUuid');
const { encryptPassword } = require('../../helpers/handlePassword');
const { insertInfo, findOneBy } = require('../../helpers/handleKnex');

exports.seed = async function (knex) {
	const encryptedPassword = await encryptPassword(process.env.ADMIN_PWD);
	const existAdm = await findOneBy('users', { email: process.env.ADMIN_EMAIL })

	if (!existAdm) {
		await insertInfo('users', {
			id: generateUuid(),
			email: process.env.ADMIN_EMAIL,
			password: encryptedPassword,
			userType: process.env.ADMIN_USERTYPE
		});
	}
};
