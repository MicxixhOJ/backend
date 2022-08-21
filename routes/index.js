var express = require('express');
var router = express.Router();
const {homeController, profileController } = require('../controllers/home')

/* GET home page. */
router.get('/home', homeController)

router.get('/profile', profileController)

module.exports = router;
 