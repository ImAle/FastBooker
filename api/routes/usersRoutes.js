import express from 'express'
import UserController from '../controllers/userController.js'
import verify from '../utils/verifyToken.js'

const router = express.Router()

/**
 * Endpoint to get a certain user data.
 * Only if you are admin or the own user.
 * @route GET /:id
 * @group users
 */
router.get("/:id", verify.verifyUserIdentity, UserController.getUser)

/**
 * Endpoint to update a certain user data.
 * Only if you are admin or the own user.
 * @route PUT /:id
 * @group users
 */
router.put("/:id", verify.verifyUserIdentity, UserController.updateUser)

/**
 * Endpoint to delete a certain user.
 * Only if you are admin or the own user.
 * @route DELETE /:id
 * @group users
 */
router.delete("/:id", verify.verifyUserIdentity, UserController.deleteUser)

/**
 * Endpoint to get all the users data.
 * Only if you are admin.
 * @route GET /
 * @group users
 */
router.get("/", verify.verifyIfAdmin, UserController.getAllUsers)

export default router