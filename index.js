// ----- Dependencies -----
require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const expressSanitizer = require("express-sanitizer");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const PORT = process.env.PORT || 3001;
const session = require("express-session");

//----------import .js --------------
const User = require("./models/user.js");

//-------MongoDB----------
const url =
  "mongodb+srv://TEAM5:kVuK4JvC91oMwWTD@cluster0.cn74u.mongodb.net/SharkTank?retryWrites=true&w=majority";
mongoose.connect(url);

// ----- Middleware -----
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// ----- Start the Server -----
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// ----- Templates -----
app.set("view-engine", "ejs");

// ----- ARRAY OF OBJECTS(CARD) -----
let cardsArray = [];

// ----- Routes -----
app.get("/", (req, res) => {
  res.render("welcome-page.ejs", { name: "David" });
});

app.get("/display-page", (req, res) => {
  res.render("display-page.ejs");
});

app.get("/create-card", (req, res) => {
  res.render("create-card.ejs");
});

app.post("/create-card", (req, res) => {
  let newTitle = req.body.titleInput;
  let newDescription = req.body.descriptionInput;
  let newImageURL = req.body.imageInput;
  let newCard = {
    title: newTitle,
    description: newDescription,
    url: newImageURL,
  };
  cardsArray.push(newCard);
  return res.json(cardsArray);
});

// app.get("/public/js", (req, res) => {
//   res.render("test.ejs");
// });

// -------------------------------------------------

// creating a card based on user input
