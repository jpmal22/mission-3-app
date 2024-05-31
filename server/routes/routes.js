const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

router.post('/interview', interviewController.getInterviewResponse);

module.exports = router;
