import mongoose from 'mongoose'

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set');
  
  // Optimize connection with better settings
  await mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0 // Disable mongoose buffering
  });
  
  isConnected = true;
}

// MongoDB Client for NextAuth with optimized settings
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI!, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
const clientPromise = client.connect()

export { clientPromise }

// Database types for the application
export interface UserDocument {
  _id: string
  email: string
  password: string
  fullName?: string
  role: 'ADMIN' | 'MODERATOR' | 'USER' | 'GUEST'
  avatarUrl?: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserVerificationDocument {
  _id: string
  userId: string
  token: string
  expiresAt: Date
  createdAt: Date
}

export interface SessionDocument {
  _id: string
  userId: string
  expiresAt: Date
  createdAt: Date
}

export type Database = {
  users: UserDocument[]
  userVerifications: UserVerificationDocument[]
  sessions: SessionDocument[]
}