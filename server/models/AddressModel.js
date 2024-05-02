const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    area : String ,
    city : String ,
    state : String ,
    zipcode : Number ,
});

module.exports = mongoose.model('Address' , AddressSchema); 