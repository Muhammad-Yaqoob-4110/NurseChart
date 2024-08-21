const Template = require("../models/templateModel");
const jwt = require("jsonwebtoken"); // Import the jwt library

// Create a User
async function createTemplate(req, res) {
    try {
      const newTemplate = await Template.create(req.body);
      res.status(201).json({
        message: "Template created successfully",
        userid: newTemplate.userid,
        templateid: newTemplate.templateid,
        template : newTemplate.template,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all Templates
async function getAllTemplates(req, res) {
  try {
    const { userid } = req.body;

    // Find templates by userid
    const templates = await Template.find({ userid: userid });
    
    // console.log(templates)
    // Extract relevant data from the templates
    const templatesDict = templates.map(tem => ({
      templateid: tem.templateid,
      template: tem.template,
    }));
    
    // Return the list of usernames as JSON
    res.json(templatesDict);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

  module.exports = {
    createTemplate,
    getAllTemplates,
  };
  