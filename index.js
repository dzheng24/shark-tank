// ----- Dependencies -----
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const ejs = require("ejs");

// ----- Start the Server -----
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// ----- Templates -----
app.set("view-engine", "ejs");

// ----- Middleware -----
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
