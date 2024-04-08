const express = require("express");
const router = require("./routes/user");
const cors = require("cors");
const connectiondb = require("./connection");
const app = express();

app.use(cors());
connectiondb("your database url").then(() =>
  console.log("database connected..."),
);
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/user", router);

app.listen(8000, () => console.log("sever started..."));

