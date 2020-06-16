const mysql = require('mysql');
const {validateMyProfileData} = require('../modules/validateUserData');
const pool = require('../modules/dbConnect');
const hashPassword = require('../modules/hash');

const get = (req, res, next) => {
	// User is not logged in
	if (!req.session.user)
		return res.status(301).redirect('/login');

	const query = `SELECT * FROM users WHERE id = ${req.session.user.id};`;
	pool.query(query, (error, results) => {
		if (error || !results)
			return res.status(301).redirect('/');
		
		return res.render('myProfile', {
			userData: results[0],
			user: req.session.user
		});
	});
};

const post = (req, res, next) => {
	// User is not logged in
	if (!req.session.user)
		return res.status(301).redirect('/login');

	// Profile is not filled completely/correctly
	if (!validateMyProfileData(req.body))
		return res.status(301).redirect('/myProfile');
	
	const query =
`UPDATE users
	SET email = ?, first_name = ?, last_name = ?, gender = ?, target_genders = ?
	WHERE id = ${req.session.user.id};`;
	const preparedQuery = mysql.format(query,
		[req.body.email, req.body.firstName, req.body.lastName, req.body.gender, req.body.target]);

	pool.query(preparedQuery, (error) => {
		if (error)
			return res.status(301).redirect('/myProfile');
		else
			return res.status(301).redirect('/myProfile');
	});
};

module.exports = {
	get,
	post
};
