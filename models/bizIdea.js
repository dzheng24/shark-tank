const mongoose = require("mongoose");

const bizIdeaSchema = new mongoose.Schema({
  title: String,
  description: String,
  image_url: String,
  // owner: { id: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
});

module.exports = mongoose.model("BizIdea", bizIdeaSchema);
