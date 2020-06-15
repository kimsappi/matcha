const mysql = require('mysql');
const {validateRegistrationData} = require('../modules/validateUserData');
const pool = require('../modules/dbConnect');
const hashPassword = require('../modules/hash');

const get = (req, res, next) => {
	// User is not logged in
	if (!req.session.user)
		return res.status(301).redirect('/login');

	
};

const post = (req, res, next) => {
	
};

module.exports = {
	get,
	post
};
