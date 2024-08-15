const config = require('../config.json');
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);


mongoose.connect(config.mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => {
  console.log("Failed to connect with db");
});
db.once("open", () => {
  console.log("Connected with db");
});