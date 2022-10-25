const express=require('express');
const router=express.Router();
const connection=require('../connect')

let ejs=require('ejs');
let pdf=require('html-pdf');
let path=require('path');

var fs=require('fs');
var uuid=require('uuid');
var auth=require('../services//authentication');

router.post('/generateReport',auth.authenticateToken,(req,res)=>{
    const generateuuid=uuid.v1();
    const orderDetails=req.body;
    var ProductDetailsReport=JSON.parse(orderDetails.ProductDetails);

    var query="insert into bill (name,uuid,email,contactNo,paymentMethod,total,productDetails,CreatedBy,CreatedDate) values (?,?,?,?,?,?,?,?,?)";
    var params=[orderDetails.name,generateuuid,orderDetails.email,orderDetails.contactNo,orderDetails.paymentMethod,orderDetails.total,orderDetails.ProductDetails,req.user.email,orderDetails.CreatedDate];
    connection.query(query,params,(err,rows,fields)=>{
        if(!err){
            ejs.renderFile(path.join(__dirname,'','report.ejs'),{products:ProductDetailsReport,name:orderDetails.name,category:orderDetails.category,price:orderDetails.price,quantity:orderDetails.quantity,subTotal:orderDetails.subTotal},(err,data)=>{
                if(err){
                    return res.status(500).json(err);
                }
                else{
                    pdf.create(data).toFile("./generated_pdf/"+generateuuid+".pdf",function(err,data){
                        if(err){
                            console.log(err);
                            return res.status(500).json(err);
                        }
                        else{
                            return res.status(200).json({message:"Report Generated Successfully",path:data.filename});
                        }
                    });
                }
            })
        }
        else{
            console.log(err);
            return res.status(500).json(err);
        }
    })
});

router.post('getReport',auth.authenticateToken,(req,res)=>{
    const uuid=req.body.uuid;
    var path="./generated_pdf/"+uuid+".pdf";
    fs.readFile(path,(err,data)=>{
        if(err){
            return res.status(500).json(err);
        }
        else{
            return res.status(200).json({message:"Report Generated Successfully",path:path});
        }
    })
});


router.get('/getBills',auth.authenticateToken,(req,res)=>{
    var query="select * from bill";
    connection.query(query,(err,rows,fields)=>{
        if(!err){
            return res.status(200).json(rows);
        }
        else{
            return res.status(500).json(err);
        }
    })
});

router.delete('/delete/:id',auth.authenticateToken,(req,res)=>{
    var query="delete from bill where id=?";
    connection.query(query,[req.params.id],(err,rows,fields)=>{
        if(!err){
            return res.status(200).json({message:"Bill Deleted Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
});
module.exports=router;
