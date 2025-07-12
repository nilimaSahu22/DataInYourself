// Enhanced Admin model with additional fields
export interface IAdmin {
  username: string
  password: string
  role?: 'super_admin' | 'admin'
  createdAt?: string
  lastLogin?: string
  permissions?: string[]
  isActive?: boolean
  email?: string
} 