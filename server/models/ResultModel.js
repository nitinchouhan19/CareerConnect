const mongoose = require('mongoose');


const ResultSchema = new mongoose.Schema({
    applicantId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    testId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Test',
    },
    total_marks : Number,
    marks_obtained : Number,
})

module.exports = mongoose.model('Result' , ResultSchema)