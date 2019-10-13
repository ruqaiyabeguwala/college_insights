const express= require("express");
const router= express.Router();
const Student= require("../../model/Student");

//@route /
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
    res.status(500).json("Student not added");
}


})


//@route /
//@desc get all the students details
router.get("/",async (req,res)=>{
 try{   const student= await Student.find();
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


//@route /:branch/:year
//@desc get all the students of particular brnach and year
router.get("/:branch/:year",async (req,res)=>{

    try{ 
       const cur_year= new Date().getFullYear();
       const ad_year= cur_year- req.params.year ;
       const branch= req.params.branch;
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
router.get("/:id",async (req,res)=>{
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
   

   router.put("/:id", async (req,res)=>{
    
    try{
        const student= await Student.findById(req.params.id);
        
        student.attendance.unshift({present:req.body.present});
        let total=0;

        student.attendance.map(at=>{
                if( at.present)
                total++;
        })
        console.error(total)
     // student.push({total})
     await student.updateOne({total:total})
        await student.save();
       // await newSt.save()
        res.json(student);
        }

catch(err){
    console.error(err.message)
res.status(500).json({err,msg:"attendance not updated"});
}
})
  
module.exports= router;