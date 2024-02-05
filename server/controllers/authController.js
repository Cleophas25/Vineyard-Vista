import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import expressAsyncHandler from "express-async-handler";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

import attachCookie from "../utils/attachCookie.js";

const register = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ name, email, password });

  const token = user.createJWT();
  attachCookie({ res, token });
  res.status(StatusCodes.CREATED).json({
    success: true,
    user: {
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: token,
    },
  });
});

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("User does not Exist");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  attachCookie({ res, token });
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: token,
    },
  });
});

const logout = expressAsyncHandler(async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
});

const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

const getUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

const updateProfile = expressAsyncHandler(async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();
    const token = user.createJWT();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: token,
    });
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

const resetPassword = expressAsyncHandler(async (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      res.status(401).send({ message: "Invalid Token" });
    } else {
      const user = await User.findOne({ resetToken: req.body.token });
      console.log(user);
      if (user) {
        if (req.body.password) {
          user.password = req.body.password;
          await user.save();
          res.send({
            message: "Password reseted successfully",
          });
        }
      } else {
        res.status(404).send({ message: "User not found" });
      }
    }
  });
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.send({ message: "User Updated", user: updatedUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.email === "admin@example.com") {
      res.status(400).send({ message: "Can Not Delete Admin User" });
      return;
    }
    await user.deleteOne();
    res.send({ message: "User Deleted" });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

export {
  register,
  login,
  logout,
  deleteUser,
  updateUser,
  resetPassword,
  updateProfile,
  getAllUsers,
  getUser,
};
