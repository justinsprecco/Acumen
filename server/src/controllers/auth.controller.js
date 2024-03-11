import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { sign } = jwt;
const secretKey = process.env.JWT_KEY;

export async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    const userId = await User.register(username, email, password);
    res.sendSuccess(201, userId);
  } catch (error) {
    res.sendError(500, error);
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const userId = await User.login(username, password);
    const token = sign(userId, secretKey, { expiresIn: "1h" });
    res.sendSuccess(200, { token: token });
  } catch (error) {
    res.sendError(500, error);
  }
}
