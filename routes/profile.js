const mysql = require('mysql');

const pool = require('../modules/dbConnect');
const {getGenderEmoji} = require('../modules/gender.js');
const mysqlDatetime = require('../modules/mysqlDatetime');

const getLikeButtonStatus = (user, other) => {
	
};

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
		
		const visitQuery = `DELETE FROM visits WHERE visitor = ? AND visitee = ?;
		INSERT INTO visits (visitor, visitee, \`time\`) VALUES (?, ?, ?);`
		const preparedVisitQuery = mysql.format(visitQuery, [
			req.session.user.id, results[0].id, req.session.user.id, results[0].id, mysqlDatetime(new Date())
		]);

		// Don't really care about success so no callback
		pool.query(preparedVisitQuery);

		return res.render('profile', 
			{
				user: req.session.user,
				profileData: results[0],
				lookingFor: getGenderEmoji(results[0].target_genders),
				gender: getGenderEmoji(results[0].gender),
				title: `${results[0].first_name} ${results[0].last_name[0]}.`,
				likeButton: getLikeButtonStatus(req.session.user, results[0])
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
