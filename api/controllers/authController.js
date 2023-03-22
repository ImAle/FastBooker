import User from "../models/User.js";
import crypt from "../utils/crypt.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { createError } from "../utils/error.js";

dotenv.config()

/**
 * This function takes the needed data for register, encrypts its password and create such user.
 * To encript, it use 'encryptedPassword' from module '/utils/crypt.js'
 * @function
 * @async
 * @group /controllers/authentication
 * @param {*} req - contains the needed data to register
 * @param {*} res - sends success message
 * @param {*} next - used if error happens
 */
const register = async (req, res, next) => {
  try {
    const hashedPassword = await crypt.encryptedPassword(req.body.password);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).send("User has been created succesfully");
  } catch (e) {
    next(e);
  }
};

/**
 * Function to find all data of a user based on a given username
 * @function
 * @async
 * @group /controllers/authentication
 * @param {String} username 
 * @returns {User}
 */
const findUser = async (username) => {
  return User.findOne({ username: username });
};

/**
 * Function to login. It looks up for the user in the DB, then compare passwords. 
 * If all ok, it sends a cookie with the needed information of the user.
 * Otherwise, it sends error messages.
 * @function
 * @async
 * @group /controllers/authentication
 * @param {Object} req - Data needed for login 
 * @param {*} res - sends the cookie and a success message with data
 * @param {*} next 
 * @returns {cookie}
 * @throws {Error} - HTTP 404 - User has not been found
 * @throws {Error} - HTTP 401 - Incorrect user or password, failed login 
 */
const login = async (req, res, next) => {
  try {
    const user = await findUser(req.body.username);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const match = await crypt.matchPassword(req.body.password, user.password);

    if (match) {
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
      const { password, isAdmin, ...others } = user._doc;
      return res.cookie("access_token",token, {httpOnly: true}).status(200).json({ ...others });
    }
    return next(createError(401, "Incorrect user or password"));
  } catch (e) {
    next(e);
  }
};

export default { register, login };
