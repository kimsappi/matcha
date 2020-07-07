const mysql = require('mysql');
const {validateRegistrationData} = require('../../modules/validateUserData');
const pool = require('../../modules/dbConnect');

const get = (req, res, next) => {
	// User is not logged in
	if (!req.session.user)
		return res.status(301).redirect('/login');

	const query = 'SELECT * FROM user_photos WHERE `user` = ' + req.session.user.id + ';';
	pool.query(query, (error, results) => {
		if (error) {
			// TODO
			console.log('error getting pics');
			console.log(error);
		}
		else if (!results || !results[0]) {
			// TODO
			res.render('myProfile/pics');
		}
		else {
			console.log(results[0]);
			res.render('myProfile/pics', {results: results});
		}
	});
};

const post = (req, res, next) => {
	
};

module.exports = {
	get,
	post
};
