import express from 'express'
import UserController from '../controllers/userController.js'
import verify from '../utils/verifyToken.js'

const router = express.Router()

router.get("/:id", verify.verifyUserIdentity, UserController.updateUser)

router.put("/:id", verify.verifyUserIdentity, UserController.updateUser)

router.delete("/:id", verify.verifyUserIdentity, UserController.deleteUser)

router.get("/", verify.verifyIfAdmin, UserController.getAllUsers)

export default router