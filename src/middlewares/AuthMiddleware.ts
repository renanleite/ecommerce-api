import {Request, Response, NextFunction} from 'express'
import {verifyToken} from '../auth/auth'

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        res.status(401).json({message: 'Access denied'})
        return
    }

    try {
        const decoded = verifyToken(token)
        ;(req as any).user = decoded
        next()
    } catch (error) {
        res.status(400).json({message: 'Invalid token'})
    }
}
