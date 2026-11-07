import mongoose from 'mongoose';

/**
 * Connect to MongoDB Atlas
 */
const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!connUri) {
      console.warn('⚠️ MONGO_URI is not defined in environment variables. Database persistence is disabled.');
      return;
    }

    const conn = await mongoose.connect(connUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Do not exit the process immediately so server can still serve health checks
  }
};

export default connectDB;
