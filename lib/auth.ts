export const JWT_SECRET = "umkm-kota-piring-secret-key-change-this"
export const COOKIE_NAME = "admin_session"

// Web Crypto API compatible hash function
export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder()
  const hash = await crypto.subtle.digest("SHA-256", enc.encode(password))
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")
}

// Web Crypto API for Middleware compatibility (Edge Runtime)
export async function signToken(payload: any): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const data = JSON.stringify(payload)
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(data))
  
  // Convert signature to base64
  const sigArray = Array.from(new Uint8Array(signature))
  const sigString = sigArray.map(b => String.fromCharCode(b)).join("")
  const sigB64 = btoa(sigString)
  
  // Convert data to base64
  const dataB64 = btoa(data)
  
  return `${dataB64}.${sigB64}`
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const [dataB64, sigB64] = token.split(".")
    if (!dataB64 || !sigB64) return null

    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    )

    const data = atob(dataB64)
    const sigString = atob(sigB64)
    const sig = new Uint8Array(sigString.length)
    for (let i = 0; i < sigString.length; i++) {
      sig[i] = sigString.charCodeAt(i)
    }

    const valid = await crypto.subtle.verify("HMAC", key, sig, enc.encode(data))
    if (!valid) return null
    
    return JSON.parse(data)
  } catch (e) {
    return null
  }
}
