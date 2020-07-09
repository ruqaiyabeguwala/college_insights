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
 try{   
  /*  if(!req.user){
        return res.status(401).json("Unauthorized. please login first")
    } */
    const student= await Student.find();
    if(!student)
     return res.status(404).json({errors:[{msg:"No Students found"}]})
     res.json(student);
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
       const student= await Student.find({ $and:[{branch},{ad_year}]})
   
      if(!student)
        return res.status(404).json({errors:[{msg:"No Students found"}]})
       
     return res.json(student)
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
        
        const student= await Student.findById(req.params.id);
       if(!student)
        return res.status(404).json({errors:[{msg:"No Students found"}]})
       return res.json(student)
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
        const {present,feedDate}=req.body;
        const att={
            present:present,
            date:feedDate
        }
      
      const student= await Student.findById(req.params.id)
        const upd= student.attendance.filter((at)=>at.date==feedDate);
        
        if(upd.length){
            let result= await Student.updateOne(
                {_id:req.params.id,"attendance.date":feedDate},
                {
                    $set:{"attendance.$.present":present}
                },
                    {upsert:true}
                )
        }
        else{
          let result=  await Student.updateOne(
                {_id:req.params.id},
                { $addToSet:{attendance:att}})
        }
       
        const date1 = new Date("11-01-2019"); 
        const date2= new Date(feedDate)
        
// To calculate the time difference of two dates 
var Difference_In_Time = date2.getTime() - date1.getTime(); 
  
// To calculate the no. of days between two dates 
var Difference_In_Days =parseInt( Difference_In_Time / (1000 * 3600 * 24)); 
      //  student.attendance.unshift(att);
     //   await student.save();
    
  const av=(student.total+(present?1:0)/Difference_In_Days).toFixed(2);
     await student.updateOne({total:av})
     const st= await Student.findById(req.params.id);
      res.json(st);
      
        }

catch(err){
    console.error(err.message)
res.status(500).json({errors:[{err,msg:"attendance not updated"}]});
}
})


   
module.exports= router;