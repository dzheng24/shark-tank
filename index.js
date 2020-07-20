const express = require("express");
const app = express();
const ejs = require("ejs");

app.set("view-engine", "ejs");

// ROUTES -----------------------------------------
app.get("/", (req, res) => {
  res.render("welcome-page.ejs", { name: "David" });
});

app.get("/display", (req, res) => {
  res.render("display-page.ejs");
});

app.listen(3000, () => {
  console.log("server is up on 3000");
});
