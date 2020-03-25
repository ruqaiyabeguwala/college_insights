const express= require("express");
const router= express.Router();
const User= require("./../../model/User")
const jwt=require("jsonwebtoken")
const bcrypt= require("bcrypt")
const config= require("config")
const auth= require("./../../middleware/auth")
const passport= require('passport')

router.get("/api/get_user",(req,res)=>{
  res.send( req.user)
})


//google auth
//@apu /auth/google
//@desc login with google 
router.get("/google",passport.authenticate("google",{scope:['profile','email']}));
router.get("/google/callback",passport.authenticate("google"));
router.get("/facebook",passport.authenticate("facebook"));
router.get("/facebook/callback",passport.authenticate("facebook"));



//authenticate user
//@api /auth/
//@desc- check if authenticated
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
  const saltRounds=10
  bcrypt.hash(password, saltRounds,async function (err, hash) {
  if(err){
    console.error(err);
  }
  //save user
   const newUser= new User(
    {
      name: name,
      email: email,
      phone:phone,
      password: hash
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
      })
    }
      }
      catch(err){
        console.error(err.message);
        res.status(500).json({errors:[err,{msg:"server error,Regsitration denied"}]})
      }
      
      });

     
router.post("/login",async (req,res)=>{
try{
const uuser=await User.findOne({email:req.body.email});
if(!uuser)
return res.status(404).json({errors:[{msg:"User doesnot exist. Please sign up"}]})
else {
  bcrypt.compare(req.body.password,uuser.password,(err,result)=>{
      console.error("result",result)
      if(err){
        console.error( err);
      }  
      else if(result==true){
       const payload={
          user:{
            id:uuser.id
          }   
       }
   jwt.sign(payload,config.get("jwtSecret"),{expiresIn:100000},(err,token)=>{
            if (err)
            throw err;
            else
          return  res.json(token);
        })
    }

    else{
      return res.json("Incorrect password")
    }   
})
}
}
catch(err){
  console.error(err)
     res.status(500).json({errors:[{err,msg:"Error logging in!"}]})
}
})
module.exports= router;