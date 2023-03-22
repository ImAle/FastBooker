import express from "express"
import verify from "../utils/verifyToken.js"
import hotelController from "../controllers/hotelController.js"

const router = express.Router()

/**
 * Endpoint to create a new hotel.
 * Only if you are admin.
 * @route POST /
 * @group hotels
 */
router.post("/", verify.verifyIfAdmin, hotelController.createNewHotel)

/**
 * Endpoint to get information from a certain hotel.
 * @route GET /:id
 * @group hotels
 */
router.get("/:id", hotelController.getHotel)

/**
 * Endpoint to update a certain hotel.
 * Only if you are admin.
 * @route PUT /:id
 * @group hotels
 */
router.put("/:id", verify.verifyIfAdmin, hotelController.updateHotel)

/**
 * Endpoint to delete a certain hotel.
 * Only if you are admin.
 * @route DELETE /:id
 * @group hotels
 */
router.delete("/:id", verify.verifyIfAdmin, hotelController.deleteHotel)

/**
 * Endpoint to get all the hotels data.
 * @route GET /
 * @group hotels
 */
router.get("/", hotelController.getAllHotels)

export default router
