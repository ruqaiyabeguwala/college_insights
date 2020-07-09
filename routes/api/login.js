const express= require("express");
const router= express.Router();
const User= require("./../../model/User")
const bcrypt= require("bcrypt")
const passport= require('passport')

//google auth
//@apu /auth/google
//@desc login with google 
router.get("/google",passport.authenticate("google",{scope:['profile','email']}));
router.get("/google/callback",passport.authenticate("google"),(req,res)=>{
 res.redirect("/#/dashboard");
 console.log(req.session);
});

//google auth
//@apu /auth/facebook
//@desc login with facebook 
router.get("/facebook",passport.authenticate("facebook"));
router.get("/facebook/callback",passport.authenticate("facebook"),(req,res)=>{
  res.redirect("/#/dashboard");
});

router.get("/logout",(req,res)=>{
  req.session=null;
  res.send("logged - out")
});

//register 
//@api /auth/register
router.post("/register",async (req,res)=>{
  const {name,email,password,phone}=req.body;

try{
  //check if user already exists
let user= await User.findOne({email});
if(user){
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
  return res.json(newUser);
})
}
}
catch(err){
  console.error(err.message);
  res.status(500).json({errors:[err,{msg:"server error,Regsitration denied"}]})
}

});

//local login auth
//@api /auth/login
router.post("/login", passport.authenticate('local',{failureFlash:true}),(req,res)=>{ 
return res.json(req.user)
})
router.get("/api/get_user",(req,res)=>{
  if(!req.user)
  return res.status(401).json({errors:[{msg:"Not logged in, Please login first!"}]})
  res.json(req.user)
})

module.exports= router;