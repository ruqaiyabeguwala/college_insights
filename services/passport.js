const passport = require('passport')
const googleStrategy= require('passport-google-oauth20').Strategy;
const facebookStrategy=require('passport-facebook').Strategy;
const config= require('config')
const User= require("./../model/User");
const localStrategy=require("passport-local").Strategy;
const bcrypt= require("bcrypt")

passport.use(new googleStrategy({
    clientID:config.get("googleID"),
    clientSecret:config.get("googleSecret"),
    callbackURL:'/auth/google/callback'
},async (accessToken,refreshToken,profile,done)=>{
    try{
        //check if user already exists
      let user= await User.findOne({socialID:profile.id});
      if(user){
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
        done(err,false)
    }
})
);

passport.use(new facebookStrategy({
   clientID: config.get("facebookID"),
   clientSecret:config.get("facebookSecret"), 
   callbackURL: "/auth/facebook/callback"
},async (accessToken,refreshToken,profile,done)=>{
    try{
   let user= await User.findOne({socialID:profile.id});
      if(user){
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
      done(err,false)
    }
}
))


passport.use(new localStrategy(
    {
    usernameField: 'email',
    passwordField: 'password'
   // passReqToCallback: true
},
    async (email,password,done)=>{
     try{
     const user= await User.findOne({ email });
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (err) {
                  return done(err)
                }
                if (!isValid) {
                  return done(null, false,{message:"invalid password"})
                }
                return done(null, user)
              })
          
        }
        catch(err){
               console.log(err);
               done(err)
        }
      }));


passport.serializeUser((user,done)=>{
done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
const user=await User.findById(id);
done(null,user);
})