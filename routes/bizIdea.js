const express = require("express");
const router = express.Router();
const BizIdea = require("../models/bizIdea");
const middleware = require("../Middleware/middleware.js");
const middlewareObj = require("../Middleware/middleware.js");

// show user the form
router.get("/create-card", (req, res) => {
  res.render("create-card.ejs");
});
// create a card
router.post("/create-card", middlewareObj.isLoggedIn, (req, res) => {
  console.log(req.body);
  let newBizIdea = new BizIdea({
    title: req.body.titleInput,
    description: req.body.descriptionInput,
    image_url: req.body.imageInput,
    // owner: { id: req.user._id },
  });
  BizIdea.create(newBizIdea, (error) => {
    if (error) {
      req.flash("error", error.message);
      res.redirect("/create-card");
    }
    res.redirect("/display-page");
  });
});

// view route
router.get("/display-page", (req, res) => {
  res.render("display-page.ejs");
});
//data route

//pull card from DB
router.get("/bizIdeas", middlewareObj.isLoggedIn, (req, res) => {
  BizIdea.find({}, (error, allBizIdeas) => {
    if (error) {
      console.log(error);
    } else {
      res.json(allBizIdeas);
    }
  });
});

module.exports = router;
