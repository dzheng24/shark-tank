const mongoose = require("mongoose");
let defaulSharkArray = [
  //"/resources/strong_shark",
  "/resources/randomSharks/shark0.jpg",
  "/resources/randomSharks/shark1.jpg",
  "/resources/randomSharks/shark2.jpg",
  "/resources/randomSharks/shaq.jpg",
];

SharkIdx = Math.floor(defaulSharkArray.length * Math.random());
defaulShark = defaulSharkArray[SharkIdx];

const bizIdeaSchema = new mongoose.Schema({
  title: String,
  description: String,
  image_url: { type: String, default: defaulShark },
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
