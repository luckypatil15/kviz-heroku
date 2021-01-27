const express = require('express');
const editquestionController = require('../controllers/old/editquestionController');

router = express.Router();

router.post('/', editquestionController.editQuestion);

module.exports = router;