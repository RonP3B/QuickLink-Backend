import User from "../models/User.js";
import crypto from "crypto";

export const postLoginService = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throwCredentialsError();

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throwCredentialsError();

  return user;
};

export const postSignupService = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    const msg = `The email '${email}' is already in use`;
    const error = new Error(msg);

    error.statusCode = 409;
    error.toastMsg = msg;

    throw error;
  }

  const createdUser = await User.create({
    id: crypto.randomUUID(),
    email,
    password,
  });

  return createdUser;
};

const throwCredentialsError = () => {
  const msg = "Incorrect credentials";
  const error = new Error(msg);

  error.statusCode = 401;
  error.toastMsg = msg;

  throw error;
};
