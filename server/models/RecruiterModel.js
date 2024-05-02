const mongoose = require('mongoose');

const RecruiterSchema = new mongoose.Schema({
    companyName : String,
    bio :String,
    address : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Address'
    }
})

module.exports = mongoose.model('Recruiter',RecruiterSchema);