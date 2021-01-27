const express = require('express');
const viewliveResponseController = require('../controllers/viewliveResponseController');

router = express.Router();

router.route('/').get(viewliveResponseController.getresponses);

module.exports = router;
