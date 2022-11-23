// express init
const express = require("express");
const app = express();

//env config
const env = require("dotenv");
env.config();
const port = process.env.PORT;

app.use("/", (req, res) => {
  res.status(200).json({ success: true });
});

//server start
const start = () => {
  try {
    app.listen(port, console.log(`server started at ${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
