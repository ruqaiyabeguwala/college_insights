const jwt= require( "jsonwebtoken")
const config = require( "config")

module.exports=(req,res,next)=>{
    if(!req.user){
        res.status(403).json({errors:[{msg:"Unauthorized"}]})
    }
    else{
        next();
    }
/*const token= req.header("x-auth-token");
if(!token)
return res.status(404).json("Token not found");
try{
const decoded= jwt.verify(token,config.get("jwtSecret"));
console.error("user decoded: "+decoded.user);
req.user= decoded.user;
next();
}
catch(err){
    console.error(err.message)
res.status(500).json([err,"Invalid token!"])
}*/
}