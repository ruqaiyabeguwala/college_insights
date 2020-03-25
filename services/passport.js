const passport = require('passport')
const googleStrategy= require('passport-google-oauth20').Strategy;
const facebookStrategy=require('passport-facebook').Strategy;
const config= require('config')
const User= require("./../model/User");

passport.use(new googleStrategy({
    clientID:config.get("googleID"),
    clientSecret:config.get("googleSecret"),
    callbackURL:'/auth/google/callback'
},async (accessToken,refreshToken,profile,done)=>{
    try{
        console.error(profile)
        //check if user already exists
      let user= await User.findOne({socialID:profile.id});
      if(user){
          console.error("user already exists");
        done(null,user)
      }
      else{
      
      //save user
       const newUser= new User(
        {
          name: profile.displayName,
          email:profile.emails[0].value,
          socialID:profile.id
        }
         );
        await newUser.save();
        done(null,newUser);
    
}
    }
    catch(err){
        console.error(err);
        res.status(400).json({errors:[err,{msg:"error adding to db"}]});
    }
})
);

passport.use(new facebookStrategy({
   clientID: config.get("facebookID"),
   clientSecret:config.get("facebookSecret"), 
   callbackURL: "/auth/facebook/callback"
},async (accessToken,refreshToken,profile,done)=>{
    try{
   console.log(profile); 
   let user= await User.findOne({socialID:profile.id});
      if(user){
          console.error("user already exists");
        done(null,user)
      }
      else{
      
      //save user
       const newUser= new User(
        {
          name: profile.displayName,
    //  email:profile.emails[0].value,
          socialID:profile.id
        }
         );
        await newUser.save();
        done(null,newUser);
    
}
    }
    catch(err){
        console.error(err);
        res.status(400).json({errors:[err,{msg:"error adding to db"}]});
    }
}
))

passport.serializeUser((user,done)=>{
done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
const user=await User.findById(id);
done(null,user);
})