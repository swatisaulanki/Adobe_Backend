const UserModel = require("../Models/usermodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const NUsers = async (req, res, next) => {
  let { name, email, bio } = req.body;
  console.log(email);
  let existUser;
  try {
    existUser = await UserModel.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (existUser) {
    const token = jwt.sign(
      { email: existUser.email, id: existUser._id.toString() },
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "7d",
      }
    );
    return res
      .status(200)
      .json({ message: "Login Successful", user: existUser, token });
  }
  const newUserRegister = new UserModel({
    name,
    email,
    bio,
  });
  try {
    await newUserRegister.save();
  } catch (error) {
    return console.log(error);
  }
  const token = jwt.sign(
    { email, id: newUserRegister._id.toString() },
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    {
      expiresIn: "7d",
    }
  );
  return res
    .status(201)
    .json({ message: "Register successfully", newUserRegister, token });
};

const SUsers = async (req, res, next) => {
  const { id } = req.params;
  let existUser;
  try {
    existUser = await UserModel.findById({ _id: id });
  } catch (error) {
    console.log(error);
  }
  if (!existUser) {
    return res.status(404).json({ message: "User not found!!!" });
  }
  return res.status(200).json({ message: "User Credentials", existUser });
};

const UUsers = async (req, res, next) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  let existUser;
  try {
    existUser = await UserModel.findByIdAndUpdate(
      id,
      { name, bio },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
  if (!existUser) {
    return res.status(404).json({ message: "Something went wrong" });
  }
  return res
    .status(200)
    .json({ message: "Update user credentials", existUser });
};
const DUsers = async (req, res, next) => {
  const { id } = req.params;
  let existUser;
  try {
    existUser = await UserModel.findOneAndDelete({ _id: id });
  } catch (error) {
    console.log(error);
  }
  if (!existUser) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(204).json({ message: "Successfully Deleted" });
};
const AllDataUsers = async (req, res, next) => {
  let allUsers;
  try {
    allUsers = await UserModel.find().count();
  } catch (error) {
    console.log(error);
  }
  if (!allUsers) {
    return res.status(400).json({ message: "Users not found" });
  }
  return res.status(200).json({ message: "All users", allUsers });
};
const FivActiveUsers = async (req, res, next) => {
  const users = await UserModel.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "user_id",
        foreignField: "author",
        as: "posts",
      },
    },
    { $project: { name: 1, email: 1, postCount: { $size: "$posts" } } },
    { $sort: { postCount: -1 } },
    { $limit: 5 },
  ]);
  res.json(users);
};
module.exports = {
  NUsers,
  SUsers,
  UUsers,
  DUsers,
  AllDataUsers,
  FivActiveUsers,
};
