const express = require('express')
const recipeController = require('../controllers/recipeController')
const homeController = require("../controllers/home")
const router = express.Router()
const authController = require("../controllers/auth")
const { ensureAuth, ensureGuest } = require("../middlewares/auth")

router.get("/login", authController.getLogin)
router.post("/login", authController.postLogin)
router.get("/logout", authController.logout)
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get('/', homeController.getIndex)
router.get('/home', ensureAuth, recipeController.homepage)
router.get('/categories', recipeController.exploreCategories)
router.get('/categories/:id',recipeController.exploreCategoriesById)
router.get('/recipe/:id', recipeController.exploreRecipe)
router.get('/explore-latest', ensureAuth, recipeController.exploreLatest)
router.get('/explore-random', ensureAuth,recipeController.exploreRandom)
router.post('/search',recipeController.searchRecipe);

module.exports = router