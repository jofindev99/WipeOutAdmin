const express=require("express");

const app=express();

// middleware 

app.use(express.json()); //for body parsing 




const port =3000

app.listen(port,()=>{
   console.log( "server connected successfully")
})