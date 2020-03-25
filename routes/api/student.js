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
//@desc get all the students of particular branch and year
router.get("/:branch/:year",async (req,res)=>{

    try{ 
       const cur_year= new Date().getFullYear();
       const ad_year= cur_year- Number(req.params.year) ;
       const {branch}= req.params;
       //const ndate= new Date(date)
       const student= await Student.find({ $and:[{branch},{ad_year}]})
    /* const student= await Student.aggregate([
         {
$project:{
    _id:1,
    attendance:1
}
         },
         {
             $match:{
                 "date":ndate,"branch":branch,"ad_year":ad_year
             }
         },
         {
             $unwind:"$attendance"
         
        }
     ])*/
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

   //@route /student/use/detail/:id
//@desc get  student details of particular id
router.get("/use/detail/:id",async (req,res)=>{
    try{ 
        
        const student= await Student.findOne({_id:req.params.id});
       if(!student.length)
        return res.status(404).json({errors:[{msg:"No Students found"}]})
        res.json(student)
    }
      catch(err)
    {
       console.error(err.message);
       res.status(500).json({errors:[{err,msg:"Error retrieving students"}]})
   }
   })
   
 //@route /student/:id
//@desc set attendance
   router.put("/:id", async (req,res)=>{
   
    try{
        const student= await Student.findById(req.params.id);
        const {present,feedDate}=req.body;
        student.attendance.map((at)=>{

            if(at.date===feedDate)
            {
                return res.status(400).json({errors:[{msg:"Attendance already done for this date"}]})
            }
        })
        const date1 = new Date("11-01-2019"); 
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
        await student.save();
        let p=0;
      
       student.attendance.map(at=>{
           
{
                if( at.present){
                p++;
            }
            }    // total++;
        })
       
        const av=parseInt(p/Difference_In_Days*100)
        

     await student.updateOne({total:av})
    
      res.json(student);
        }

catch(err){
    console.error(err.message)
res.status(500).json({errors:[{err,msg:"attendance not updated"}]});
}
})

/*router.get("/sort/:term", async (req,res)=>{
    try{
       const student= Student.find.
    }
    catch(err){
        console.error(err.message)
    res.status(500).json({errors:[{err,msg:"Sorting not done"}]});
    }
})*/

   
module.exports= router;