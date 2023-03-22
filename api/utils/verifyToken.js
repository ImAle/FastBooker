import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "./error.js";

dotenv.config();

/**
 * Function to verify if a given token (cookie) is valid.
 * If All success, it adds to the request the user data. It is needed for the rest verification group. 
 * @function
 * @group verification
 * @param {Object} req - Contains the cookie. If all success, saves in the logged in user 
 * @param {Object} res - HTTP response
 * @param {Object} next . If all ok, it lets the code continuous
 * @returns {Error} - Error 401 - You are not authenticated
 * @returns {Error} - Error 403 - The token (cookie) is not valid
 */
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }
  Jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid"));
    }
    req.user = user;
    next();
  });
};

/**
 * Function to verify if the user is admin or if the logged in user is the same that the looked up user.
 * Use of 'verifyToken' to get the logged in user.
 * @function
 * @group verification
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @param {Object} next - If admin or same user, it lets the code continuous
 * @return {Error} - Creates a error if not admin and not the same user.
 */
const verifyUserIdentity = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

/**
 * Function to verify if the logged in user is admin.
 * Use of 'verifyToken' to get the logged in user.
 * @function
 * @group verification
 * @param {Object} req - HTTP Request
 * @param {Object} res - HTTP response
 * @param {Object} next - If admin, it lets the code continuous
 * @return {Error} - If not admin, returns error
 */
const verifyIfAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not an admin user"));
      }
    });
  };

export default { verifyToken, verifyUserIdentity, verifyIfAdmin };
