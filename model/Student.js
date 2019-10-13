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
    attendance:[
        {
            date:{
                type:Date,
                default: Date.now
            } ,
            present:{
                type:Boolean,
                default: false
            } 
        }
    ],
    total:{
        type:String,
        default:0
    }
})

module.exports= Student= mongoose.model("student",studentSchema)