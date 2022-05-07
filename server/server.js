const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();

const mongoUri = `mongodb+srv://francis8976:ieLUQHYjjQOtu3vG@cluster0.xs9gz.mongodb.net/myApp?retryWrites=true&w=majority`;
mongoose.connect(mongoUri);

/// MIDDLEWARE
app.use(bodyParser.json());


/// MODELS
const { User } = require('./models/user');




const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`started on port ${port}`)
})