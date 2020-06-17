const mysql = require('mysql');
const express = require('express');

const {validateMyProfileData, parseTags} = require('../modules/validateUserData');
const pool = require('../modules/dbConnect');

const get = (req, res, next) => {
	// User is not logged in
	if (!req.session.user)
		return res.status(301).redirect('/login');

	// I wonder if doing some kind of join here would make more sense
	const query = `SELECT * FROM users WHERE id = ${req.session.user.id};`;
	pool.query(query, (error, results) => {
		if (error || !results)
			return res.status(301).redirect('/');

		const tagsQuery = `SELECT string FROM tags WHERE user = ${req.session.user.id};`;
		pool.query(tagsQuery, (tagsError, tagsResults) => {
			if (tagsError)
				return res.status(301).redirect('/');

			return res.render('myProfile', {
				userData: results[0],
				user: req.session.user,
				biography: escape(results[0].biography),
				tags: stringifyTags(tagsResults)
			});
		});		
	});
};

const post = (req, res, next) => {
	// User is not logged in
	if (!req.session.user)
		return res.status(301).redirect('/login');

	// Profile is not filled completely/correctly
	if (!validateMyProfileData(req.body))
		return res.status(301).redirect('/myProfile');

	// Parse tags from string to array
	const tags = parseTags(req.body.tags);

	console.log(generateTagsQuery(tags, req.session.user.id));
	
	const query = `
UPDATE users
	SET email = ?, first_name = ?, last_name = ?, gender = ?, target_genders = ?,
		biography = ?
	WHERE id = ${req.session.user.id};
DELETE FROM tags WHERE user = ${req.session.user.id};` + generateTagsQuery(tags, req.session.user.id);
	const preparedQuery = mysql.format(query,
		[
			req.body.email, req.body.firstName, req.body.lastName,
			req.body.gender, req.body.target, req.body.biography
		]
	);

	pool.query(preparedQuery, (error) => {
		if (error)
			return res.status(301).redirect('/myProfile');
		else
			return res.status(301).redirect('/myProfile');
	});
};

const generateTagsQuery = (tags, id) => {
	if (!tags)
		return '';

	const insertStrings = tags.map(element => "('" + element + "', " + id + ')');
	const insertStringsJoined = insertStrings.join(',');

	return `INSERT INTO tags(string, user) VALUES ` + insertStringsJoined + ';';
};

const stringifyTags = tags => {
	if (!tags.length)
		return '';
	
	const ret = tags.map(element => '#' + element.string);
	return ret.join(', ');
};

module.exports = {
	get,
	post
};
