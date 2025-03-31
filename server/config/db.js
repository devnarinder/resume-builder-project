const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Get MongoDB URI from .env
const MONGO_URI = process.env.MONGO_URI;

// const uri = 'mongodb+srv://testAppUser:mkCSDucEd3E1syMJ@testing.cljj1pl.mongodb.net/?retryWrites=true&w=majority&appName=Testing';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;