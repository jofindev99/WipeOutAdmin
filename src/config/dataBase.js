const mongoose = require('mongoose');
const dbURL = process.env.dbURL;

async function connectDb() {
  try {
    await mongoose.connect(dbURL);

    mongoose.connection.on('connected', () => {
      console.log(`✅ Connected to DB: ${mongoose.connection.name}`);
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ Mongoose disconnected');
    });

  } catch (error) {
    console.error('❌ Initial DB connection failed:', error);
    throw error;
  }
}

module.exports = { connectDb };
