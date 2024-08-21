const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");

// create a template
router.post("/templates", templateController.createTemplate);

// create a template
router.get('/templates', templateController.getAllTemplates);

module.exports = router;
