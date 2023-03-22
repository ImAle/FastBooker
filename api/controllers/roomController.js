import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"


/**
 *  This function creates a new room in database
 *  @function
 *  @async
 *  @group /controllers/room
 *  @param {Object} req - It contains the needed hotel id and room data to create a new room
 *  @param {Object} res - It contains a success message and the already created new room data
 */
const createNewRoom = async (req, res, next) =>{
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms:savedRoom._id}})
        }catch(e){
            next(e)
        }
        res.status(200).json(savedRoom)
    }catch (e){
        next(e)
    }
}

/**
 *  This function updates a hotel from the database
 *  @function
 *  @async
 *  @group /controllers/room
 *  @param {Object} req - Contains the hotel id to update
 *  @param {Object} res - Sends success message and the updated hotel
 *  @returns {Hotel} - returns the updated hotel data
 *  @throws {Error} - throws 500 status
 */


/**
 *  This function updates a room from the database
 *  @function
 *  @async
 *  @group /controllers/room
 *  @param {Object} req - Contains the data to update the room and the room id  
 *  @param {Object} res - Sends success message along with the updated room
 *  @throws {Error} - throws 500 status with the error message along
 */
const updateRoom = async (req, res) => {
    try {
      const saveNewRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(saveNewRoom);
    } catch (e) {
      res.status(500).json(e);
    }
  };



/**
 *  This function deletes a room from the database
 *  @function
 *  @async
 *  @group /controllers/room
 *  @param {Object} req - It contains the room id to delete
 *  @param {Object} res - Sends success message along with a text to emphasize the fact
 *  @throws {Error} - throws 500 status
 */
const deleteRoom = async (req, res) => {
    try {
      await Room.findByIdAndDelete(req.params.id);
      res.status(200).json("This room has been deleted");
    } catch (e) {
      res.status(500).json(e);
    }
  };
  
  
  
  /**
   *  This function shows information about all the rooms from the database
   *  @function
   *  @async
   *  @group /controllers/room
   *  @param {Object} req - HTTP request
   *  @param {Object} res - Sends all rooms in DB
   *  @throws {Error} - throws 500 status
   */
  const getAllRooms = async (req, res) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (e) {
      res.status(500).json(e);
    }
  };
  
  
  
  /**
   *  This function shows information about the desired room
   *  @function
   *  @async
   *  @group /controllers/room
   *  @param {Object} req - Contains the id of the room for which to display the information
   *  @param {Object} res - Sends the desired room data
   *  @throws {Error} - throws 500 status
   */
  const getRoom = async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (e) {
      res.status(500).json(e);
    }
  };

  export default {createNewRoom, updateRoom, deleteRoom, getAllRooms, getRoom}