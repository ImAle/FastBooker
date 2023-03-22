import express from 'express'
import authController from '../controllers/authController.js'

const router = express.Router()

/**
 * Endpoint to register a user.
 * Requires email, username and password.
 * @route POST /register
 * @group Authentication
 */
router.post("/register", authController.register)

/**
 * Endpoint to login.
 * Requires username and password.
 * @route POST /login
 * @group Authentication
 */
router.post("/login", authController.login)

export default router