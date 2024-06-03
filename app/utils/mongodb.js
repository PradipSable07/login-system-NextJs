// utils/mongodb.js

import mongoose from 'mongoose';

const connection = {};

/**
 *  Connects to MongoDB using the MONGODB_URI environment variable. 
 * @returns  MongoDB client instance or throws an error if connection fails 
 */
const connectToDatabase = async () => {
  try {
    if (connection.isConnected) {
      console.log('Using existing database connection');
      return connection.db; // Return the MongoDB client instance
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
    connection.db = db; // Store the MongoDB client instance
    console.log('MongoDB Connected');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Database connection error');
  }
};

export default connectToDatabase;
