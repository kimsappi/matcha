const mysql = require('mysql');
const {validateRegistrationData} = require('../modules/validateUserData');
const pool = require('../modules/dbConnect');
const hashPassword = require('../modules/hash');

/* GET registration page */
const get = (req, res, next) => {
	// User is already logged in
	if (req.session.user)
		return res.status(301).redirect('/');

	res.render('register');
};

/* POST to registration page (attempt to register new account) */
const post = (req, res, next) => {
	// User is already logged in
	if (req.session.user)
		return res.status(301).redirect('/');

	if (!validateRegistrationData(req.body))
		return res.render('register');
	else {
		const query = ' \
			INSERT INTO `users` SET \
				username = ?, password = ?, email = ?, first_name = ?, \
				last_name = ?, email_confirmation_string = ?; \
		';
		const emailConfirmationString = crypto.createHash('sha256')
			.update('req.body.email' + new Date()).digest('hex');
		const userData = [
			req.body.username,
			hashPassword(req.body.username, req.body.password),
			req.body.email,
			req.body.firstName,
			req.body.lastName,
			emailConfirmationString
		];

		const preparedQuery = mysql.format(query, userData, true);
		pool.query(preparedQuery,
			(error, results, fields) => {
				// Insert failed probably because of email/username clash
				if (error) {
					console.log('error',error);
					return res.render('register');
				}
				else {
					// TODO send email here
					return res.render('index');
				}
			}
		);
	};

	res.render('index');
};

module.exports = {
	get,
	post
};
