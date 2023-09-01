import { Router } from "express";
import {
  getLinks,
  getSingleLink,
  getOriginalLink,
  postLink,
  patchLink,
  deleteLink,
} from "../../controllers/linksController.js";
import { bodyLinkValidator } from "../../middlewares/validations/linksValidations.js";
import { requiresToken } from "../../middlewares/requiresToken.js";

const linkRouter = Router();

linkRouter
  .get("", requiresToken, getLinks)
  .get("/:id", requiresToken, getSingleLink)
  .get("/original/:shortenedLink", getOriginalLink)
  .post("", requiresToken, bodyLinkValidator, postLink)
  .patch("/:id", requiresToken, bodyLinkValidator, patchLink)
  .delete("/:id", requiresToken, deleteLink);

export default linkRouter;
