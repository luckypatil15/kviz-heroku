const express = require('express');
const contactUsController = require('../controllers/contactUsController');

router = express.Router();

router.route('/').get(contactUsController.getpage);

module.exports = router;