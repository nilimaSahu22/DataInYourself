import { Hono } from 'hono'
import { IInquiryData } from './db/model/InquiryData.model'
import { IAdmin } from './db/model/Admin.model'

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

// Admin login
app.post('/login', async (c) => {
  const { username, password } = await c.req.json()
  if (!username || !password) {
    return c.json({ error: 'Username and password are required' }, 400)
  }
  const adminStr = await c.env.KV.get(`admin:${username}`)
  if (!adminStr) {
    return c.json({ error: 'Admin not found' }, 404)
  }
  const admin: IAdmin = JSON.parse(adminStr)
  if (admin.password !== password) {
    return c.json({ error: 'Invalid password' }, 401)
  }
  return c.json({ message: 'Login successful', username: admin.username })
})


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

