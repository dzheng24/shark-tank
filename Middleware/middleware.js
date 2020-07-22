const bizIdea = require("../models/bizIdea");
const middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please login");
  res.redirect("/login");
};

module.exports = middlewareObj;
