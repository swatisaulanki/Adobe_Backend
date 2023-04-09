const express = require("express");
const {
  NPosts,
  SPosts,
  UPosts,
  DPosts,
  LikePostById,
  UnLikePostById,
  allPostDataC,
  FivLikedPost,
} = require("../Controller/postcontrollers");
const postRouter = express.Router();

postRouter.post("/posts", NPosts);
postRouter.get("/posts/:id", SPosts);
postRouter.put("/posts/:id", UPosts);
postRouter.delete("/posts/:id", DPosts);
postRouter.post("/posts/:id/like", LikePostById);
postRouter.post("/posts/:id/unlike", UnLikePostById);
postRouter.get("/analytics/posts", allPostDataC);
postRouter.get("/analytics/posts/top-liked", FivLikedPost);

module.exports = postRouter;
