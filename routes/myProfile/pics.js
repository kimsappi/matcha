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
	console.log(req.files);
	const query = 'SELECT COUNT(id) AS count FROM user_photos WHERE `user` = ' + req.session.user.id + ';';
	let imageCount = 0;
	pool.query(query, (error, result) => {
		if (error) {
			// TODO
			console.log('error');
		}
		else
			imageCount = result.count;
		
		for (i = 0; i + imageCount < 5; ++i) {
			if (!req.files[i] || !req.files[i].mimetype.startsWith('image/'))
				break;
			let extension = req.files[i].mimetype.split('/')[1];
			if (!/^[a-zA-Z]+/.test(extensions))
				break;
			let insertQuery = 'INSERT INTO user_photos (`user`, `extension`) VALUES (?, ?);';
			let preparedQuery = mysql.format(insertQuery, [req.session.user.id, extension]);
			let filename = '';
			pool.query(preparedQuery, (error, result) => {
				if (error) {
					//todo
					console.log('error inserting picture');
				}
				else
					filename = result.insertId;
			});
			fs.rename(req.files[i].filename, 'img/userPhotos/' + filename + '.' + extension);
		}
	});
};

module.exports = {
	get,
	post
};
