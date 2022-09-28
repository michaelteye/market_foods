const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: "field required"
    },
    description:{
        type:String,
        required:'field required'
    },
    email:{
        type:String,
        required:'field required'
    },
    ingredients:{
        type: Array,
        required: 'This field is required'
    },
    category:{
        type:String,
        enum:['Thai','American', 'Chinese', 'Mexican', 'Indian'],
        required: 'field required'
    },
    image:{
        type: String,
        required: 'field required'
    }
})

recipeSchema.index({ name: 'text', description:'text'})

module.exports = mongoose.model('Recipe', recipeSchema);