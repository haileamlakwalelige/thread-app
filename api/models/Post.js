const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  replies: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
        required: true,
      },
      CreatedAt: {
        type: Data,
        default: Data.now,
      },
    },
  ],
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.models("Post", postSchema);

module.exports = Post;
