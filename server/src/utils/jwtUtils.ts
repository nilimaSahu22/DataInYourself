// JWT utilities for Cloudflare Workers using Web Crypto API

const JWT_ALGORITHM = 'HS256'
const JWT_EXPIRY = '24h' // 24 hours

interface JWTPayload {
  username: string
  role: string
  iat: number
  exp: number
}

// Convert string to ArrayBuffer
function stringToArrayBuffer(str: string): ArrayBuffer {
  const encoder = new TextEncoder()
  const uint8Array = encoder.encode(str)
  return uint8Array.buffer.slice(uint8Array.byteOffset, uint8Array.byteOffset + uint8Array.byteLength) as ArrayBuffer
}

// Convert ArrayBuffer to base64url string
function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

// Convert base64url string to ArrayBuffer
function base64UrlToArrayBuffer(base64url: string): ArrayBuffer {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
  const padding = '='.repeat((4 - base64.length % 4) % 4)
  const base64Padded = base64 + padding
  const binary = atob(base64Padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

// Generate JWT token
export async function generateJWT(payload: { username: string; role: string }, secret: string): Promise<string> {
  const header = {
    alg: JWT_ALGORITHM,
    typ: 'JWT'
  }

  const now = Math.floor(Date.now() / 1000)
  const jwtPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + (24 * 60 * 60) // 24 hours from now
  }

  const encodedHeader = arrayBufferToBase64Url(stringToArrayBuffer(JSON.stringify(header)))
  const encodedPayload = arrayBufferToBase64Url(stringToArrayBuffer(JSON.stringify(jwtPayload)))

  const data = `${encodedHeader}.${encodedPayload}`
  const keyData = stringToArrayBuffer(secret)

  // Import key for HMAC-SHA256
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  // Sign the data
  const signature = await crypto.subtle.sign('HMAC', key, stringToArrayBuffer(data))
  const encodedSignature = arrayBufferToBase64Url(signature)

  return `${data}.${encodedSignature}`
}

// Verify JWT token
export async function verifyJWT(token: string, secret: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    const [encodedHeader, encodedPayload, encodedSignature] = parts

    // Verify signature
    const data = `${encodedHeader}.${encodedPayload}`
    const keyData = stringToArrayBuffer(secret)

    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    const signature = base64UrlToArrayBuffer(encodedSignature)
    const isValid = await crypto.subtle.verify('HMAC', key, signature, stringToArrayBuffer(data))

    if (!isValid) {
      return null
    }

    // Decode payload
    const payloadBuffer = base64UrlToArrayBuffer(encodedPayload)
    const payloadText = new TextDecoder().decode(payloadBuffer)
    const payload: JWTPayload = JSON.parse(payloadText)

    // Check expiration
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) {
      return null
    }

    return payload
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