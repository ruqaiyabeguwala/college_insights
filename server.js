const express= require("express");
const app= express();
const mongoose=require("mongoose");
const config= require("config")
const path=require("path")
const cookieSession= require("cookie-session");
const passport= require("passport")
require("./services/passport");
const bodyParser= require("body-parser")
const cors= require("cors")
const flash=require("connect-flash")


const db="mongodb://localhost:27017/collegeInsight";
mongoose
.connect(db,{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true})
.then(()=>console.log("mongoDB connected"))
.catch((err)=>console.log(err));

app.use(flash())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieSession({
    maxAge:60*60*1000,
    keys:[config.get("jwtSecret")]
}))
app.use(passport.initialize());
app.use(passport.session());



//app.use(cors("Access-Control-Allow-Origin":"true"))

app.use("/student",require("./routes/api/student"))
//for searches
app.use("/search",require("./routes/api/search"))
app.use("/auth",require("./routes/api/login"))


const PORT= process.env.PORT|| 5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));

