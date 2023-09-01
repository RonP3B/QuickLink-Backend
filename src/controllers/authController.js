import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenManager.js";
import {
  postLoginService,
  postSignupService,
} from "../services/authServices.js";

export const refreshAccessToken = (req, res, next) => {
  try {
    const accessToken = generateAccessToken(req.userId);
    return res.json({ accessToken });
  } catch (error) {
    console.log(`authController -> refreshToken -> ${error}`);
    next(error);
  }
};

export const validateRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.json({ validRefreshToken: false });
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
    return res.json({ validRefreshToken: !!decoded });
  } catch (error) {
    console.log(`authController -> validateRefreshToken -> ${error}`);
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "none",
    });
    return res.sendStatus(204);
  } catch (error) {
    console.log(`authController -> logout -> ${error}`);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await postLoginService(email, password);
    const accessToken = generateAccessToken(user.id);
    generateRefreshToken(user.id, res);
    return res.json({ accessToken });
  } catch (error) {
    console.log(`authController -> login -> ${error}`);
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const createdUser = await postSignupService(email, password);
    return res
      .status(201)
      .json({ createdUser, toastMsg: "User created successfully" });
  } catch (error) {
    console.log(`authController -> signup -> ${error}`);
    next(error);
  }
};
