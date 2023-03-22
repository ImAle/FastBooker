import express from 'express'
import verify from "../utils/verifyToken.js"
import roomController from "../controllers/roomController.js"

const router = express.Router()

/**
 * Endpoint to get all the rooms in a certain hotel.
 * Only if you are admin.
 * @route POST /:hotelid
 * @group rooms
 */
router.post("/:hotelid", verify.verifyIfAdmin, roomController.createNewRoom)

/**
 * Endpoint to get data from a certain room.
 * @route GET /:id
 * @group rooms
 */
router.get("/:id", roomController.getRoom)

/**
 * Endpoint to update a certain room.
 * Only if you are admin.
 * @route PUT /:id
 * @group rooms
 */
router.put("/:id", verify.verifyIfAdmin, roomController.updateRoom)

/**
 * Endpoint to delete a certain room.
 * Only if you are admin.
 * @route DELETE /:id
 * @group rooms
 */
router.delete("/:id", verify.verifyIfAdmin, roomController.deleteRoom)

/**
 * Endpoint to get all the rooms data.
 * @route GET /
 * @group rooms
 */
router.get("/", roomController.getAllRooms)


export default router