const express = require("express");
const cors = require("cors");
const connection = require("./Database/db");
const userRouter = require("./Routes/usersroute");
const postRouter = require("./Routes/postroute");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/", userRouter);
app.use("/", postRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello....</h1>");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(" connected successfully...");
  } catch (error) {
    console.log(error);
  }
  console.log(`running on ${port}`);
});
