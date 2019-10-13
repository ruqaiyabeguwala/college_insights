const express= require("express");
const router= express.Router();
const Student= require("./../../model/Student");

var ObjectId = require('mongoose').Types.ObjectId; 


//@api /search/:i\name
//@desc search a student by name
router.get("/:name",async (req,res)=>{

    try{ 
   const data= req.params.name
       const student= await Student.find({name:data});
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


//@api /search/:id
//@desc search a student by id
  /* router.get("/:id",async (req,res)=>{

    try{ 
    
       const student= await Student.find({_id:new ObjectId(req.params.id)});
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
*/


module.exports= router;