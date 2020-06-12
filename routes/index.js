/* GET home page. */
const get = (req, res, next) => {
	console.log(req.session.user);
	res.render('index',
		{
			title: 'Express',
			user: req.session.user
		}
	);
};

module.exports = {get};
