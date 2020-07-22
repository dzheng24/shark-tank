var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
const bizIdea = require("../models/bizIdea");

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
    profiePic: req.body.profiePic,
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash("error", err.message);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
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
router.get("/users/:id", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      req.flash("error", "we are brainstorming....");
      res.redirect("/");
    } else {
      bizIdea
        .find()
        .where("owner.id")
        .equals(foundUser._id)
        .exec((error, foundCard) => {
          if (error) {
            req.flash("error", "we are brainstorming....");
            res.redirect("/displage-page.ejs");
          } else {
            res.render("user_mgt/user_landing.ejs", {
              user: foundUser,
              bizIdeas: foundCard,
            });
          }
        });
    }
  });
});

module.exports = router;
