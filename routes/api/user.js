const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
const md5 = require('md5')
const User = require('../../models/userSchema');
const auth = require("../../config/auth");
const passport = require('passport');

router.get('/test',(req,res)=> 
    res.json({msg: "Users Works!!"})
);

router.get('/insertUser',(req,res)=> {
const user = new User({
    username: "admin",
    password: md5("password1234"),
})
User
.find({ username : "admin"})
.then(result => {
    if(result.length>0){
        console.log("inserted")
    }
    else{
        user
        .save()
        .then(result => {
            res.send("success")
        })
    }
})
})

router.post('/fetchUser',(req,res)=> {
User
.find({ username : req.body.username,password:md5(req.body.password)})
.then(result => {
    if(result.length>0){
        const payload = {
            id : result[0]._id,
            username : result[0].username
        };

        jwt.sign(payload, keys.secretKey, {expiresIn:3600},(err,token)=>{
            const decode = jwt_decode(token)
            res.json({
                success : true,
                token: token,
                decode : decode
            })
        })
    }
    else{
        res.send("wrong")
    }
})
})

// router.get('/checkAuthenticate',passport.authenticate('jwt',{session:false}),(req,res) => {
//     res.send("success  from auth")
// })
router.get('/checkAuthenticate',auth,(req,res) => {
    res.send("success")
})
module.exports = router;