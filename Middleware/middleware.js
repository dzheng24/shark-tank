const bizIdea = require("../models/bizIdea");
const middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please login");
  res.redirect("/login");
};

middlewareObj.checkIdeaOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.params.id);
    bizIdea.findById(req.params.id, function (err, foundIdea) {
      if (err) {
        req.flash("error", "post not found.");
        res.redirect("/display-page");
      } else {
        //does the user own the idea?
        if (foundIdea.owner.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You do not have permission to this post.");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to that.");
    res.redirect("back");
  }
};

module.exports = middlewareObj;
