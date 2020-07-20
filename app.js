const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const goods = require("./routes/goods");
const mypage = require("./routes/mypage");
const user = require("./routes/user");
const home = require("./routes/home");
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "jerry",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/home", home);
app.use("/user", user);
app.use("/mypage", mypage);
app.use("/goods", goods);

app.listen(port, () => {
  console.log("Server is listening to Port 4000");
});

module.exports = app;
