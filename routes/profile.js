const mysql = require('mysql');

const pool = require('../modules/dbConnect');
const {getGenderEmoji} = require('../modules/gender.js');

const get = (req, res, next) => {
	const userId = req.params.id;
	// User is not logged in or no id provided or id is invalid
	if (!req.session || !req.session.user ||
		!userId || !Number.isInteger(parseFloat(userId))
	)
		return res.status(301).redirect('/');

	// userId is already verified to be an integer so no need to prepare
	const query = `SELECT * FROM users WHERE id = ${userId};`;

	pool.query(query, (error, results) => {
		if (error || !results || !results[0])
			return res.status(301).redirect('/');
		
		return res.render('profile', 
			{
				user: req.session.user,
				profileData: results[0],
				lookingFor: getGenderEmoji(results[0].target_genders),
				gender: getGenderEmoji(results[0].gender),
				title: `${results[0].first_name} ${results[0].last_name[0]}.`
			}
		);
	});
};

// const post = (req, res, next) => {
	
// };

module.exports = {
	get,
	//post
};
