// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI; //process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('The MONGODB_URI environment variable must be defined.');
}

function isConnected() {
  return mongoose.connection.readyState === 1;
}
async function dbConnect() {
  try {
    // if(!isConnected) {
      await mongoose.connect(MONGODB_URI as string);
    // } else {
    //   console.log('Already connected')
    // }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Handle the error as needed
  }
}

async function dbDisconnect() {
    try {
      if(isConnected()) {
        await mongoose.disconnect();
      } else {
        console.log('Already Disconnected')
      }
    } catch (error) {
      console.error('MongoERROR: ', error);
      process.exit(1);
    }
  }

export { dbConnect, dbDisconnect }