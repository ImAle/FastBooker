import User from "../models/User.js";
import crypt from "../utils/crypt.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { createError } from "../utils/error.js";

dotenv.config()

const register = async (req, res, next) => {
  try {
    const hashedPassword = await crypt.cryptedPassword(req.body.password);

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

const findUser = async (username) => {
  return User.findOne({ username: username });
};

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
