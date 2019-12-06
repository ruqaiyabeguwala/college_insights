const express= require("express");
const router= express.Router();
const User= require("./../../model/User")
const jwt=require("jsonwebtoken")
const bcrypt= require("bcrypt")
const config= require("config")
const auth= require("./../../middleware/auth")


//authenticate user
router.get("/", auth,async (req,res)=>{
  try{
const user= await User.find({_id:req.user.id}).select("-password");
res.json(user);
  }
  catch(err){
    console.error(err.message);
    res.status(500).json({errors:[{err,msg:"Error authenticating user!"}]})
  }
})

router.post("/register",async (req,res)=>{
    const {name,email,password,phone}=req.body;
  
  try{
    //check if user already exists
  let user= await User.findOne({email});
  if(user){
    console.error("user exists")
    return res.status(400).json({errors:[{msg:"user already exists"}]});
  }
  else{
  //bcrypt
  /*const saltRounds=10
  bcrypt.hash(password, saltRounds,async function (err,   hash) {
  */
  //save user
   const newUser= new User(
    {
      name: name,
      email: email,
      phone:phone,
      password: password
    }
     );
    await newUser.save();
    const payload={
        user:
        {
          id:newUser.id,
        }
      };
      jwt.sign(payload,config.get('jwtSecret'),
        {expiresIn:360000},
        (err,token)=>{
          if(err) throw err;
          res.json({token})
        }
      )
      //res.json({newUser,msg:"User succesfully registered"});
     // })
      }
      }
      catch(err){
        console.error(err.message);
        res.status(500).json({errors:[err,{msg:"server error,Regsitration denied"}]})
      }
      
      });

router.post("/login",async (req,res)=>{
try{
const uuser=await User.findOne({email:req.body.email,password:req.body.password});
if(!uuser)
return res.status(404).json({errors:[{msg:"User doesnot exist"}]})
else {
 // res.json(uuser)
  /*  bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(result==true){
          */
       //  console.error("id: "+uuser.id)
        const payload={
          user:{
            id:uuser.id
          }
          
        
       }
   jwt.sign(payload,config.get("jwtSecret"),{expiresIn:10000000},(err,token)=>{
            if (err)
            throw err;
            else
            res.json(token);
        })
    }
  /*  else{
      return res.json("Incorrect password")
    }
    //})*/
}
//}

catch(err){
     res.status(500).json({errors:[{err,msg:"Error logging in!"}]})
}
})
module.exports= router;