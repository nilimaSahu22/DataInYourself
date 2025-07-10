import mongoose from 'mongoose'

export const connectDB = (uri?: string) => {
  const MONGODB_URI = uri || 'mongodb://localhost:27017/datainyourself'
  
  return mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('MongoDB connected')
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err)
    })
} 