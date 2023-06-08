const mongoose = require("mongoose");
const uuid = require("node-uuid");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  blocks: { type: Array },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
