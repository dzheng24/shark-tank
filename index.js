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

//------use package----
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set("view-engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));

//config passort -----------
app.use(
  session({
    secret: "rickyz",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//-----require routes-----
const indexRoutes = require("./routes/index.js");
app.use(indexRoutes);

// ----- Routes -----
app.get("/", (req, res) => {
  res.render("welcome-page.ejs");
});
//----------------------------

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
  console.log("calling createCard function");
}

//------------PORT listening------------
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
