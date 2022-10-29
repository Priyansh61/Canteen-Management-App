const express=require("express");
const nodemailer=require("nodemailer");
const connection=require("../connect");
const router=express.Router();

const jwt =require("jsonwebtoken");
const { query } = require("express");
require('dotenv').config();

var auth = require("../services/authentication");
var checkRole = require("../services/checkRole");


router.post("/signup",(req,res)=>{
    let user=req.body;
    // user with given mail id
    var query="select email,password,role,status from user where email=?";
    connection.query(query,[user.email],(err,result)=>{
        // NO error
        if(!err){
            // If the result is empty, then the user is not registered
            if(result.length<=0){
                // Insert the user into the database
                var query="insert into user (name,contactNo,email,password,role,status) values (?,?,?,?,'user','false')";
                connection.query(query,[user.name,user.contactNo,user.email,user.password],(err,result)=>{
                    if(!err){
                        return res.status(200).json({
                            message:"User registered successfully"
                        });
                    }
                    else{
                        return res.status(500).json(err);
                    }
                }); 
            }
            else{
                // Complete response so email exists
                return res.status(400).json({
                    message:"Email already exists"
                });
            }
        }

        else{
            return res.status(500).json(err);
        }
    });
});

router.post('/login',(req,res)=>{
    let user=req.body;
    var query="select email,password,role,status from user where email=?";
    connection.query(query,[user.email],(err,result)=>{
        if(!err){
            if(result.length>0){
                if(result[0].password===user.password){
                    const response={email:result[0].email,role:result[0].role,status:result[0].status};
                    const token=jwt.sign(response,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'8h'});
                    return res.status(200).json({token:token});
                }
                else if(result[0].password!==user.password){
                    return res.status(400).json({
                        message:"Incorrect password"
                    });
                }
                else if(result[0].status==="false"){
                    return res.status(401).json({
                        message:"User not verified"
                    });
                }
                else {
                    return res.status(400).json({message:"Something a went wrong"});
                }
                }
            else{
                return res.status(400).json({
                    message:"Email not registered"
                });
            }
        }
        else{
            return res.status(500).json(err);
        }
    });
});

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    },
    from:process.env.EMAIL,
});

router.post('/forgotpassword',(req,res)=>{
    const user =req.body;
    var query="select email,password from user";
    connection.query(query,[user.email],(err,results)=>{
        if (!err){
            if(results.length <= 0){
                return res.status(400).json({
                    message:"Email not registered"
                });
            }
            else{
                var maiOptions={
                    from:process.env.EMAIL,
                    to:user.email,
                    subject:"Password reset mail",
                    html:'<p><b>Your Login Details</b></p><p><b>Email</b>:'+user.email+'</p><p><b>Password</b>:'+results[0].password+'</p>',
                };
                transporter.sendMail(maiOptions,function(err,info){
                    if(err){
                        console.log(err);
                        return res.status(500).json({
                            message:"Something went wrong"
                        });
                    }
                    else{
                        return res.status(200).json({
                            message:"Password sent to your mail"
                        });
                    }
                });
            }
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.get("/get",auth.authenticateToken,(req,res)=>{
    var query="select * from user";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.patch('/update',auth.authenticateToken,(req,res)=>{
    let user=req.body;
    var query="update user set name=?,email=?,contactNumber=?,status=? where id=?";
    connection.query(query,[user.name,user.email,user.contactNumber,user.status,user.id],(err,result)=>{
        if(!err){
            if (result.affectedRows==0){
                return res.status(404).json({
                    message:"User not found"
                });
            return res.status(200).json({
                message:"User updated successfully"
            });
        }
        else{
            return res.status(500).json(err);
        }
    }
});
}); 

router.get('/checkToken',(req,res)=>{
    const token=req.headers['authorization'];
    if(token==null){
        return res.status(401).json({message:"Token not found"});
    }
    else{
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err){
                return res.status(403).json({message:"Token not valid"});
            }
            else{
                return res.status(200).json({message:"Token valid"});
            }
        });
    }
});


router.post("/changePassword",auth.authenticateToken,(req,res)=>{
    let user=req.body;
    const email=res.locals.email;
    var query="Select * from user where email=? and password=?";
    connection.query(query,[email,user.oldPassword],(err,result)=>{
        if (!err){
            if (result.length <=0){
                return res.status(400).json({
                    message:"Incorrect password"
                });
            }
            else if (result[0].password==user.oldPassword){
                query="update user set password=? where email=?";
                connection.query(query,[user.newPassword,email],(err,result)=>{
                    if(!err){
                        return res.status(200).json({
                            message:"Password changed successfully"
                        });
                    }
                    else{
                        return res.status(500).json(err);
                    }
                }); 
            }
            else {
                return res.status(400).json({
                    message:"Something went wrong"
                });
            }
        }
        else {
            return res.status(500).json(err);
        }
    });
});



module.exports=router;