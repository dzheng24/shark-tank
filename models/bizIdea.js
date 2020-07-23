const mongoose = require("mongoose");

const bizIdeaSchema = new mongoose.Schema({
  title: String,
  description: String,
  image_url: {
    type: String,
    default: () => {
      let defaultSharkArray = [
        "/resources/randomSharks/shark0.jpg",
        "/resources/randomSharks/shark1.jpg",
        "/resources/randomSharks/shark2.jpg",
        "/resources/randomSharks/shark3.jpg",
        "/resources/randomSharks/shark4.jpg",
        "/resources/randomSharks/shark5.jpg",
        "/resources/randomSharks/shaq.jpg",
        "/resources/randomSharks/sharkbaby.jpg",
      ];
      return defaultSharkArray[
        Math.floor(Math.random() * defaultSharkArray.length)
      ];
    },
  },
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
