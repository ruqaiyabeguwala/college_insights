const express= require("express");
const router= express.Router();
const Student= require("../../model/Student");
const _ = require("lodash")

//@route /student/
//@desc add the student to db 
router.post("/", async (req,res)=>{
    try{
    const newStudent=new Student({
       name:req.body.name,
       branch: req.body.branch,
       ad_year:req.body.ad_year
          });
   const stud= await newStudent.save();
   res.json(stud);
}
catch(err){
    res.status(500).json({errors:[{err,msg:"Student not added"}]});
}


})


//@route /
//@desc get all the students details
router.get("/",async (req,res)=>{
 try{   const student= await Student.find();
    if(!student)
     return res.status(404).json({errors:[{msg:"No Students found"}]})
      const count= await Student.countDocuments();
   var avg=await Student.aggregate([
       
        {
          $group: {
            _id: null,
            avgAttendance: { $avg: "$total" }
          }
        }
      ])
      const [avgAttendance]= avg;
      avg=avgAttendance.avgAttendance;
     
     //const sum= _.sum(student.attendance);
   
    // const averagePercent= sum.sumAttendance/count;
     res.json({student,count,avg})
 }
   catch(err)
 {
    console.error(err.message);
    res.status(401).json({errors:[{err,msg:"Error retrieving students"}]})
}
})


//@route /:branch/:year
//@desc get all the students of particular brnach and year
router.get("/:branch/:year",async (req,res)=>{

    try{ 
       const cur_year= new Date().getFullYear();
       const ad_year= cur_year- req.params.year ;
       const {branch}= req.params;
       const student= await Student.find({ $and:[{branch},{ad_year}]
});
       if(!student)
        return res.status(404).json({errors:[{msg:"No Students found"}]})
   
        res.json(student)
    }
      catch(err)
    {
       console.error(err.message);
       res.status(401).json({errors:[{err,msg:"Error retrieving students"}]})
   }
   })

   //@route /student/:id
//@desc get  student details of particular id
router.get("auth/:id",async (req,res)=>{
    try{   const student= await Student.findById(req.params.id);
       if(!student)
        return res.status(404).json({errors:[{msg:"No Students found"}]})
   
        res.json(student)
    }
      catch(err)
    {
       console.error(err.message);
       res.status(401).json({errors:[{err,msg:"Error retrieving students"}]})
   }
   })
   
 //@route /student/:id
//@desc set attendance
   router.put("/:id", async (req,res)=>{
    const {present,feedDate}=req.body;
    try{
        const student= await Student.findById(req.params.id);
        student.attendance.map((at)=>{
            if(at.date===feedDate)
            {
                return res.status(400).json("Attendance already done for this date")
            }
        })
        const date1 = new Date("12-01-2019"); 
        const date2= new Date(feedDate)
        
// To calculate the time difference of two dates 
var Difference_In_Time = date2.getTime() - date1.getTime(); 
  
// To calculate the no. of days between two dates 
var Difference_In_Days =parseInt( Difference_In_Time / (1000 * 3600 * 24)); 
     //   console.error("differnce in days"+Difference_In_Days);
        const att={
            present:present,
            date:feedDate
        } 
     
        student.attendance.unshift(att);
        let p=0;
        await student.save();
        student.attendance.map(at=>{
           
{
                if( at.present){
                p++;
            }
            }    // total++;
        })
       
        const av=parseInt(p/Difference_In_Days*100)
        
     await student.updateOne({total:av})
       
       // await newSt.save()
        res.json(student.attendance);
        }

catch(err){
    console.error(err.message)
res.status(500).json({errors:[{err,msg:"attendance not updated"}]});
}
})



   
module.exports= router;