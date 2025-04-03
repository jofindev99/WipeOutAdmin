const express=require("express");
require('dotenv').config();
const {connectDb}=require("./config/dataBase")


const app=express();

// middleware 

app.use(express.json()); //for body parsing 

// routes





connectDb()
.then(()=>{
   console.log("database connectd succesfully");
   const port =process.env.port
   app.listen(port,()=>{
      console.log( `server connected successfully listening  port ${port}`)
   })
})
.catch(err => console.log(err));

