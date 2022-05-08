const { User } = require('../models/user');
const jwt = require('jsonwebtoken');


let authenticate = (req,res,next) => {
    let token = req.cookies.auth;

    User.findByToken(token,(err,user)=>{
        if(!user) res.status(401).send({message:'Bad token'});
        req.email = user.email;
        req.token = token;
        next()
    }); 
    // jwt.verify(token,'supersecretpassword',(err,decode)=>{
    //     if(!decode) res.status(401).send({message:'Bad token'});
    //     next()
    // })
}

module.exports = {
    authenticate 
}