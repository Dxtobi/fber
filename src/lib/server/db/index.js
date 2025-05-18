import mongoose from 'mongoose';
import { MONGODB_URI } from '$env/static/private';

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB is already connected.');
    return;
  }
  try {
    const conn = await mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/cares-demo-1');
    console.log(`MongoDB Connected: ${conn.connection.host} --`, MONGODB_URI);
  } catch (error) {
    // @ts-ignore
    console.error(`Error: ${error?.message}`, MONGODB_URI);
    process.exit(1);
  }
};

export default connectDB;