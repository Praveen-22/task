const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
const Metrics = require('../../models/metricsSchema');
const auth = require("../../config/auth");
const passport = require('passport');
const fs = require('fs');
var conversion = require("phantom-html-to-pdf")();
var cron = require('node-cron');
var nodemailer = require('nodemailer');

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

cron.schedule('0 0 10 * * Mon', () => {    
        Metrics
        .find()
        .then(result=>{
                var mailFile = [];
                for(var i=0;i<result.length;i++){
                    mailFile.push({path:"client/public/pdffiles/"+result[i].pdfUrl});
                }
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'enter user mail id',
                        pass: 'enter password'
                    }
                });
                var mailOptions = {        
                    from: 'enter from address',
                    to: 'enter to address',
                    subject: 'Employee Weekly report on'+date,
                    text: 'Employee weekly report',
                    attachments: mailFile
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
        })
});

router.get('/test',(req,res)=> 
    res.json({msg: "Users Works!!"})
);

router.post('/findMetricsEach',passport.authenticate('jwt',{session:false}),(req,res) => {
    Metrics
    .find({empId : req.body.empId})
    .then(result=>{
        if(result.length===0){
            res.send("newone")
        }
        else{
            res.json({result})
        }
    })
})

router.post('/insertMetrics',passport.authenticate('jwt',{session:false}),(req,res) => {
    var text = "<div>"
    text += "<h1>EMPLOYEE BASIC DETAILS<h1><h3>"
    text += "<h3>Employee Name : "+ req.body.empName+"</h3>"
    text += "<h3>Employee Mail : "+ req.body.empMail+"</h3>"
    text += "<h3>Employee Phone : "+ req.body.empPhone+"</h3>"
    text += "<h3>Employee DOB : "+ req.body.empDOB+"</h3>"
    text += "<h3>Employee Gender : "+ req.body.empGender+"</h3>"
    text += "<h3>Employee Role : "+ req.body.empRole+"</h3>"
    text += "<h1>METRIC DETAILS<h1><h3>"
    text += "<h3>Punctuality</h3>"
    text += "<div style='width: 100%;background-color: #ddd;'>"
    text += "<div style='text-align: right;padding-top: 10px;padding-bottom: 10px;color: white;width: "+req.body.punctuality+"0%; background-color: #2196F3;'>"
    text += req.body.punctuality+"/10</div>"
    text += "</div>"
    text += "<h3>Execution</h3>"
    text += "<div style='width: 100%;background-color: #ddd;'>"
    text += "<div style='text-align: right;padding-top: 10px;padding-bottom: 10px;color: white;width: "+req.body.execution+"0%; background-color: #f44336;'>"
    text += req.body.execution+"/10</div>"
    text += "</div>"
    text += "<h3>Learning</h3>"
    text += "<div style='width: 100%;background-color: #ddd;'>"
    text += "<div style='text-align: right;padding-top: 10px;padding-bottom: 10px;color: white;width: "+req.body.learning+"0%; background-color: #808080;'>"
    text += req.body.learning+"/10</div>"
    text += "</div>"
    text += "<h3>Team Cooperation</h3>"
    text += "<div style='width: 100%;background-color: #ddd;'>"
    text += "<div style='text-align: right;padding-top: 10px;padding-bottom: 10px;color: white;width: "+req.body.teamCooperation+"0%; background-color: #c22d39;'>"
    text += req.body.teamCooperation+"/10</div>"
    text += "</div>"
    text += "<h3>Responsibility</h3>"
    text += "<div style='width: 100%;background-color: #ddd;'>"
    text += "<div style='text-align: right;padding-top: 10px;padding-bottom: 10px;color: white;width: "+req.body.responsibility+"0%; background-color: #4CAF50;'>"
    text += req.body.responsibility+"/10</div>"
    text += "</div>"
    text += "</div>"
    conversion({ html: text }, function(err, pdf) {
        var output = fs.createWriteStream(`client/public/pdfFiles/usermerrcis${req.body.empId}.pdf`)
          // since pdf.stream is a node.js stream you can use it
          // to save the pdf to a file (like in this example) or to
          // respond an http request.
        pdf.stream.pipe(output);
      });

    const metrics = new Metrics({
        empId: req.body.empId,
        punctuality: req.body.punctuality,
        execution: req.body.execution,
        learning: req.body.learning,
        teamCooperation: req.body.teamCooperation,
        responsibility: req.body.responsibility,
        pdfUrl: `usermerrcis${req.body.empId}.pdf`
    })

    Metrics
        .find({empId : req.body.empId})
        .then(result=>{
            if(result.length>0){
                var metDetails = {
                    punctuality : req.body.punctuality,
                    execution : req.body.execution,
                    learning : req.body.learning,
                    teamCooperation : req.body.teamCooperation,
                    responsibility : req.body.responsibility,
                    pdfUrl: `usermerrcis${req.body.empId}.pdf`
                }
                Metrics.findOneAndUpdate({empId : req.body.empId},{ $set: metDetails })
                .then(result=>{
                    Metrics
                    .find({empId : req.body.empId})
                    .then(result=>{
                        res.json({result :result,message:"sucess"})
                    })
                })
            }
            else{
                metrics
                .save()
                .then(result => {
                    Metrics
                    .find({empId : req.body.empId})
                    .then(result=>{
                        res.json({result :result,message:"sucess"})
                    })
                })
            }
    })
})

module.exports = router;