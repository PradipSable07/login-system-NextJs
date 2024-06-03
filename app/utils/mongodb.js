// utils/mongodb.js

import mongoose from 'mongoose';

const connection = {};

const connectToDatabase = async () => {
  try {
    if (connection.isConnected) {
      console.log('Using existing database connection');
      return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB Connected');
    return db
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Database connection error');
  }
};

export default connectToDatabase;
