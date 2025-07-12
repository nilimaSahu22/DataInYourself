import { createDefaultSuperAdmin } from '../utils/adminUtils'

// This function can be called to initialize the default super admin
// You can call this endpoint once to set up your first admin
export const initializeDefaultAdmin = async (KV: any) => {
  try {
    const defaultAdmin = createDefaultSuperAdmin()
    
    // Check if admin already exists
    const existingAdmin = await KV.get(`admin:${defaultAdmin.username}`)
    if (existingAdmin) {
      console.log('Default admin already exists')
      return { success: false, message: 'Default admin already exists' }
    }
    
    // Create the default admin
    await KV.put(`admin:${defaultAdmin.username}`, JSON.stringify(defaultAdmin))
    
    console.log('Default admin created successfully')
    return { 
      success: true, 
      message: 'Default admin created successfully',
      admin: {
        username: defaultAdmin.username,
        role: defaultAdmin.role,
        email: defaultAdmin.email
      }
    }
  } catch (error) {
    console.error('Failed to create default admin:', error)
    return { success: false, message: 'Failed to create default admin', error }
  }
} 