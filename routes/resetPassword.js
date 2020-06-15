const mysql = require('mysql');
const {validatePassword} = require('../modules/validateUserData');
const pool = require('../modules/dbConnect');
const hashPassword = require('../modules/hash');

const get = (req, res, next) => {
	// User is already logged in or they 
	if (req.session.user || !req.query.user || !req.query.token)
		return res.status(301).redirect('/');

	res.render('resetPassword', {
		userGet: req.query.user,
		token: req.query.token
	});
};

const post = (req, res, next) => {
	// User is already logged in
	if (req.session.user || !req.body.user || !req.body.token || !req.body.password || !req.body.confirmPassword)
		return res.status(301).redirect('/');

	// Passwords don't match or entered password is not a valid password
	if (req.body.password !== req.body.confirmPassword || !validatePassword(req.body.password))
		return res.status(301).redirect('/resetPassword?user=' + req.body.user + '&token=' + req.body.token);

	const query = `SELECT * FROM users WHERE forgot_password_string = ?;`;
	const preparedQuery = mysql.format(query, [req.body.token]);
	pool.query(preparedQuery, (error, result) => findAccount(error, result, req.body.user, req.body.password, res));
};

const findAccount = (error, results, email, password, res) => {
	if (error || !results) {
		return res.status(301).redirect('/');
	}

	let matchingAccount = null;

	results.forEach(result => {
		if (result.email.split('@')[0] === email)
			matchingAccount = result;
	});

	if (!matchingAccount)
		return res.status(301).redirect('/');
	
	const query = `
	UPDATE users
		SET \`password\` = ?, forgot_password_string = NULL
		WHERE id = ?;`;
	const formattedQuery = mysql.format(query, [hashPassword(matchingAccount.username, password), matchingAccount.id]);
	pool.query(formattedQuery);
	return res.status(301).redirect('/login');
};

module.exports = {
	get,
	post
};
