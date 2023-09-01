import { body } from "express-validator";
import { validationResults } from "../validationResults.js";

export const bodyLinkValidator = [
  body("pageName", "Page name missing").trim().notEmpty(),
  body("link", "Invalid link format.").trim().notEmpty().isURL(),
  validationResults,
];
