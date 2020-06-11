const express = require('express');
const {validateRegistrationData} = require('../modules/validateUserData');
const router = express.Router();

/* GET registration page */
router.get('/', function (req, res, next) {
	// User is already logged in
	if (req.session.user)
		res.status(301).redirect('/');

	res.render('register');
});

/* POST to registration page (attempt to register new account) */
router.post('/', (req, res, next) => {
	// User is already logged in
	if (req.session.user)
		res.status(301).redirect('/');

	console.log(validateRegistrationData(req.body));
	res.render('index');
});

module.exports = router;
