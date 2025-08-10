const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Connection string - use environment variable if available
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blackbird-portal'
console.log('Using MongoDB URI:', MONGODB_URI)

// User schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  fullName: String,
  role: String,
  isVerified: Boolean,
  avatarUrl: String,
  createdAt: Date,
  updatedAt: Date
})

async function createNewAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Get or create User model
    const User = mongoose.models.User || mongoose.model('User', UserSchema)

    // Generate unique admin credentials
    const adminEmail = 'admin2@blackbird.com'
    const adminPassword = 'BlackbirdAdmin2024!'
    
    // Check if this admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail })
    
    if (existingAdmin) {
      console.log('⚠️  Admin user with this email already exists!')
      console.log('Email:', adminEmail)
      console.log('Updating password...')
      
      // Update existing admin user with new password
      const hashedPassword = await bcrypt.hash(adminPassword, 12)
      
      await User.findByIdAndUpdate(existingAdmin._id, {
        password: hashedPassword,
        fullName: 'Blackbird Administrator 2',
        role: 'ADMIN',
        isVerified: true,
        updatedAt: new Date()
      })
      
      console.log('✅ Admin user updated successfully!')
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(adminPassword, 12)
      
      const adminUser = new User({
        email: adminEmail,
        password: hashedPassword,
        fullName: 'Blackbird Administrator 2',
        role: 'ADMIN',
        isVerified: true,
        avatarUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      await adminUser.save()
      console.log('✅ New admin user created successfully!')
    }
    
    console.log('\n=== NEW ADMIN CREDENTIALS ===')
    console.log('Email:', adminEmail)
    console.log('Password:', adminPassword)
    console.log('Role: ADMIN')
    console.log('Status: Verified')
    console.log('==============================\n')
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

// Run the script
createNewAdminUser()