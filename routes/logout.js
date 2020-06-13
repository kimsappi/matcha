const get = (req, res, next) => {
	req.session.user = null;
	res.status(301).redirect('/');
};

module.exports = {
	get
};
