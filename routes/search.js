const pool = require('../modules/dbConnect');
const gender = require('../modules/gender');

const getGenderQueries = myData => {
	let ret = {};
	if (myData.target_genders.length === 2)
		ret.targets = '1=1';
	else
		ret.targets = `gender LIKE '${myData.target_genders}'`;

	ret.targetTargets = `target_genders LIKE '%${myData.gender}'`;
	return ret;
}

const get = (req, res, next) => {
	// User is not logged in
	if (!req.session.user)
		return res.status(301).redirect('/');
	const query = `SELECT * FROM users WHERE id = ${request.session.user.id};`;
	pool.query(query, (error, result) => {
		if (error || !result || !result[0])
			return res.status(301).redirect('/');
		const myData = result[0];
		if (!myData.gender)
			res.status(301).redirect('/myProfile/profile');
		const genderQueries = getGenderQueries(myData);
		const usersQuery = `SELECT * FROM users WHERE ${genderQueries.targets} AND ${genderQueries.targetTargets};`;

	});
	res.render('search');
};

const post = (req, res, next) => {
	
};

module.exports = {
	get,
	post
};
