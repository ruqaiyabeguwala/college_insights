const express= require("express");
const app= express();
const mongoose=require("mongoose");

const PORT= process.env.PORT|| 5000;
app.listen(5000,()=>console.log(`server running on port ${PORT}`));
