import Hotel from "../models/Hotel.js";
import {createError} from "../utils/error.js";


/**
 *  This function creates a new hotel in database
 *  @function
 *  @async
 *  @param {Object} req - HTTP request
 *  @param {Object} req.body - New hotel data
 *  @param {Object} res - HTTP response
 *  @returns {Hotel} - returns the new hotel data
 *  @throws {Error} - throws 500 status
 */
const createNewHotel = async (req, res) => {
  const hotel = new Hotel(req.body);

  try {
    const saveNewHotel = await hotel.save();
    res.status(200).json(saveNewHotel);
  } catch (e) {
    res.status(500).json(e);
  }
};



/**
 *  This function updates a hotel from the database
 *  @function
 *  @async
 *  @param {Object} req - HTTP request
 *  @param {String} req.params.id - Id provided in the URL
 *  @param {Object} req.body - new hotel data
 *  @param {Object} res - HTTP response
 *  @returns {Hotel} - returns the updated hotel data
 *  @throws {Error} - throws 500 status
 */
const updateHotel = async (req, res) => {
  try {
    const saveNewHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(saveNewHotel);
  } catch (e) {
    res.status(500).json(e);
  }
};



/**
 *  This function deletes a hotel from the database
 *  @function
 *  @async
 *  @param {Object} req - HTTP request
 *  @param {String} req.params.id - Id provided in the URL
 *  @param {Object} res - HTTP response
 *  @returns {status} - returns String of success
 *  @throws {Error} - throws 500 status
 */
const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("This hotel has been deleted");
  } catch (e) {
    res.status(500).json(e);
  }
};



/**
 *  This function shows information about all the hotels from the database
 *  @function
 *  @async
 *  @param {Object} req - HTTP request
 *  @param {Object} res - HTTP response
 *  @returns {Hotel} - returns all the hotels from the database
 *  @throws {Error} - throws 500 status
 */
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (e) {
    res.status(500).json(e);
  }
};



/**
 *  This function shows information about the wished hotel
 *  @function
 *  @async
 *  @param {Object} req - HTTP request
 *  @param {Object} req.params.id - Id provided in the URL
 *  @param {Object} res - HTTP response
 *  @returns {Hotel} - returns the searched hotel data
 *  @throws {Error} - throws 500 status
 */
const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (e) {
    res.status(500).json(e);
  }
};




export default {createNewHotel, updateHotel, deleteHotel, getAllHotels, getHotel}