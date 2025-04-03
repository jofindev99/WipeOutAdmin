const mongoose = require('mongoose');
const dbURL=process.env.dbURL

async function connectDb() {
    await mongoose.connect(dbURL);
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }

  module.exports= {connectDb}

  
  