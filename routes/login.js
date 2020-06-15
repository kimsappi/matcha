const mysql = require('mysql');
const pool = require('../modules/dbConnect');
const hashPassword = require('../modules/hash');
const mysqlDatetime = require('../modules/mysqlDatetime');

const get = (req, res, next) => {
	// User is already logged in
	if (req.session.user)
		return res.status(301).redirect('/');

	res.render('login');
};

const post = (req, res, next) => {
	// User is already logged in
	if (req.session.user)
		return res.status(301).redirect('/');
	
	// Username or password not provided
	if (!req.body.username || !req.body.password)
		return res.render('login');
	
	const hashedPassword = hashPassword(req.body.username, req.body.password);
	const query = 'SELECT * FROM `users` WHERE username = ? AND password = ?;';
	const preparedQuery = mysql.format(query, [req.body.username, hashedPassword]);

	pool.query(preparedQuery, (error, results) => {
		// Some kind of DB error
		if (error) {
			console.log('error',error);
			return res.render('login');
		}
		// Login successful
		else if (results && !results[0].email_confirmation_string && !results[0].forgot_password_string) {
			req.session.user = {
				id: results[0].id,
				username: results[0].username
			};
			pool.query(`UPDATE users SET last_login = '${mysqlDatetime(new Date())}' WHERE id = ${results[0].id};`);
			return res.status(301).redirect('/');
		}
		// Email address is not confirmed
		else if (results) {
			return res.render('login');
		}
		// Password or username incorrect
		else
			return res.render('login');
	});
};

module.exports = {
	get,
	post
};
