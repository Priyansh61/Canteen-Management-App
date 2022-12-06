const express=require('express');
const connection=require('../connect');
const router=express.Router();

var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    const product=req.body;
    const sql="INSERT INTO product (name,img_url,price,description,category_id,status) VALUES (?,?,?,?,?,'1')";
    connection.query(sql,[product.name,product.img_url,product.price,product.description,product.category_id],(err,result)=>{
        if(!err){
            res.json({
                status:200,
                message:"Product added successfully"
            })
        }
        else{
            res.json({
                status:500,
                message:err
            })
    }
});
});

router.get('/get',(req,res,next)=>{
    var query="select p.img_url, p.id ,p.name, p.description , p.price , p.status, c.id as category_id, c.name as category_name from product as p INNER JOIN category as c where p.category_id = c.id"
    connection.query(query,(err,result)=>{
        if (!err){
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

router.get('/getbyID/:id',(req,res,next)=>{
    let id=req.params.id;
    var query="select * from product where id=?";
    connection.query(query,[id],(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.get('/search/:search',(req,res,next)=>{
    let search=req.params.search;
    var query = "select * from product where name like '%"+search+"%' and status=1";
    connection.query(query,[search],(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let product=req.body;
    var query="update product set name = ?, price = ?, category_id = ?, description = ?, status = 1 where id = ?";
    connection.query(query,[product.name,product.price,product.category_id,product.description,product.id],(err,result)=>{
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