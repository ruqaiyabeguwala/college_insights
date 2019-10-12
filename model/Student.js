const mongoose= require("mongoose");


const studentSchema= new mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    ad_year:{
        type:Number,
        required:true
    },
})

module.exports= Student= mongoose.model("student",studentSchema)