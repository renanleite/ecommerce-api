import {Request, Response} from 'express'

export function isBodyEmpty(req: Request, res: Response): Boolean {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send('Body cannot be empty')
        return true
    }
    return false
}