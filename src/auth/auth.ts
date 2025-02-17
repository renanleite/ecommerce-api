import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in .env')
}
const JWT_EXPIRES_IN = '1H'

export function generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET!, {expiresIn: JWT_EXPIRES_IN})
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET!)
}
