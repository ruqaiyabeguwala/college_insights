const mongoose= require("mongoose");


const attendanceSchema= new mongoose.Schema({
   student:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"student"
   },
   data:[
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
   ]
     
   
})

module.exports= Attendance= mongoose.model("attendance",attendanceSchema)
