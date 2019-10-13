const express= require("express");
const app= express();
const mongoose=require("mongoose");
const config= require("config")

const db="mongodb://localhost:27017/college_insights";
mongoose
.connect(config.get("mongoURI"),{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true})
.then(()=>console.log("mongoDB connected"))
.catch((err)=>console.log(err));

app.use(express.json({extended:false}))

app.use("/student",require("./routes/api/student"))

//for searches
app.use("/search",require("./routes/api/search"))


const PORT= process.env.PORT|| 5000;
app.listen(5000,()=>console.log(`server running on port ${PORT}`));
