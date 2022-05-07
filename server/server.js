const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
const bcrypt = require('bcrypt');

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

app.post('/api/user/login',(req,res)=>{
    // 1 -find the user,if good, -> move forward
    User.findOne({'email': req.body.email},(err,user)=>{
        if(err) res.status(400).send(err);
        if(!user) res.json({message:'User not found'})

        // 2 - compare the password with the HASHED password on the DB, -> move forward
        bcrypt.compare(req.body.password,user.password,(err,isMatch)=>{
            if(err) throw err;

            // 3 - send response
            res.status(200).send(isMatch)
        })
    })
    




})



const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`started on port ${port}`)
})