import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import {createError} from "../utils/error.js"


/**
 * This function creates a new room
 * @function
 * @async
 * @param {object} req - Contains data for the new room 
 * @param {object} res 
 * @param {object} next
 */
const createNewRoom = async (req, res, next) =>{
    const hotelId = req.params.hotelid
    const newRoom = new Room(req,body)

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
 *  This function updates a room from the database
 *  @function
 *  @async
 *  @param {Object} req - HTTP request
 *  @param {String} req.params.id - Id provided in the URL
 *  @param {Object} req.body - new room data
 *  @param {Object} res - HTTP response
 *  @returns {Room} - returns the updated room data
 *  @throws {Error} - throws 500 status
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
 *  This function deletes a rooms from the database
 *  @function
 *  @async
 *  @param {Object} req - HTTP request
 *  @param {String} req.params.id - Id provided in the URL
 *  @param {Object} res - HTTP response
 *  @returns {status} - returns String of success
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
   *  @param {Object} req - HTTP request
   *  @param {Object} res - HTTP response
   *  @returns {Room} - returns all the rooms from the database
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
   *  This function shows information about the wished room
   *  @function
   *  @async
   *  @param {Object} req - HTTP request
   *  @param {Object} req.params.id - Id provided in the URL
   *  @param {Object} res - HTTP response
   *  @returns {Room} - returns the searched room data
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