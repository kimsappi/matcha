const mysql = require('mysql');
const pool = require('../modules/dbConnect');

const get = (req, res, next) => {
	// User is already logged in
	if (req.session.user || !req.query.user || !req.query.token)
		return res.status(301).redirect('/');
	
	const query = `
	UPDATE users
		SET email_confirmation_string = NULL
		WHERE username = ? AND email_confirmation_string = ?;
	`;

	const preparedQuery = mysql.format(query, [req.query.user, req.query.token]);
	pool.query(preparedQuery);
	res.status(301).redirect('/login');
};

module.exports = {
	get
};
