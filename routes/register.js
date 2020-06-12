const express = require('express');
const mysql = require('mysql');
const {validateRegistrationData} = require('../modules/validateUserData');
const pool = require('../modules/dbConnect');
const hashPassword = require('../modules/hash');

const router = express.Router();

/* GET registration page */
router.get('/', function (req, res, next) {
	// User is already logged in
	if (req.session.user)
		return res.status(301).redirect('/');

	res.render('register');
});

/* POST to registration page (attempt to register new account) */
router.post('/', (req, res, next) => {
	// User is already logged in
	if (req.session.user)
		return res.status(301).redirect('/');

	if (!validateRegistrationData(req.body))
		return res.render('register');
	else {
		const query = ' \
			INSERT INTO `users` SET \
				username = ?, password = ?, email = ?, first_name = ?, last_name = ?; \
		';
		const userData = [
			req.body.username,
			hashPassword(req.body.username, req.body.password),
			req.body.email,
			req.body.firstName,
			req.body.lastName
		];

		const preparedQuery = mysql.format(query, userData, true);
		pool.query(preparedQuery,
			(error, results, fields) => {
				// Insert failed probably because of email/username clash
				console.log('error',error);
				console.log('results',results);
				console.log('fields',fields);
			}
		);
	};

	res.render('index');
});

module.exports = router;
