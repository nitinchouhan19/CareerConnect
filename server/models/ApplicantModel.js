const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
    firstName : String ,
    lastName : String ,
    skills : [String] ,
    bio :String,
    address : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Address'
    }
})

module.exports = mongoose.model('Applicant',ApplicantSchema);