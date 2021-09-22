const express     = require('express'),
      router      = express.Router(),
      controllers = require('../controllers/user.controller');

router.get('/home' , controllers.getHome);

router.get('/login' , controllers.getLogin);

router.get('/secrets' , controllers.getSecrets);

router.get('/submit' , controllers.submit);

router.post('/submit' , controllers.postSubmit);

router.get('/register' , controllers.getSignup);

router.post('/register' , controllers.signup);

router.post('/login' , controllers.login);

router.get('/logout' , controllers.logout);

module.exports = router;

