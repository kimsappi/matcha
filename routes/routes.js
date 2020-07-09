const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'tmp/'});

// Routes
const index = require('./index');
const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const confirmEmail = require('./confirmEmail');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');
const search = require('./search');

const myProfile = require('./myProfile/profile');
const myPics = require('./myProfile/pics');

const profile = require('./profile');

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

// resetPassword.js
router.get('/resetPassword', (req, res, next) => {
	resetPassword.get(req, res, next);
});

router.post('/resetPassword', (req, res, next) => {
	resetPassword.post(req, res, next);
});

// myProfile/profile.js
router.get('/myProfile/profile', (req, res, next) => {
	myProfile.get(req, res, next);
});

router.post('/myProfile/profile', (req, res, next) => {
	myProfile.post(req, res, next);
});

// myProfile/pics.js
router.get('/myProfile/pics', (req, res, next) => {
	myPics.get(req, res, next);
});

router.post('/myProfile/pics', upload.array('photos', 5), (req, res, next) => {
	myPics.post(req, res, next);
});

// profile.js
router.get('/profile/:id', (req, res, next) => {
	profile.get(req, res, next);
});

router.post('/profile/:id', (req, res, next) => {
	profile.post(req, res, next);
});

// profile.js
router.get('/search', (req, res, next) => {
	search.get(req, res, next);
});

router.post('/search', (req, res, next) => {
	search.post(req, res, next);
});

module.exports = router;
