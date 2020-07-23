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

//----------import schemas --------------
const User = require("./models/user.js");
const BizIdea = require("./models/bizIdea");

//-------MongoDB----------
const URI = process.env.DB_URI;
mongoose.connect(URI);

//------use package----
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(expressSanitizer());
app.set("view-engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(cookieParser("secret"));

//config passport -----------

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

const bizIdeaRoutes = require("./routes/bizIdea.js");
app.use(bizIdeaRoutes);

// ----- Routes -----
app.get("/", (req, res) => {
  res.render("welcome-page.ejs");
});

//------------PORT listening------------
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
