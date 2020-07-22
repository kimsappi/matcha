const mysql = require('mysql');
const fs = require('fs');

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
			res.render('myProfile/pics', {
				'results': results,
				'title': 'Your photos',
				'user': req.session.user
			});
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
			imageCount = result[0].count;
		
		// Loop through images, insert them to database, and rename
		for (let i = 0; i + imageCount < 5; ++i) {
			if (!req.files || !req.files[i] || !req.files[i].mimetype.startsWith('image/'))
				break;
			let extension = req.files[i].mimetype.split('/')[1];
			if (!/^[a-zA-Z]+/.test(extension))
				break;
			const insertQuery = 'INSERT INTO user_photos (`user`, `extension`) VALUES (?, ?);';
			let preparedQuery = mysql.format(insertQuery, [req.session.user.id, extension]);
			let filename = '';
			pool.query(preparedQuery, (error, result) => {
				if (error) {
					//todo
					console.log('error inserting picture');
				}
				else {
					filename = result.insertId;
					fs.renameSync(req.files[i].path, `public/img/userPhotos/${filename}.${extension}`);
					
					// User uploads their first image, make that default
					if (!imageCount) {
						const defaultQuery = `UPDATE users SET main_pic = ${filename} WHERE id = ${req.session.user.id};`;
						pool.query(defaultQuery);
					}
				}
			});
		}
	});
	return res.redirect('back');
};

module.exports = {
	get,
	post
};
