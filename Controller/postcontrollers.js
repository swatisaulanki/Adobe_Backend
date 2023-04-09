const PostModel = require("../Models/postmodel");
const UserModel = require("../Models/usermodel");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const NPosts = async (req, res, next) => {
  let { content, likes, user_id } = req.body;
  let existUser;
  try {
    existUser = await UserModel.findById(user_id);
  } catch (error) {
    console.log(error);
  }
  if (!existUser) {
    return res.status(400).json({ message: "Unable to find the user by Id" });
  }
  const post = new PostModel({ content, likes, user_id });
  try {
    await post.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(201).json({ post });
};

const SPosts = async (req, res, next) => {
  const { id } = req.params;
  let existPost;
  try {
    existPost = await PostModel.findById({ _id: id });
  } catch (error) {
    console.log(error);
  }
  if (!existPost) {
    return res.status(404).json({ message: "Post not found!!!" });
  }
  return res.status(200).json({ message: "Post found by its Id", existPost });
};

const UPosts = async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  let existPost;
  try {
    existPost = await PostModel.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
  if (!existPost) {
    return res.status(404).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Update user Post", existPost });
};

const DPosts = async (req, res, next) => {
  const { id } = req.params;
  let existPost;
  try {
    existPost = await PostModel.findOneAndDelete({ _id: id });
  } catch (error) {
    console.log(error);
  }
  if (!existPost) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(204).json({ message: "Successfully Deleted" });
};

const LikePostById = async (req, res, next) => {
  let { id } = req.params;
  let { likes } = req.body;
  let existPost;
  try {
    existPost = await PostModel.findByIdAndUpdate(id, { likes }, { new: true });
  } catch (error) {
    console.log(error);
  }
  if (!existPost) {
    return res.status(404).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Update Likes Post", existPost });
};
const UnLikePostById = async (req, res, next) => {
  let { id } = req.params;
  let { likes } = req.body;
  let existPost;
  try {
    if (likes >= 0) {
      existPost = await PostModel.findByIdAndUpdate(
        id,
        { likes },
        { new: true }
      );
    } else {
      return res.status(200).json({ message: "Post have also minimum likes" });
    }
  } catch (error) {
    console.log(error);
  }
  if (!existPost) {
    return res.status(404).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Update unlikes Post", existPost });
};

const allPostDataC = async (req, res, next) => {
  let allPost;
  try {
    allPost = await PostModel.find();
  } catch (error) {
    console.log(error);
  }
  if (!allPost) {
    return res.status(400).json({ message: "Post not found" });
  }
  return res.status(200).json({ message: "All users", allPost });
};

const FivLikedPost = async (req, res, next) => {
  let mostLiked;
  try {
    mostLiked = await PostModel.find().sort({ likes: -1 }).limit(5);
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ mostLiked });
};

module.exports = {
  NPosts,
  SPosts,
  UPosts,
  DPosts,
  LikePostById,
  UnLikePostById,
  allPostDataC,
  FivLikedPost,
};
