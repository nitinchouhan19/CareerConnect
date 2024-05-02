const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        trim: true
    },
    password : String,
    role :{
        type : String ,
        enum : ['recruiter','applicant'],
        default : 'applicant'
    },
    recruiterInfo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'recruiter'
    },
    applicantInfo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'applicant'
    }
})

module.exports = mongoose.model('User', UserSchema);