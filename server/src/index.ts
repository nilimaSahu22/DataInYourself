import { Hono } from 'hono'
import { IInquiryData } from './db/model/InquiryData.model'
import { IAdmin } from './db/model/Admin.model'
import { initializeDefaultAdmin } from './setup/initAdmin'
import { validateAdminData } from './utils/adminUtils'

// Define environment variable and KV types
// Use 'any' for KVNamespace for now, or use generated CloudflareBindings if available
type Bindings = {
  KV: any // Cloudflare KVNamespace
}

function generateUUID() {
  // crypto.randomUUID is available in Workers, but fallback for local dev
  const gCrypto = (globalThis as any).crypto
  if (typeof gCrypto !== 'undefined' && gCrypto.randomUUID) {
    return gCrypto.randomUUID()
  }
  // Fallback: not cryptographically secure
  return Math.random().toString(36).substr(2, 9)
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS middleware
app.use('*', async (c, next) => {
  // Handle preflight requests
  if (c.req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    })
  }
  
  await next()
  
  // Add CORS headers to all responses
  c.header('Access-Control-Allow-Origin', '*')
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
})

// Middleware to check KV binding
app.use('*', async (c, next) => {
  if (!c.env.KV) {
    return c.json({ error: 'KV binding not found' }, 500)
  }
  await next()
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Create Inquiry
app.post('/inquiry', async (c) => {
  try {
    const { name, phoneNumber, emailId, subject } = await c.req.json()
    if (!name || !phoneNumber || !emailId || !subject) {
      return c.json({ error: 'Missing required fields' }, 400)
    }
    const id = generateUUID()
    const inquiry: IInquiryData = {
      id,
      name,
      phoneNumber,
      emailId,
      subject,
      called: false,
      description: '',
    }
    await c.env.KV.put(`inquiry:${id}`, JSON.stringify(inquiry))
    return c.json({ message: 'Inquiry saved successfully', id }, 201)
  } catch (err) {
    const error = err as Error
    return c.json({ error: 'Failed to save inquiry', details: error.message }, 500)
  }
})

// Enhanced Admin login with lastLogin tracking
app.post('/login', async (c) => {
  try {
    const { username, password } = await c.req.json()
    if (!username || !password) {
      return c.json({ error: 'Username and password are required' }, 400)
    }
    
    const adminStr = await c.env.KV.get(`admin:${username}`)
    if (!adminStr) {
      return c.json({ error: 'Admin not found' }, 404)
    }
    
    const admin: IAdmin = JSON.parse(adminStr)
    
    // Check if admin is active
    if (admin.isActive === false) {
      return c.json({ error: 'Account is deactivated' }, 403)
    }
    
    if (admin.password !== password) {
      return c.json({ error: 'Invalid password' }, 401)
    }
    
    // Update lastLogin timestamp
    admin.lastLogin = new Date().toISOString()
    await c.env.KV.put(`admin:${username}`, JSON.stringify(admin))
    
    // Return admin data without password
    const { password: _, ...adminData } = admin
    return c.json({ 
      message: 'Login successful', 
      admin: adminData 
    })
  } catch (err) {
    const error = err as Error
    return c.json({ error: 'Login failed', details: error.message }, 500)
  }
})

// Initialize default admin (call this once to set up your first admin)
app.post('/admin/init', async (c) => {
  try {
    const result = await initializeDefaultAdmin(c.env.KV)
    if (result.success) {
      return c.json(result, 201)
    } else {
      return c.json(result, 200)
    }
  } catch (err) {
    const error = err as Error
    return c.json({ error: 'Failed to initialize admin', details: error.message }, 500)
  }
})

// Create new admin (super admin only)
// app.post('/admin/create', async (c) => {
//   try {
//     const { username, password, role, email, permissions } = await c.req.json()
    
//     // Validate input data
//     const validation = validateAdminData({ username, password, role, email })
//     if (!validation.isValid) {
//       return c.json({ error: 'Validation failed', details: validation.errors }, 400)
//     }
    
//     // Check if admin already exists
//     const existingAdmin = await c.env.KV.get(`admin:${username}`)
//     if (existingAdmin) {
//       return c.json({ error: 'Admin with this username already exists' }, 409)
//     }
    
//     const admin: IAdmin = {
//       username,
//       password,
//       role: role || 'admin',
//       createdAt: new Date().toISOString(),
//       lastLogin: null,
//       permissions: permissions || ['read_inquiries', 'update_inquiries'],
//       isActive: true,
//       email: email || null
//     }
    
//     await c.env.KV.put(`admin:${username}`, JSON.stringify(admin))
    
//     // Return admin data without password
//     const { password: _, ...adminData } = admin
//     return c.json({ 
//       message: 'Admin created successfully', 
//       admin: adminData 
//     }, 201)
//   } catch (err) {
//     const error = err as Error
//     return c.json({ error: 'Failed to create admin', details: error.message }, 500)
//   }
// })

// Get all admins
// app.get('/admin/list', async (c) => {
//   try {
//     const list = await c.env.KV.list({ prefix: 'admin:' })
//     const admins: Omit<IAdmin, 'password'>[] = []
    
//     for (const key of list.keys) {
//       const value = await c.env.KV.get(key.name)
//       if (value) {
//         const admin: IAdmin = JSON.parse(value)
//         // Remove password from response
//         const { password, ...adminData } = admin
//         admins.push(adminData)
//       }
//     }
    
//     return c.json({ admins })
//   } catch (err) {
//     const error = err as Error
//     return c.json({ error: 'Failed to fetch admins', details: error.message }, 500)
//   }
// })

// Get specific admin by username
// app.get('/admin/:username', async (c) => {
//   try {
//     const { username } = c.req.param()
//     const adminStr = await c.env.KV.get(`admin:${username}`)
    
//     if (!adminStr) {
//       return c.json({ error: 'Admin not found' }, 404)
//     }
    
//     const admin: IAdmin = JSON.parse(adminStr)
//     const { password, ...adminData } = admin
    
//     return c.json({ admin: adminData })
//   } catch (err) {
//     const error = err as Error
//     return c.json({ error: 'Failed to fetch admin', details: error.message }, 500)
//   }
// })

// Update admin
// app.patch('/admin/:username', async (c) => {
//   try {
//     const { username } = c.req.param()
//     const updateFields = await c.req.json()
    
//     const adminStr = await c.env.KV.get(`admin:${username}`)
//     if (!adminStr) {
//       return c.json({ error: 'Admin not found' }, 404)
//     }
    
//     const admin: IAdmin = JSON.parse(adminStr)
//     const allowedFields = ['role', 'permissions', 'isActive', 'email']
    
//     for (const key of allowedFields) {
//       if (key in updateFields) {
//         (admin as any)[key] = updateFields[key]
//       }
//     }
    
//     await c.env.KV.put(`admin:${username}`, JSON.stringify(admin))
    
//     const { password, ...adminData } = admin
//     return c.json({ 
//       message: 'Admin updated successfully', 
//       admin: adminData 
//     })
//   } catch (err) {
//     const error = err as Error
//     return c.json({ error: 'Failed to update admin', details: error.message }, 500)
//   }
// })

// Change admin password
// app.patch('/admin/:username/password', async (c) => {
//   try {
//     const { username } = c.req.param()
//     const { currentPassword, newPassword } = await c.req.json()
    
//     if (!currentPassword || !newPassword) {
//       return c.json({ error: 'Current password and new password are required' }, 400)
//     }
    
//     const adminStr = await c.env.KV.get(`admin:${username}`)
//     if (!adminStr) {
//       return c.json({ error: 'Admin not found' }, 404)
//     }
    
//     const admin: IAdmin = JSON.parse(adminStr)
    
//     if (admin.password !== currentPassword) {
//       return c.json({ error: 'Current password is incorrect' }, 401)
//     }
    
//     admin.password = newPassword
//     await c.env.KV.put(`admin:${username}`, JSON.stringify(admin))
    
//     return c.json({ message: 'Password updated successfully' })
//   } catch (err) {
//     const error = err as Error
//     return c.json({ error: 'Failed to update password', details: error.message }, 500)
//   }
// })

// Delete admin
// app.delete('/admin/:username', async (c) => {
//   try {
//     const { username } = c.req.param()
    
//     const adminStr = await c.env.KV.get(`admin:${username}`)
//     if (!adminStr) {
//       return c.json({ error: 'Admin not found' }, 404)
//     }
    
//     await c.env.KV.delete(`admin:${username}`)
    
//     return c.json({ message: 'Admin deleted successfully' })
//   } catch (err) {
//     const error = err as Error
//     return c.json({ error: 'Failed to delete admin', details: error.message }, 500)
//   }
// })

// Get all inquiries
app.get('/admin/getall', async (c) => {
  try {
    // List all keys with prefix 'inquiry:'
    const list = await c.env.KV.list({ prefix: 'inquiry:' })
    const inquiries: IInquiryData[] = []
    for (const key of list.keys) {
      const value = await c.env.KV.get(key.name)
      if (value) inquiries.push(JSON.parse(value))
    }
    return c.json({ inquiries })
  } catch (err) {
    const error = err as Error
    return c.json({ error: 'Failed to fetch inquiries', details: error.message }, 500)
  }
})

// Update inquiry by id
app.patch('/admin/update/:id', async (c) => {
  try {
    const { id } = c.req.param()
    const updateFields = await c.req.json()
    const allowedFields = ['description', 'name', 'phoneNumber', 'emailId', 'called']
    const inquiryStr = await c.env.KV.get(`inquiry:${id}`)
    if (!inquiryStr) {
      return c.json({ error: 'Inquiry not found' }, 404)
    }
    const inquiry: IInquiryData = JSON.parse(inquiryStr)
    for (const key of allowedFields) {
      if (key in updateFields) {
        (inquiry as any)[key] = updateFields[key]
      }
    }
    await c.env.KV.put(`inquiry:${id}`, JSON.stringify(inquiry))
    return c.json({ message: 'Inquiry updated successfully', inquiry })
  } catch (err) {
    const error = err as Error
    return c.json({ error: 'Failed to update inquiry', details: error.message }, 500)
  }
})

export default app

