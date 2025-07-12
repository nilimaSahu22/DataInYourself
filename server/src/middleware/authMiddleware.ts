import { Context, Next } from 'hono'
import { verifyJWT, extractJWTFromHeader } from '../utils/jwtUtils'

// JWT Authentication Middleware
export async function authenticateJWT(c: Context, next: Next) {
  try {
    const authHeader = c.req.header('Authorization')
    const token = extractJWTFromHeader(authHeader)
    
    if (!token) {
      return c.json({ error: 'Authorization token required' }, 401)
    }
    
    const payload = await verifyJWT(token, c.env.JWT_SECRET)
    if (!payload) {
      return c.json({ error: 'Invalid or expired token' }, 401)
    }
    
    // Add user info to context for use in route handlers
    c.set('user', payload)
    await next()
  } catch (error) {
    console.error('JWT authentication error:', error)
    return c.json({ error: 'Authentication failed' }, 401)
  }
}

// Optional JWT middleware - doesn't fail if no token, but adds user info if valid
export async function optionalJWT(c: Context, next: Next) {
  try {
    const authHeader = c.req.header('Authorization')
    const token = extractJWTFromHeader(authHeader)
    
    if (token) {
      const payload = await verifyJWT(token, c.env.JWT_SECRET)
      if (payload) {
        c.set('user', payload)
      }
    }
    
    await next()
  } catch (error) {
    console.error('Optional JWT authentication error:', error)
    await next()
  }
} 