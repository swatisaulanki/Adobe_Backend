const mongoose = require("mongoose");
const pSchemas = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 300,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("post", pSchemas);

module.exports = PostModel;
