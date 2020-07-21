// ----- Dependencies -----
const express = require("express");
require("dotenv").config();
const ejs = require("ejs");

// ----- Start the Server -----
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// ----- Templates -----
app.set("view-engine", "ejs");

// ----- Middleware -----
app.use(express.static("./public"));

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

app.post("/create-card", createCard);

// app.get("/public/js", (req, res) => {
//   res.render("test.ejs");
// });

// -------------------------------------------------

// creating a card based on user input
function createCard() {
  document.getElementById("my_form").addEventListener("submit", () => {
    console.log("here");
  });
}
