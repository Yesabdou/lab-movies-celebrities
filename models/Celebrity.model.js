//  Add your code here
const mongoose = require('mongoose')


const celebSchema = new mongoose.Schema (
 {
     name : String, 
occupation: String, 
catchPhrase : String
})

const Celebrity = mongoose.model('Celebrity', celebSchema)
module.exports = Celebrity