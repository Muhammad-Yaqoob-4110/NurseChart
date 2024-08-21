const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");

// create a template
router.post("/templates", templateController.createTemplate);

// create a template
router.post('/getAllTemplates', templateController.getAllTemplates);

module.exports = router;
