const express = require("express");
const app = express();
const port = 3850;
const cors = require("cors");
const bodyparcer = require("body-parser");
require("./utils/db");
const userRouter = require("./routes/userRoutes");
const templateRouter = require("./routes/templateRoutes");

// get fun has two arguments first is end point then call back (no need to call. Called automatically)function
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//Middlewares
app.use(bodyparcer.json());
app.use(cors());

// User API
app.use("/api", userRouter);

// Template API
app.use("/api", templateRouter);

app.get("/welcome", (req, res) => {
  res.send("<h1>Welcome Ali Ahmed</h1>");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
// node behavious = asyncrouns
