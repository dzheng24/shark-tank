const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let defaulSharkArray = [
  //"/resources/strong_shark",
  "/resources/randomSharks/shark0.jpg",
  "/resources/randomSharks/shark1.jpg",
  "/resources/randomSharks/shark2.jpg",
  "",
];

SharkIdx = Math.floor(defaulSharkArray.length * Math.random());
defaulShark = defaulSharkArray[SharkIdx];

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  profilePic: { type: String, default: "/resources/babyShark.jpg" },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
