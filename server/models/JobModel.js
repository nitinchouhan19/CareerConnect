const mongoose = require('mongoose');
const ApplicationModel = require('./ApplicationModel');

const JobSchema = new mongoose.Schema({
    recruiterId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    uniqueId : Number ,
    title : String ,
    maxApplicant : Number ,
    jobDescription : String,
    location : String,
    vacancy : Number,
    dateOfPosting : {
        type : Date ,
        default : Date.now ,
    },
    skillsets : String,
    jobTag : {
        type : String ,
        enum : ['it','hr','sales','marketing','others'],
        default : 'it',
    },
    jobtype : {
        type : String ,
        enum : ['Remote','Work From Office','Hybrid'],
        default : 'Remote',
    },
    qualification : String,
    salary : String,
    yearOfExperience : String,
    recommend : [Number]
})


module.exports = mongoose.model('Job', JobSchema);