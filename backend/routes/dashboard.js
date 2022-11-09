const express=require('express')
const connection=require('../connect')
const router=express.Router()

var auth=require('../services//authentication');

router.get('/details',auth.authenticateToken,(req,res)=>{
    var categoryCount;
    var productCount;
    var billCount;
    var query="select count(*) as categoryCount from category";
    connection.query(query,(err,rows,fields)=>{
        if(!err){
            categoryCount=rows[0].categoryCount;
            var query="select count(*) as productCount from product";   
            connection.query(query,(err,rows,fields)=>{
                if(!err){
                    productCount=rows[0].productCount;
                    var query="select count(*) as billCount from bill";
                    connection.query(query,(err,rows,fields)=>{
                        if(!err){
                            billCount=rows[0].billCount;
                            return res.status(200).json({
                                categoryCount:categoryCount,
                                productCount:productCount,
                                billCount:billCount
                            });
                        }
                        else{
                            return res.status(500).json(err);
                        }
                    });
                }
                else{
                    return res.status(500).json(err);
                }
            });
        }
        else{
            return res.status(500).json(err);
        }
    });
});
module.exports=router;




