const express= require("express");
const router= express.Router();
const Attendance= require("./../../model/Attendance");

//@api /attendance/
//@desc add a attendance
/*
router.post("/id", async (req,res)=>{
    try{

    const newAtt=new Attendance({
     student: req.params.id,
     data: 
    
    });
   const stud= await newStudent.save();
   res.json(stud);
}
catch(err){
    res.status(500).json("Student not added");
}
})

*/


//@api /attendance/
//@desc get all attendances
router.get("/", async (req,res)=>{

    try{ 
    
        const att= await Attendance.find()
        if(!att)
         return res.status(404).json({errors:[{msg:"No Attendaces found"}]})
    
         res.json(att)
     }
       catch(err)
     {
        console.error(err.message);
        res.status(401).json({errors:[{err,msg:"Error retrieving attendances"}]})
    }
   
})


module.exports= router;