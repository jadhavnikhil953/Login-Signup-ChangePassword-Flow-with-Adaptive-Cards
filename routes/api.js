// Dependencies
var express = require('express');
var router = express.Router();
var CryptoJS = require('../node_modules/crypto-js');
const Users = require('../backend/models/users');

// Routes

router.post('/getSessionInfo',(req, res) => {
    let utcTime = new Date().toUTCString();
    let dateObj = new Date(utcTime);
    let newDateInNumber = dateObj.setMinutes(dateObj.getMinutes() + 60);
    let processedTime = new Date(newDateInNumber).toUTCString();
        if(req.body.email){
            Users.find({uname:req.body.email}, (error, result) => {
                if(error) {
                    return res.status(500).send(error);
                }
                let sessionID = result[0]['sessionID'];
                let sessionExpireBy = result[0]['sessionExpireBy'];
                if(req.body.sessionID === sessionID && (new Date(utcTime)<= new Date (sessionExpireBy))){
                        var user = {
                            email:result[0]['uname'],
                            firstName:result[0]['firstName'],
                            lastName:result[0]['lastName'],
                            sessionID:result[0]['sessionID']
                        }
                        res.setHeader("sessionID", result[0]['sessionID'])
                        Users.findByIdAndUpdate(result[0]._id,{$set:{sessionExpireBy:processedTime}},{new:true} , (error, result) => {
                            if(error) {
                                return res.status(500).send(error);
                            }
                        });
                    return res.status(200).send({success:true, message:"sessionID restored", user:user});
                }
                else{
                    return res.status(200).send({success:false, message:"sessionID expired"})
                } 
            });
        }
        else{
            return res.status(200).send({success:false, message:"sessionID not found"})
        }
 });

router.post('/login',(req, res) => {
    let utcTime = new Date().toUTCString();
    let dateObj = new Date(utcTime);
    let newDateInNumber = dateObj.setMinutes(dateObj.getMinutes() + 60);
    let processedTime = new Date(newDateInNumber).toUTCString();
    var uname = req.body.uname;
    var savedPw = "";

    var bytes  = CryptoJS.AES.decrypt(req.body.cipher, "MySecretKey");
    var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    var hash = CryptoJS.HmacSHA256(originalPassword, "decryptThisBitch");
    var hashedString = hash.toString(CryptoJS.enc.Base64);

    var user = {
        email:"",
        firstName:"",
        lastName:"",
        sessionID:""
    }

    Users.find({uname:uname}, (error, result) => {
        if(error) {
            return res.send(error);
        }
        if(result.length == 0){
            return res.send({ success:false,message:"User not found"});
        }
        savedPw = result[0].pw;
        if(hashedString == savedPw){
            user.email = result[0].uname;
            user.firstName = result[0].firstName;
            user.lastName = result[0].lastName;
            let randomString = "mySessionID" + ""+ Math.floor(Math.random() * 1000);
            var hashSessionID = CryptoJS.HmacSHA256(randomString, "decryptThisBitch");
            var hashedSessionIDString = hashSessionID.toString(CryptoJS.enc.Base64);
            Users.findByIdAndUpdate(result[0]._id,{$set:{sessionID:hashedSessionIDString,sessionExpireBy:processedTime}},{new:true} , (error, result) => {
                if(error) {
                    return res.status(500).send(error);
                }
                user.sessionID = hashedSessionIDString;
                return res.send({success:true,message:"Login Successful",user:user});
            });
        }
        else{
            return res.send({success:false,message:"Incorrect Password"});
        }
    });
 });

 router.post('/signUp',(req, res) => {
    //console.log(req.body);
    Users.find({uname:req.body.uname}, (error, result) => {
       if(error) {
           return res.status(500).send(error);
       }
       if(result.length>0)
       {
        res.send({success:false,message:"User already exists"});
       }
       else{
        //insert into Users table
        var bytes  = CryptoJS.AES.decrypt(req.body.cipher, "MySecretKey");
        var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        var hash = CryptoJS.HmacSHA256(originalPassword, "decryptThisBitch");
        var hashedString = hash.toString(CryptoJS.enc.Base64);
        Users.insertMany({uname:req.body.uname,firstName:req.body.firstName,lastName:req.body.lastName,pw:hashedString,isTempPw:true}, (error, result) => {
            res.send({success:true,message:"User created successfully"});
        });
       }
   });
 });

 router.post('/changePassword',(req, res) => {
    //console.log(req.body);
    Users.find({uname:req.body.uname}, (error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        
        if(result.length>0){
            var bytes  = CryptoJS.AES.decrypt(req.body.cipher, "MySecretKey");
            var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
            var hash = CryptoJS.HmacSHA256(originalPassword, "decryptThisBitch");
            var hashedString = hash.toString(CryptoJS.enc.Base64);

            Users.findOneAndUpdate({uname:req.body.uname},{pw:hashedString} , (error, result) => {
                if(error) {
                    return res.status(500).send(error);
                }
                res.send({success:true,message:"Password changed successfully"});
            })
        }
        else{
            res.send({success:false,message:"User not found"});
        }
        
    });
 });

// Return router
module.exports = router;