//defines route for handling POST requests to /interview, 
//delegates handling of the requests to getInterviewResponse method of interviewController object
const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController");

router.post("/interview", interviewController.getInterviewResponse);

module.exports = router;
