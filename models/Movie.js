const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        max:[10,`ratings above 10 is not allowed`]
    },
    img_url:{
        type:String
    },
    release_date:{
        type:String,
        required:true
    }
})

const Movie = mongoose.model('Movie',movieSchema)

module.exports = Movie