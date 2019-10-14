const express= require("express");
const app= express();
const mongoose=require("mongoose");
const config= require("config")
const path=require("path")

const db="mongodb://localhost:27017/college_insights";
mongoose
.connect(config.get("mongoURI"),{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true})
.then(()=>console.log("mongoDB connected"))
.catch((err)=>console.log(err));

app.use(express.json({extended:false}))

if(process.env.NODE_ENV=='production'){
    //set static folder
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.use("/student",require("./routes/api/student"))

//for searches
app.use("/search",require("./routes/api/search"))


const PORT= process.env.PORT|| 5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
