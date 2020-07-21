var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

/***
 * sign up logic
 */
//show sign up form
router.get("/register", (req, res) => {
  res.render("user_mgt/register.ejs");
});

//handling user sign up
router.post("/register", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        req.flash("success", "Welcome to SharkTank! " + user.username);
        res.redirect("/");
      });
    }
  });
});

/**
 * login logic
 */
//show login form
router.get("/login", (req, res) => {
  res.render("user_mgt/login.ejs");
});

//login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/display-page",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

//====================
//LOGOUT ROUTES
//====================
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged Out!");
  res.redirect("/");
});

/**
 * user profile page
 */
router.get("/users/:id", function (req, res) {
  User.findById(req.params.id, function (err, foundUser) {
    if (err) {
      req.flash("error", "Something went wrong");
      res.redirect("/");
    } else {
      j_food
        .find()
        .where("author.id")
        .equals(foundUser._id)
        .exec(function (err, foodFound) {
          if (err) {
            req.flash("error", "Something went wrong...");
            res.redirect("/j_foods");
          } else {
            res.render("users/show", { user: foundUser, j_foods: foodFound });
          }
        });
    }
  });
});

module.exports = router;
