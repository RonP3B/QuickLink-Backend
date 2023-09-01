import { validationResult } from "express-validator";

export const validationResults = (req, res, next) => {
  const errors = validationResult(req)
    .array()
    .map((error) => error.msg);

  if (errors.length) {
    const response = errors.length === 1 ? { error: errors[0] } : { errors };
    return res.status(400).json(response);
  }

  next();
};
