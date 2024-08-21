const mongoose = require("mongoose");

const templateSchema = mongoose.Schema(
  {
    userid: String,
    templateid: String,
    template: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Templates", templateSchema);
