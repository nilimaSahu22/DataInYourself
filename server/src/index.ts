import { Hono } from 'hono'
import { IInquiryData } from './db/model/InquiryData.model'
import { IAdmin } from './db/model/Admin.model'
import { initializeDefaultAdmin } from './setup/initAdmin'
import { generateJWT } from './utils/jwtUtils'
import { authenticateJWT } from './middleware/authMiddleware'

// Define environment variable and KV types
// Use 'any' for KVNamespace for now, or use generated CloudflareBindings if available
type Bindings = {
  KV: any // Cloudflare KVNamespace
  JWT_SECRET: string
  PLUNK_API_KEY: string
  NOTIFICATION_EMAIL: string
}

// Extend Hono context to include user property
type Variables = {
  user: {
    username: string
    role: string
    iat: number
    exp: number
  }
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

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

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
    const { name, phoneNumber, emailId, subject, dateTime } = await c.req.json()
    if (!name || !phoneNumber || !emailId || !subject || !dateTime) {
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
      dateTime,
    }
    await c.env.KV.put(`inquiry:${id}`, JSON.stringify(inquiry))
    
    // Send email notification
    try {
      const emailBody = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Course Inquiry</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
            .content { padding: 30px; }
            .section { margin-bottom: 25px; }
            .section h2 { color: #ff6b35; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #ff6b35; padding-bottom: 5px; }
            .detail-row { display: flex; margin-bottom: 10px; align-items: center; }
            .label { font-weight: bold; min-width: 80px; color: #555; }
            .value { flex: 1; color: #333; }
            .highlight { background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ff6b35; margin: 20px 0; }
            .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
            .urgent { color: #dc3545; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 New Course Inquiry Received</h1>
            </div>
            <div class="content">
              <div class="section">
                <h2>📋 Student Details</h2>
                <div class="detail-row">
                  <span class="label">Name:</span>
                  <span class="value"><strong>${name}</strong></span>
                </div>
                <div class="detail-row">
                  <span class="label">Phone:</span>
                  <span class="value"><a href="tel:${phoneNumber}" style="color: #ff6b35; text-decoration: none;">${phoneNumber}</a></span>
                </div>
                <div class="detail-row">
                  <span class="label">Email:</span>
                  <span class="value"><a href="mailto:${emailId}" style="color: #ff6b35; text-decoration: none;">${emailId}</a></span>
                </div>
                <div class="detail-row">
                  <span class="label">Course:</span>
                  <span class="value"><strong>${subject}</strong></span>
                </div>
                <div class="detail-row">
                  <span class="label">Date:</span>
                  <span class="value">${new Date(dateTime).toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <div class="highlight">
                <p class="urgent">⚠️ Action Required</p>
                <p>Please contact this student as soon as possible to discuss their interest in the <strong>${subject}</strong> course.</p>
              </div>
            </div>
            <div class="footer">
              <p>This inquiry was automatically generated from the DataInYourself website.</p>
              <p>© ${new Date().getFullYear()} DataInYourself - Rudriva Technology</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      await fetch('https://api.useplunk.com/v1/send', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${c.env.PLUNK_API_KEY}`
        },
        body: JSON.stringify({
          "to": c.env.NOTIFICATION_EMAIL,
          "name": "Data In Yourself",
          "subject": `New Course Inquiry: ${subject}`,
          "body": emailBody
        })
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }
    
    return c.json({ message: 'Inquiry saved successfully', id }, 201)
  } catch (err) {
    const error = err as Error
    return c.json({ error: 'Failed to save inquiry', details: error.message }, 500)
  }
})

// Create Contact Form Inquiry
app.post('/contact', async (c) => {
  try {
    const { firstName, lastName, email, phone, course, message } = await c.req.json()
    
    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return c.json({ error: 'Missing required fields: firstName, lastName, email, phone' }, 400)
    }
    
    const id = generateUUID()
    const fullName = `${firstName} ${lastName}`.trim()
    const subject = course ? `Contact Form - ${course}` : 'Contact Form Inquiry'
    const description = message 
      ? `User Message: ${message}` 
      : `Interested in: ${course || 'General inquiry'}`
    
    const inquiry: IInquiryData = {
      id,
      name: fullName,
      phoneNumber: phone,
      emailId: email,
      subject,
      called: false,
      description,
      dateTime: new Date().toISOString(),
    }
    
    await c.env.KV.put(`inquiry:${id}`, JSON.stringify(inquiry))
    
    // Send email notification
    try {
      const emailBody = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
            .content { padding: 30px; }
            .section { margin-bottom: 25px; }
            .section h2 { color: #ff6b35; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #ff6b35; padding-bottom: 5px; }
            .detail-row { display: flex; margin-bottom: 10px; align-items: center; }
            .label { font-weight: bold; min-width: 100px; color: #555; }
            .value { flex: 1; color: #333; }
            .message-box { background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px; padding: 15px; margin: 15px 0; }
            .message-box p { margin: 0; font-style: italic; color: #666; }
            .highlight { background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ff6b35; margin: 20px 0; }
            .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
            .urgent { color: #dc3545; font-weight: bold; }
            .course-badge { background-color: #ff6b35; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="section">
                <h2>👤 User Details</h2>
                <div class="detail-row">
                  <span class="label">Name:</span>
                  <span class="value"><strong>${fullName}</strong></span>
                </div>
                <div class="detail-row">
                  <span class="label">Phone:</span>
                  <span class="value"><a href="tel:${phone}" style="color: #ff6b35; text-decoration: none;">${phone}</a></span>
                </div>
                <div class="detail-row">
                  <span class="label">Email:</span>
                  <span class="value"><a href="mailto:${email}" style="color: #ff6b35; text-decoration: none;">${email}</a></span>
                </div>
                <div class="detail-row">
                  <span class="label">Course:</span>
                  <span class="value">
                    ${course ? `<span class="course-badge">${course}</span>` : '<em>Not specified</em>'}
                  </span>
                </div>
                <div class="detail-row">
                  <span class="label">Date:</span>
                  <span class="value">${new Date().toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              ${message ? `
              <div class="section">
                <h2>💬 User Message</h2>
                <div class="message-box">
                  <p>"${message}"</p>
                </div>
              </div>
              ` : ''}
              
              <div class="highlight">
                <p class="urgent">⚠️ Action Required</p>
                <p>Please contact <strong>${fullName}</strong> as soon as possible to discuss their inquiry.</p>
                ${course ? `<p>They are interested in the <strong>${course}</strong> course.</p>` : ''}
              </div>
            </div>
            <div class="footer">
              <p>This contact form submission was automatically generated from the DataInYourself website.</p>
              <p>© ${new Date().getFullYear()} DataInYourself - Rudriva Technology</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      await fetch('https://api.useplunk.com/v1/send', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${c.env.PLUNK_API_KEY}`
        },
        body: JSON.stringify({
          "to": c.env.NOTIFICATION_EMAIL,
          "name": "Data In Yourself",
          "subject": `New Contact Form: ${fullName} - ${course || 'General Inquiry'}`,
          "body": emailBody
        })
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }
    
    return c.json({ 
      message: 'Contact form submitted successfully', 
      id,
      inquiry: {
        name: fullName,
        email,
        phone,
        course,
        message
      }
    }, 201)
  } catch (err) {
    const error = err as Error
    return c.json({ error: 'Failed to submit contact form', details: error.message }, 500)
  }
})

// Enhanced Admin login with JWT token generation
app.post('/login', async (c) => {
  try {
    const { username, password } = await c.req.json()
    if (!username || !password) {
      return c.json({ error: 'Username and password are required' }, 400)
    }
    
    const adminStr = await c.env.KV.get(`admin:${username}`)
    if (!adminStr) {
      console.log('Admin not found for username:', username)
      return c.json({ error: 'Admin not found. Please initialize the default admin first by calling /admin/init endpoint.' }, 404)
    }
    
    console.log('Admin data found, parsing...')
    const admin: IAdmin = JSON.parse(adminStr)
    console.log('Admin parsed successfully:', { username: admin.username, role: admin.role, isActive: admin.isActive })
    
    // Check if admin is active
    if (admin.isActive === false) {
      return c.json({ error: 'Account is deactivated' }, 403)
    }
    
    console.log('Checking password...')
    if (admin.password !== password) {
      console.log('Password mismatch')
      return c.json({ error: 'Invalid password' }, 401)
    }
    console.log('Password verified successfully')
    
    // Update lastLogin timestamp
    admin.lastLogin = new Date().toISOString()
    await c.env.KV.put(`admin:${username}`, JSON.stringify(admin))
    
    // Generate JWT token
    console.log('Generating JWT for user:', admin.username)
    console.log('JWT_SECRET length:', c.env.JWT_SECRET?.length || 0)
    const token = await generateJWT({
      username: admin.username,
      role: admin.role || 'admin'
    }, c.env.JWT_SECRET)
    console.log('JWT token generated successfully')
    
    // Return admin data without password and JWT token
    const { password: _, ...adminData } = admin
    return c.json({ 
      message: 'Login successful', 
      admin: adminData,
      token
    })
  } catch (err) {
    const error = err as Error
    console.error('Login error:', error)
    console.error('Error stack:', error.stack)
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

// Get all inquiries (protected with JWT)
app.get('/admin/getall', authenticateJWT, async (c) => {
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

// Update inquiry by id (protected with JWT)
app.patch('/admin/update/:id', authenticateJWT, async (c) => {
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

// Delete inquiry by id (protected with JWT)
app.delete('/admin/delete/:id', authenticateJWT, async (c) => {
  try {
    const { id } = c.req.param()
    
    // Check if inquiry exists before deleting
    const inquiryStr = await c.env.KV.get(`inquiry:${id}`)
    if (!inquiryStr) {
      return c.json({ error: 'Inquiry not found' }, 404)
    }
    
    // Get the inquiry data to return in response
    const inquiry: IInquiryData = JSON.parse(inquiryStr)
    
    // Delete the inquiry from KV
    await c.env.KV.delete(`inquiry:${id}`)
    
    return c.json({ 
      message: 'Inquiry deleted successfully', 
      deletedInquiry: inquiry 
    })
  } catch (err) {
    const error = err as Error
    return c.json({ error: 'Failed to delete inquiry', details: error.message }, 500)
  }
})

// Verify JWT token endpoint
app.get('/verify-token', authenticateJWT, async (c) => {
  const user = c.get('user')
  return c.json({ 
    message: 'Token is valid', 
    user: {
      username: user.username,
      role: user.role
    }
  })
})

export default app

