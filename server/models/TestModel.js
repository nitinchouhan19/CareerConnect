const mongoose = require('mongoose');

const TestScehma = new mongoose.Schema({
    title  : String,
    jobId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'job',
    },
    eligibleCandidates : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    description : String,
    timing : Number,
})

module.exports = mongoose.model('Test', TestScehma);