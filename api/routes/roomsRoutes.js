import express from 'express'
import verify from "../utils/verifyToken.js"
import roomController from "../controllers/roomController.js"

const router = express.Router()

router.post("/:hotelid", verify.verifyIfAdmin, roomController.createNewRoom)

router.get("/:id", roomController.getRoom)

router.put("/:id", verify.verifyIfAdmin, roomController.updateRoom)

router.delete("/:id", verify.verifyIfAdmin, roomController.deleteRoom)

router.get("/", roomController.getAllRooms)


export default router