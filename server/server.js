const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const app = express();
const bcrypt = require('bcrypt');

const mongoUri = `mongodb+srv://francis8976:ieLUQHYjjQOtu3vG@cluster0.xs9gz.mongodb.net/myApp?retryWrites=true&w=majority`;
mongoose.connect(mongoUri);

/// MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
const {authenticate} = require('./middleware/auth')


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
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(err) res.status(400).send(err);
            if(!isMatch) res.json({message:'Bad password'})


            user.generateToken((err,user)=>{
                if(err) res.status(400).send(err);
                res.cookie('auth',user.token).send('ok')
            })
        })
    })
})


app.get('/api/books',authenticate,(req,res)=>{
    // let token = req.cookies.auth;

    // User.findByToken(token,(err,user)=>{
    //     if(err) throw err;
    //     if(!user) res.status(401).send({message:'Bad token'});
    //     res.status(200).send(user)
    // });  
    res.status(200).send(req.email)
})


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`started on port ${port}`)
})