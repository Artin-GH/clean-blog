const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  pictureUrl: { type: String, default: '/media/posts/default.jpg' },
  title: { type: String, required: true },
  subtitle: { type: String },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Post", PostSchema);
