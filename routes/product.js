const express=require('express');
const connection=require('../connect');
const router=express.Router();

var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let product=req.body;
    var query="insert into product (name,price,category_id,description,status) values (?,?,?,?,?)";
    connection.query(query,[product.name,product.price,product.category_id,product.description,product.status],(err,result)=>{
        if (!err){
            return res.status(200).json({
                message:"Product added successfully"
            });
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.get('/get',auth.authenticateToken,(req,res,next)=>{
    var query="select * from product";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.get("/getbyCategory/:id",auth.authenticateToken,(req,res,next)=>{
    let id=req.params.id;
    var query="select * from product where category_id=? and status=1";
    connection.query(query,[id],(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.get('/getbyID/:id',auth.authenticateToken,(req,res,next)=>{
    let id=req.params.id;
    var query="select * from product where id=?";
    connection.query(query,[id],(err,result)=>{
        if(!err){
            return res.status(200).json(result[0]);
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let product=req.body;
    var query="update product set name = ?, price = ?, category_id = ?, description = ?, status = ? where id = ?";
    connection.query(query,[product.name,product.price,product.category_id,product.description,product.status,product.id],(err,result)=>{
        if(!err){
            if (result.affectedRows==0){
                return res.status(404).json({message:"Product id not found"});
            }
            return res.status(200).json({message:"Product updated successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:id',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let id=req.params.id;
    var query="delete from product where id=?";
    connection.query(query,[id],(err,result)=>{
        if(!err){
            if (result.affectedRows==0){
                return res.status(404).json({message:"Product id not found"});
            }
            return res.status(200).json({message:"Product deleted successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.patch("/updateStatus",auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let product=req.body;
    var query="update product set status=? where id=?";
    connection.query(query,[product.status,product.id],(err,result)=>{
        if(!err){
            if (result.affectedRows==0){
                return res.status(404).json({message:"Product id not found"});
            }
            return res.status(200).json({message:"Product status updated successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    });
});


module.exports=router;