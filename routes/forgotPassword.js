const mysql = require('mysql');
const crypto = require('crypto');

const pool = require('../modules/dbConnect');
const sendEmail = require('../modules/mail');
const getRootUrl = require('../modules/getRootUrl');

const get = (req, res, next) => {
	// User is already logged in
	if (req.session.user)
		return res.status(301).redirect('/');

	res.render('forgotPassword');
};

const post = (req, res, next) => {
	// User is already logged in
	if (req.session.user || !req.body.email)
		return res.status(301).redirect('/');
	
	const resetToken = crypto.createHash('md5').update(req.query.email + new Date()).digest('hex');
	const query = `
		UPDATE users
			SET \`password\` = NULL, forgot_password_string = ?
			WHERE email = ?;
	`;
	const preparedQuery = mysql.format(query, [resetToken, req.body.email]);

	const resetUrl = getRootUrl(req) + '/resetPassword?user=' + req.body.email.split('@')[0] + '&token=' + resetToken;

	const emailContent = `
<p>To reset your password, click the following link:</p>
<a href=${resetUrl}>${resetUrl}</a>
`;
	
	pool.query(preparedQuery, (error, results) => {
		if (error)
			console.error(error);
		else if (results.affectedRows)
			sendEmail(req.body.email, 'Matcha | Reset password', emailContent, true)
	});

	res.status(301).redirect('/');
};

module.exports = {
	get,
	post
};
