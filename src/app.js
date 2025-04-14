const express=require('express');
require('dotenv').config();
const {connectDb}=require('./config/dataBase')
const {errorHandler}=require('./middlewares/errorHandler')
const adminRouter=require('./routes/adminRouter')
const staffRouter=require('./routes/staffRouter')
const cookieParser = require('cookie-parser')


const app=express();


// Middleware for parsing URL-encoded data (from form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing the request body as JSON
app.use(express.json()); 

// Middleware for parsing cookies from incoming requests
app.use(cookieParser()); 




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
