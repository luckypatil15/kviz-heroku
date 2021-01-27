var express = require('express')
const hostingController = require('../controllers/hostingController')

var router = express.Router()

router.route('/').get(hostingController.getHosting).post(hostingController.joinquiz);

module.exports = router