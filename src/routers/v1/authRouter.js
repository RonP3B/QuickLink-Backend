import { Router } from "express";
import { requiresToken } from "../../middlewares/requiresToken.js";
import { requiresRefreshToken } from "../../middlewares/requiresRefreshToken.js";
import {
  login,
  signup,
  refreshAccessToken,
  logout,
  validateRefreshToken,
} from "../../controllers/authController.js";
import {
  bodyLoginValidations,
  bodySignupValidations,
} from "../../middlewares/validations/authValidations.js";

const authRouter = Router();

authRouter
  .get("/refresh-access-token", requiresRefreshToken, refreshAccessToken)
  .get("/valid-refresh-token", validateRefreshToken)
  .get("/logout", requiresToken, logout)
  .post("/login", bodyLoginValidations, login)
  .post("/signup", bodySignupValidations, signup);

export default authRouter;
