import User from "../models/User.js";
import {createError} from "../utils/error.js";


/**
 *  This function updates a user from the database
 *  @function
 *  @async
 *  @param {Object} req - HTTP request
 *  @param {String} req.params.id - Id provided in the URL
 *  @param {Object} req.body - new user data
 *  @param {Object} res - HTTP response
 *  @returns {User} - returns the updated user data
 *  @throws {Error} - throws 500 status
 */
const updateUser = async (req, res) => {
  try {
    const saveNewUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(saveNewUser);
  } catch (e) {
    res.status(500).json(e);
  }
};



/**
 *  This function deletes a user from the database
 *  @function
 *  @async
 *  @param {Object} req - HTTP request
 *  @param {String} req.params.id - Id provided in the URL
 *  @param {Object} res - HTTP response
 *  @returns {status} - returns String of success
 *  @throws {Error} - throws 500 status
 */
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("This user has been deleted");
  } catch (e) {
    res.status(500).json(e);
  }
};



/**
 *  This function shows information about all the users from the database
 *  @function
 *  @async
 *  @param {Object} req - HTTP request
 *  @param {Object} res - HTTP response
 *  @returns {[User]} returns all the users from the database
 *  @throws {Error} throws 500 status
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e);
  }
};



/**
 *  This function shows information about the wished user
 *  @function
 *  @async
 *  @param {Object} req - HTTP request
 *  @param {Object} req.params.id - Id provided in the URL
 *  @param {Object} res - HTTP response
 *  @returns {User} returns the searched user data
 *  @throws {Error} throws 500 status
 */
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};




export default {updateUser, deleteUser, getAllUsers, getUser}