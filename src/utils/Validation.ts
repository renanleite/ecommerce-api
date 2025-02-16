import {Request, Response} from 'express'

export function isBodyEmpty(req: Request, res: Response): Boolean {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send('Body cannot be empty')
        return true
    }
    return false
}

// This function validates if all the required fields are present in the request body
export function isBodyValid(
    req: Request,
    res: Response,
    requiredFields: string[],
): boolean {
    const missingFields: string[] = []

    requiredFields.forEach((field) => {
        if (!(field in req.body)) {
            missingFields.push(field)
        }
    })

    if (missingFields.length > 0) {
        res.status(400).json({
            message: 'Missing required fields',
            missingFields,
        })
        return false // Validation failed
    }

    return true // Validation passed
}
