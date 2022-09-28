const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')
const logger = require("morgan")
const session = require('express-session');
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser');
const flash = require("express-flash")
const mongoose = require("mongoose");
const passport = require("passport")
const routes = require("./routes/recipeRoutes.js")
const connectDB = require('./config/database');





// Use .env file in config folder
require("dotenv").config({ path: "./config/.env"})

// Passport config
require("./config/passport")(passport);

// Connect To for views
connectDB()

// Using EJS for views
app.set('layout', './layouts/main')
app.set("view engine", "ejs");

// Static Folder
app.use(express.urlencoded({extended: true }))
app.use(express.static("public"))
app.use(expressLayouts)

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: false,
  resave: false,
  store:MongoStore.create({mongoUrl: process.env.DB_STRING})
}));

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Use flash messages for errors, info, etc
app.use(flash())
// Logging
app.use(logger("dev"));

app.use('/', routes)
app.listen(process.env.PORT, ()=>{
    console.log("Server is running, you better catch it")
})