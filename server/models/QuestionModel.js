const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    testId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Test'
    },
    question : String,
    options : [String],
    answer : String,
    points : Number,
})

module.exports = mongoose.model('Question',QuestionSchema)