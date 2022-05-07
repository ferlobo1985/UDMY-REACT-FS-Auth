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


/// Routes

app.post('/api/user',(req,res)=>{
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });


    user.save((err,doc)=>{
        if(err) res.status(400).send(err);
        res.status(200).send(doc)
    })
})



const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`started on port ${port}`)
})