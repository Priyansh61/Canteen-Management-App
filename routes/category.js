const express=require('express');
const connection=require('../connect');
const router=express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let category=req.body;
    var query="insert into category (name) values (?)";
    connection.query(query,[category.name],(err,result)=>{
        if (!err){
            return res.status(200).json({
                message:"Category added successfully"
            });
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.get('/get',auth.authenticateToken,(req,res,next)=>{
    var query="select * from category";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json(err);
        }
    });
});


router.get('/patch',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let product =req.body;
    var query="update category set name=? where id=?";
    connection.query(query,[category.name],[category.id],(err,result)=>{
        if(!err){
            if (result.affectedRows==0){
                return res.status(404).json({message:"Product category not found"});
            }
            return res.status(200).json({message:"Product category updated successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    });
});

module.exports=router;



