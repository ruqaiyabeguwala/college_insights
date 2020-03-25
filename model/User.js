const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
   default:null

},
socialID:{
    type:String,
    default:null
},
phone:{
    type:Number,
    default:null
},
password:{
    type:String,
    min:4,
    default:null
}
})

/*userSchema.methods.comparePassword=(password,cb)=>{
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if (err) return cb(err);
        cb(null, isMatch);
    })
}*/

module.exports= User= mongoose.model("user",userSchema)