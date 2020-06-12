const mysql = require('mysql');
const {validateRegistrationData} = require('../modules/validateUserData');
const pool = require('../modules/dbConnect');
const hashPassword = require('../modules/hash');

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

	pool.query(preparedQuery,
		(error, results) => {
			// Some kind of DB error
			if (error) {
				console.log('error',error);
				return res.render('login');
			}
			// Login successful
			else if (results) {
				req.session.user = {
					id: results[0].id,
					username: results[0].username
				};
				return res.status(301).redirect('/');
			}
			// Password or username incorrect
			else
				return res.render('login');
		}
	);
};

module.exports = {
	get,
	post
};
