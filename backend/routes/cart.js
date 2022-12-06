const express=require('express');
const connection=require('../connect');
const router=express.Router();

var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post("/add/:id:user_id",auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    const cart=req.body;
    const sql="INSERT INTO cart (product_id,quantity,user_id) VALUES (?,1,?)";
    connection.query(sql,[cart.product_id,cart.quantity,cart.user_id],(err,result)=>{
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
}