const express=require('express');
require('dotenv').config();
const {connectDb}=require('./config/dataBase')
const {errorHandler}=require('./middlewares/errorHandler')
const adminRouter=require('./routes/adminRouter')
const staffRouter=require('./routes/staffRouter')
const cookieParser = require('cookie-parser')


const app=express();


// middleware 

app.use(express.json()); //for body parsing 
app.use(cookieParser()); //for cookie parsing 

// routes

app.use('/admin',adminRouter);
app.use('/staff',staffRouter)



 
app.use(errorHandler);
connectDb()
.then(()=>{
   console.log("database connectd succesfully");
   
   app.listen(process.env.port,()=>{
      console.log( `server connected successfully`)
   })
})
.catch(err => console.log(err));
