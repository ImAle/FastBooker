import express from "express"
import verify from "../utils/verifyToken.js"
import hotelController from "../controllers/hotelController.js"

const router = express.Router()

router.post("/", verify.verifyIfAdmin, hotelController.createNewHotel)

router.get("/:id", hotelController.getHotel)

router.put("/:id", verify.verifyIfAdmin, hotelController.updateHotel)

router.delete("/:id", verify.verifyIfAdmin, hotelController.deleteHotel)

router.get("/", hotelController.getAllHotels)

export default router
