// require('../models/database')
const Category = require('../models/Category')
const Recipe = require('../models/Recipe')


/** 
 *  GET /
 * HomePage
*/

module.exports ={
   homepage: async (req, res)=>{
        try{
            const limitNumber = 5;
            const categories = await Category.find({}).limit(limitNumber)
            const latest = await Recipe.find({}).sort({_id:-1}).limit(limitNumber)
            // all recipe with category thai
            const thai = await Recipe.find({ 'category': 'Thai'}).limit(limitNumber)
            // all recipe with category america
            const american = await Recipe.find({ 'category': 'American'}).limit(limitNumber)
            // all recipe with category chinese
            const chinese = await Recipe.find({ 'category': 'Chinese'}).limit(limitNumber)


            const food = {latest, thai, american, chinese}
            res.render('home', { title: 'Cooking Blog - Home', categories, food, user: req.user })
        }
        catch(err){
            res.satus(500).send({ message: error.message || "Error Occured" })
        }
    },
    exploreCategories: async(req, res)=>{
        try{
            const limitNumber = 30;
            const categories = await Category.find({}).limit(limitNumber);
            res.render('categories', { title:'Cooking Blog- Categories', categories})
        }catch(error){
            res.satus(500).send({message: error.message || "Error Occured"})
        }
    },

    exploreCategoriesById:async (req, res)=>{
        try{
            let categoryId = req.params.id;
            const limitNumber = 20;
            const categoryById = await Recipe.find({'category':categoryId }).limit(limitNumber)
            res.render('categories', {title: 'Cooking Blog - Categories', categoryById})
        }
        catch(error){
            res.satus(500).send({ message: error.message || "Error Occured"})
        }
    },

    exploreRecipe: async(req, res)=>{
        try{
            let recipeId = req.params.id;
            const recipe = await Recipe.findById(recipeId);
            res.render('recipe', { title: 'Cooking Blog - Recipe', recipe } );

        }
        catch(error){
            res.satus(500).send({message:error.message || "Error Occured"})
        }
    },

    exploreLatest: async(req, res)=>{
        try{
            const limitNumber = 30
            const recipe = await Recipe.find({}).sort({_id:-1 }).limit(limitNumber);
            res.render('explore-latest', {title: 'Cooking Blog - Explore Latest', recipe })
        }
        catch(error){
            res.satus(500).send({message: error.message || "Error Occurred"})
        }
    },
// POST /search
// Search
    searchRecipe: async(req, res)=>{
        try {
            let searchTerm = req.body.searchTerm;
            let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
            res.render('search', { title: 'Cooking Blog - Search', recipe } );
          } catch (error) {
            res.satus(500).send({message: error.message || "Error Occured" });
        }
    },
    /**
     * GET /explore-random
     * Explore Random as JSON
     */
    exploreRandom: async(req, res)=>{
        try{
            let count = await Recipe.find().countDocuments();
            let random = Math.floor(Math.random() * count);
            let recipe = await Recipe.findOne().skip(random).exec();
            res.render('explore-random', {title:'Cooking Blog - Explore Latest', recipe});
        }
        catch(error){
            res.satus(500).send({ message: error.message || "Error Occured"})
        }
    }


}