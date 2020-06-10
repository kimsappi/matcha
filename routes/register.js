const express = require('express');
const router = express.Router();

/* GET registration page */
router.get('/', function(req, res, next) {
  if (req.session.user)
    res.status(301).redirect('/');
  res.render('register');
});

/* POST to registration page (attempt to register new account) */
router.post('/', (req, res, next) => {
  if (req.session.user)
    res.status(301).redirect('/');
  console.log(req.body);
  res.render('index');
});

module.exports = router;
