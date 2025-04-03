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
   
   app.listen(process.env.port,()=>{
      console.log( `server connected successfully`)
   })
})
.catch(err => console.log(err));

