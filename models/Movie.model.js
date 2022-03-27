//  Add your code here
const mongoose = require('mongoose')


const movieSchema = new mongoose.Schema (
 {
title : {type : String}, 
genre: {type : String}, 
plot : {type : String},
cast : { type: [mongoose.Schema.Types.ObjectId], ref: "Celebrity" }
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie

/// autre version 
/* const {Schema, model} = require ('mongoose')

const movieSchema = new Schema (
    {
   title : {type : String}, 
   genre: {type : String}, 
   plot : {type : String},
   cast : { type: [Schema.Types.ObjectId], ref: "Celebrity" }
   })
   const Movie = model('Movie', movieSchema)
module.exports = Movie */