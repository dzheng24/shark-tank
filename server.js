const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const User = require("./models/user");
const LocalStrategy = require("passport-local");

const url =
  "mongodb+srv://TEAM5:kVuK4JvC91oMwWTD@cluster0.cn74u.mongodb.net/SharkTank?retryWrites=true&w=majority";
mongoose.connect(url);

app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set("view-engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));

//passport configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
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

//test form
app.get("/test", (req, res) => {
  res.render("test.ejs");
});

app.post("/test", (req, res) => {
  document
    .getElementById("test")
    .addEventListener("submit", () => console.log("clicked"));
  res.render("register.ejs");
});

app.get("/", checkAuthenticated, (req, res) => {
  req.flash("info", "Welcome");
  res.render("index");
});

/**
 * login portion
 */

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {}
);

/**
 * logout logic
 */

app.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "logged out!");
  res.redirect("/");
});

/**
 * register portion
 */
//show sign up form
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
//handling user sign up
app.post("/register", (req, res) => {
  let newUser = new User({
    username: req.body.name,
    email: req.body.email,
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash("error", err.message);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        req.flash("sucess", "welcome to Shark Tank!" + user.username);
        res.redirect("/");
      });
    }
  });
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

app.listen(3000, () => {
  console.log("start litening");
});

/**
 * User Profile
 */
