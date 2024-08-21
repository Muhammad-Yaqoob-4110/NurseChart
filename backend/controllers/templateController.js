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

  module.exports = {
    createTemplate,
  };
  