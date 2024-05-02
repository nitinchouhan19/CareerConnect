const express = require('express');
const cors = require('cors');
const router = require('./routes/RecruiterRoute.js')
const mongoose = require('mongoose');



const app = express();

require('dotenv').config();

app.use(express.json())
app.use(cors());


const PORT = process.env.PORT || 8000 ;
mongoose.connect(process.env.MONGODB_URL).then(() =>{
    console.log('Successfully connected to Mongodb.');
})

app.use(router);

app.listen(PORT,() =>{
    console.log(`Listening on ${PORT}`);
})