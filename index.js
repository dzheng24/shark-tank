// ----- Dependencies -----
const express = require("express");
require("dotenv").config();
const ejs = require("ejs");

// ----- Start the Server -----
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

app.set("view-engine", "ejs");

console.log(__dirname);
app.use(express.static("js"));

// ROUTES -----------------------------------------
app.get("/", (req, res) => {
  res.render("welcome-page.ejs", { name: "David" });
});

app.get("/display-page", (req, res) => {
  res.render("display-page.ejs");
});

app.get("/create-card", (req, res) => {
  res.render("create-card.ejs");
});

// app.post("/create-card", (req, res) => {
//   console.log("button clicked");
//   res.send("clicked");
// });

// app.get("/public/js", (req, res) => {
//   res.render("test.ejs");
// });

// -------------------------------------------------
