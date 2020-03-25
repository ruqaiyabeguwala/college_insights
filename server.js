const express= require("express");
const app= express();
const mongoose=require("mongoose");
const config= require("config")
const path=require("path")
const cookieSession= require("cookie-session");
const passport= require("passport")
require("./services/passport");


const db="mongodb://localhost:27017/collegeInsight";
mongoose
.connect(db,{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true})
.then(()=>console.log("mongoDB connected"))
.catch((err)=>console.log(err));

app.use(cookieSession({
    maxAge:60*60*1000,
    keys:[config.get("jwtSecret")]
}))
app.use(passport.initialize());
app.use(passport.session());
app.use("/student",require("./routes/api/student"))
//for searches
app.use("/search",require("./routes/api/search"))
app.use("/auth",require("./routes/api/login"))


const PORT= process.env.PORT|| 5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));

