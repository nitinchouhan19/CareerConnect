const mongoose = require('mongoose')

const ApplicationSchema = mongoose.Schema({
    jobId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Job',
    },
    applicantId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    resume :String ,
    sop : String ,
    dateofApplying : {
        type : Date ,
        default : Date.now,
    },
    status: {
        type: String,
        enum: [ "applied", "shortlisted", "accepted","rejected"],
        default: "applied",
        required: true,
    },
});


module.exports = mongoose.model('Application', ApplicationSchema);