import { Hono } from 'hono'
import { connectDB } from './db/db'
import InquiryData from './db/model/InquiryData.model'
import Admin from './db/model/Admin.model'

// Define environment variable types
type Bindings = {
  MONGODB_URI: string
  PORT: string
}

// Connect to MongoDB
connectDB()

const app = new Hono<{ Bindings: Bindings }>()

// Middleware to handle environment variables
app.use('*', async (c, next) => {
  // Access environment variables through c.env
  const mongoUri = c.env?.MONGODB_URI || 'mongodb://localhost:27017/datainyourself'
  
  // You can also access other env vars like:
  // const port = c.env?.PORT || '3000'
  
  await next()
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/inquiry', async (c) => {
  try {
    const { name, phoneNumber, emailId, subject } = await c.req.json()
    if (!name || !phoneNumber || !emailId || !subject) {
      return c.json({ error: 'Missing required fields' }, 400)
    }
    const inquiry = new InquiryData({
      name,
      phoneNumber,
      emailId,
      subject,
      called: false,
      description: '',
    })
    await inquiry.save()
    return c.json({ message: 'Inquiry saved successfully' }, 201)
  } catch (err) {
    const error = err as Error
    return c.json({ error: 'Failed to save inquiry', details: error.message }, 500)
  }
})

app.post('/login', async (c) => {
  const { username, password } = await c.req.json()
  if (!username || !password) {
    return c.json({ error: 'Username and password are required' }, 400)
  }
  const admin = await Admin.findOne({ username })

  if (!admin) {
    return c.json({ error: 'Admin not found' }, 404)
  }

  if (admin.password !== password) {
    return c.json({ error: 'Invalid password' }, 401)
  }

  return c.json({ message: 'Login successful', username: admin.username })
})


app.get('/admin/getall', async (c) => {
  try {
    const inquiries = await InquiryData.find()
    return c.json({ inquiries })
  } catch (err) {
    const error = err as Error
    return c.json({ error: 'Failed to fetch inquiries', details: error.message }, 500)
  }
})

app.patch('/admin/update/:id', async (c) => {
  try {
    const { id } = c.req.param()
    const updateFields = await c.req.json()
    const allowedFields = ['description', 'name', 'phoneNumber', 'emailId', 'called']
    const updateData: Record<string, any> = {}
    for (const key of allowedFields) {
      if (key in updateFields) {
        updateData[key] = updateFields[key]
      }
    }
    if (Object.keys(updateData).length === 0) {
      return c.json({ error: 'No valid fields to update' }, 400)
    }
    const updated = await InquiryData.findByIdAndUpdate(id, updateData, { new: true })
    if (!updated) {
      return c.json({ error: 'Inquiry not found' }, 404)
    }
    return c.json({ message: 'Inquiry updated successfully', inquiry: updated })
  } catch (err) {
    const error = err as Error
    return c.json({ error: 'Failed to update inquiry', details: error.message }, 500)
  }
})

export default app
