import mongoose from 'mongoose';

const MONGODB_URI = process.env.NEXT_PUBLIC_URI_CONNECTION_STRING;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the NEXT_PUBLIC_URI_CONNECTION_STRING environment variable inside .env.local"
  );
}

var global = typeof global !== "undefined" ? global : {};
mongoose.set('strictQuery', true);
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;


