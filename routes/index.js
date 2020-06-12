/* GET home page. */
const get = (req, res, next) => {
	res.render('index', { title: 'Express' });
};

module.exports = get;
