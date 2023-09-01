import { body } from "express-validator";
import { validationResults } from "../validationResults.js";

export const bodyLoginValidations = [
  body("email", "Missing email").trim().notEmpty(),
  body("password", "Missing password").trim().notEmpty(),
  validationResults,
];

export const bodySignupValidations = [
  body("email", "Invalid email format")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
  body("password", "Invalid password format")
    .trim()
    .notEmpty()
    .isLength({ min: 6 }),
  body("password", "The passwords do not match").custom((value, { req }) => {
    if (value !== req.body.confirmPassword) throw new Error();
    return value;
  }),
  validationResults,
];
