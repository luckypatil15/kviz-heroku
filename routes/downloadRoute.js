const express = require('express');
const downloadController = require('../controllers/downloadController');

router = express.Router();

router.route('/').get(downloadController.downloadFile);

module.exports = router;
