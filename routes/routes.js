const express = require('express');

// Routes
const index = require('./index');
const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const confirmEmail = require('./confirmEmail');
const forgotPassword = require('./forgotPassword');

const router = express.Router();

// index.js
router.get('/', function(req, res, next) {
	index.get(req, res, next);
});

// register.js
router.get('/register', (req, res, next) => {
	register.get(req, res, next);
});

router.post('/register', (req, res, next) => {
	register.post(req, res, next);
});

// login.js
router.get('/login', (req, res, next) => {
	login.get(req, res, next);
});

router.post('/login', (req, res, next) => {
	login.post(req, res, next);
});

// logout.js
router.get('/logout', (req, res, next) => {
	logout.get(req, res, next);
});

// confirmEmail.js
router.get('/confirmEmail', (req, res, next) => {
	confirmEmail.get(req, res, next);
});

// forgotPassword.js
router.get('/forgotPassword', (req, res, next) => {
	forgotPassword.get(req, res, next);
});

router.post('/forgotPassword', (req, res, next) => {
	forgotPassword.post(req, res, next);
});

module.exports = router;
