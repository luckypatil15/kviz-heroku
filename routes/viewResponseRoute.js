const express = require('express');
const viewResponseController = require('../controllers/viewResponseController');

router = express.Router();

router.route('/').get(viewResponseController.getresponses);

module.exports = router;
