const express = require("express");
const router = express.Router();
const BizIdea = require("../models/bizIdea");

// show user the form
router.get("/create-card", (req, res) => {
  res.render("create-card.ejs");
});
// create a card
router.post("/create-card", (req, res) => {
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
// show the card

module.exports = router;
