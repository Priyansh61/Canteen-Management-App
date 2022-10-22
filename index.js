const express=require('express');
var cors = require('cors');
const connection=require('./connect');
const app=express();
const userRoute=require('./routes/user');

const categoryRoute=require('./routes/category');
const productRoute=require('./routes/product');

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/category',categoryRoute);
app.use("/product",productRoute);

module.exports=app;