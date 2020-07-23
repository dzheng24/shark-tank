const express = require("express");
const router = express.Router();
const BizIdea = require("../models/bizIdea");
const middleware = require("../Middleware/middleware.js");
const middlewareObj = require("../Middleware/middleware.js");
const bizIdea = require("../models/bizIdea");

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
    owner: { id: req.user._id, username: req.user.username },
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
router.get("/bizIdeas", (req, res) => {
  BizIdea.find({}, (error, allBizIdeas) => {
    if (error) {
      console.log(error);
    } else {
      res.json(allBizIdeas);
    }
  });
});

// details page
router.get("/details-page:id", (req, res) => {
  res.render("details-page.ejs");
  let id = req.params.id;
  console.log(id);
});
//edit business Idea
router.get("/:id/edit", middlewareObj.checkIdeaOwnership, (req, res) => {
  //find Idea ID in DB
  bizIdea.findById(req.params.id, (err, foundIdea) => {
    if (err) {
      req.flash("error", "Something went wrong.");
      res.redirect("/display-card");
    } else {
      //direct to edit page
      res.render("edit-card.ejs", { bizIdea: foundIdea });
    }
  });
});

router.get("/edit-card", (req, res) => {
  res.render("edit-card.ejs");
});

//DELETE ROUTE===========================================
router.delete("/:id", middleware.checkIdeaOwnership, (req, res) => {
  bizIdea.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/display-card");
    } else {
      req.flash("success", "post successfully deleted.");
      res.redirect("/display-card");
    }
  });
});

module.exports = router;
