import { IAdmin } from '../db/model/Admin.model'

// Default permissions for different admin roles
export const DEFAULT_PERMISSIONS = {
  admin: ['read_enquiries', 'update_enquiries', 'read_admins'],
  super_admin: ['read_enquiries', 'update_enquiries', 'delete_enquiries', 'read_admins', 'create_admins', 'update_admins', 'delete_admins']
}

// Initialize default super admin
export const createDefaultSuperAdmin = (): IAdmin => {
  return {
    username: 'admin@datainyourself',
    password: 'password@datainyourself', // Change this in production!
    role: 'super_admin',
    createdAt: new Date().toISOString(),
    lastLogin: null,
    permissions: DEFAULT_PERMISSIONS.super_admin,
    isActive: true,
    email: 'admin@datainyourself.com'
  }
}

// Validate admin permissions
export const hasPermission = (admin: IAdmin, permission: string): boolean => {
  if (!admin.permissions) return false
  return admin.permissions.includes(permission)
}

// Check if admin is super admin
export const isSuperAdmin = (admin: IAdmin): boolean => {
  return admin.role === 'super_admin'
}

// Validate admin data
export const validateAdminData = (data: Partial<IAdmin>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!data.username || data.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters long')
  }
  
  if (!data.password || data.password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }
  
  if (data.role && !['admin', 'super_admin'].includes(data.role)) {
    errors.push('Role must be either "admin" or "super_admin"')
  }
  
  if (data.email && !isValidEmail(data.email)) {
    errors.push('Invalid email format')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Email validation helper
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Generate secure password (for development/testing)
export const generateSecurePassword = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
} 