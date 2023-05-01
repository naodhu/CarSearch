import User from "../models/User.js";
import Car from "../models/Car.js";
import Favorite from "../models/Favorite.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

// Register a new user
export const register = async (req, res) => {
  const { email, password, name } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    email,
    password: hashedPassword,
    name,
  });

  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1d" });

  res.status(201).json({ token, user: newUser });
};

// Authenticate a user
export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Email:", email, "Password:", password);

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  console.log("User:", user);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

  res.status(200).json({ token, user });
};
