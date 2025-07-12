import { SignJWT, jwtVerify } from 'jose'

const JWT_ALGORITHM = 'HS256'
const JWT_EXPIRY = '24h' // 24 hours

interface JWTPayload {
  username: string
  role: string
  iat: number
  exp: number
}

// Generate JWT token using jose
export async function generateJWT(payload: { username: string; role: string }, secret: string): Promise<string> {
  const secretKey = new TextEncoder().encode(secret)
  
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(secretKey)
  
  return jwt
}

// Verify JWT token using jose
export async function verifyJWT(token: string, secret: string): Promise<JWTPayload | null> {
  try {
    const secretKey = new TextEncoder().encode(secret)
    
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: [JWT_ALGORITHM]
    })
    
    // Convert jose JWTPayload to our custom JWTPayload type
    return {
      username: payload.username as string,
      role: payload.role as string,
      iat: payload.iat as number,
      exp: payload.exp as number
    }
  } catch (error) {
    console.error('JWT verification error:', error)
    return null
  }
}

// Extract JWT from Authorization header
export function extractJWTFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
} 