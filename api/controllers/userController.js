import User from "../models/User.js";


/**
 *  This function updates a user from the database.
 *  @function
 *  @async
 *  @group /controllers/user
 *  @param {Object} req - Contains the user id to update and the new data for such user
 *  @param {Object} res - Sends success message along with the already updated user data
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
 *  This function deletes a user from the database.
 *  @function
 *  @async
 *  @group /controllers/user
 *  @param {Object} req - Contains the user id to delete
 *  @param {Object} res - Sends success message along with a text to emphasize the fact
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
 *  This function shows information about all the users from the database.
 *  @function
 *  @async
 *  @group /controllers/user
 *  @param {Object} req - HTTP request
 *  @param {Object} res - Sends success message along with all the users data in DB
 *  @throws {Error} - throws 500 status
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
 *  This function shows information about the desired user.
 *  @function
 *  @async
 *  @group /controllers/user
 *  @param {Object} req - Contains the id of the user to get information from
 *  @param {Object} res - Sends success message plus the desired user data
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