const express = require("express");
const router = express.Router();
const BizIdea = require("../models/bizIdea");
const middleware = require("../Middleware/middleware.js");
const middlewareObj = require("../Middleware/middleware.js");
const bizIdea = require("../models/bizIdea");

// show user the form
router.get("/create-card", middlewareObj.isLoggedIn, (req, res) => {
  res.render("create-card.ejs");
});
// create a card
router.post("/create-card", middlewareObj.isLoggedIn, (req, res) => {
  if (req.body.imageInput === "") {
    req.body.imageInput = undefined;
  }
  let newBizIdea = new BizIdea({
    title: req.body.titleInput,
    description: req.body.descriptionInput,
    image_url: req.body.imageInput,
    owner: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    },
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
router.get("/bizIdeas", (req, res, next) => {
  if (req.query.search) {
    BizIdea.find({ title: req.query.search }, (error, searchResult) => {
      if (error) {
        console.log(error);
      } else {
        res.json(searchResult);
      }
    });
  } else {
    BizIdea.find({}, (error, allBizIdeas) => {
      if (error) {
        console.log(error);
      } else {
        res.json(allBizIdeas);
      }
    });
  }
});

// details page
router.get("/details-page/:id", (req, res) => {
  bizIdea.findById(req.params.id, (err, foundIdeabyID) => {
    if (err) {
      req.flash("error", "Something went wrong.");
      res.redirect("/display-page");
    } else {
      res.render("details-page.ejs", { bizIdea: foundIdeabyID });
    }
  });
});

//edit business Idea
router.get("/:id/edit", middlewareObj.checkIdeaOwnership, (req, res) => {
  //find Idea ID in DB
  bizIdea.findById(req.params.id, (err, foundIdea) => {
    if (err) {
      req.flash("error", "Please Login in to edit card");
      res.redirect("/display-card");
    } else {
      //direct to edit page
      res.render("edit-card.ejs", { bizIdea: foundIdea });
    }
  });
});

//UPDATE ROUTE==========================
router.post("/details-page/:id", middleware.checkIdeaOwnership, (req, res) => {
  const { title, image_url, description } = req.body;
  const newBizIdea = {};
  if (title && title.length > 0) {
    newBizIdea.title = title;
  }

  if (description && description.length > 0) {
    newBizIdea.description = description;
  }

  if (image_url && image_url.length > 0) {
    newBizIdea.image_url = image_url;
  }

  bizIdea.findByIdAndUpdate(req.params.id, newBizIdea, (err) => {
    if (err) {
      res.redirect("/display-page");
    } else {
      req.flash("success", "post successfully updated.");
      res.redirect("/details-page/" + req.params.id);
    }
  });
});

//DELETE ROUTE===========================================
router.post(
  "/details-page/delete/:id",
  middleware.checkIdeaOwnership,
  (req, res) => {
    bizIdea.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
        res.redirect("/display-page");
      } else {
        req.flash("success", "post successfully deleted.");
        res.redirect("/display-page");
      }
    });
  }
);

module.exports = router;
