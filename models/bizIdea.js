const mongoose = require("mongoose");

const bizIdeaSchema = new mongoose.Schema({
  title: String,
  description: String,
  image_url: { type: String, default: "/resources/strong_shark" },
  owner: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("BizIdea", bizIdeaSchema);
