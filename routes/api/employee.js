const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
const Employee = require('../../models/employeeSchema');
const auth = require("../../config/auth");
const passport = require('passport');

router.get('/test',(req,res)=> 
    res.json({msg: "Users Works!!"})
);

router.post('/insertEmployee',passport.authenticate('jwt',{session:false}),(req,res) => {
    
    const employee = new Employee({
        empName: req.body.empName,
        empGender: req.body.empgender,
        empMail: req.body.empEmail,
        empPhone: req.body.empPhone,
        empRole: req.body.empRole,
        empDOB: req.body.empDOB,
    })
     employee
        .save()
        .then(result => {
            res.json({message:true})
        })
})

router.get('/fetchEmployee',passport.authenticate('jwt',{session:false}),(req,res) => {
    Employee
    .find()
    .then(result=>{
        res.json({result:result})
    })
    // res.send("sucess");
})

router.post('/fetchEmployeeEach',passport.authenticate('jwt',{session:false}),(req,res) => {
    // console.log(req);
    Employee
    .find({_id : req.body.empId})
    .then(result=>{
        res.json({result:result})
    })
    // res.send(req.body);
})
module.exports = router;