const express=require('express');
require('dotenv').config();
const {connectDb}=require('./config/dataBase')


const adminRouter=require('./routes/adminRouter')
const staffRouter=require('./routes/staffRouter')


const app=express();


// middleware 

app.use(express.json()); //for body parsing 

// routes

app.use('/admin',adminRouter);
 app.use('/staff',staffRouter)


   

   
 

connectDb()
.then(()=>{
   console.log("database connectd succesfully");
   
   app.listen(process.env.port,()=>{
      console.log( `server connected successfully`)
   })
})
.catch(err => console.log(err));
