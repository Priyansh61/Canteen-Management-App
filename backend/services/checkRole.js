require("dotenv").config;

function checkRole(req,res,next){
    console.log(res.locals.role)
    if(res.locals.role===process.env.USERNAME)  {
        res.sendStatus(401);
    }
    else{
        console.log("Role is admin");
        next();
    }
};

module.exports={checkRole:checkRole};    