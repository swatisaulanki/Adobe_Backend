const express = require("express");
const {
  NUsers,
  SUsers,
  UUsers,
  DUsers,
  AllDataUsers,
  FivActiveUsers,
} = require("../Controller/usercontrollers");
const userRouter = express.Router();

userRouter.post("/users", NUsers);
userRouter.get("/users/:id", SUsers);
userRouter.put("/users/:id", UUsers);
userRouter.delete("/users/:id", DUsers);
userRouter.get("/analytics/users", AllDataUsers);
userRouter.get("/analytics/users/top-active", FivActiveUsers);

module.exports = userRouter;
