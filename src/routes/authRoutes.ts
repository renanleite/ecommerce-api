import {Router} from 'express'
import {authController} from '../controllers/AuthController'

const authRoutes = Router()

authRoutes.post('/register', authController.register)
authRoutes.post('/login', authController.login)

export default authRoutes
