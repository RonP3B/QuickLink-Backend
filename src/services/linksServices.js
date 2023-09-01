import crypto from "crypto";
import { nanoid } from "nanoid";
import Link from "../models/Link.js";

export const getLinksService = async (userId) => {
  const links = await Link.findAll({ where: { userId } });

  if (links.length === 0) {
    const error = new Error("No links found for the specified user.");
    error.statusCode = 404;
    throw error;
  }

  return links;
};

export const getSingleLinkService = async (id, userId) => {
  const link = await Link.findOne({ where: { id, userId } });
  if (!link) throwNotFoundLinkError();
  return link;
};

export const getOriginalLinkService = async (shortenedLink) => {
  const link = await Link.findOne({ where: { shortenedLink } });
  if (!link) throwNotFoundLinkError();
  return link;
};

export const postLinkService = async (originalLink, pageName, userId) => {
  const newLink = await Link.create({
    id: crypto.randomUUID(),
    pageName,
    originalLink,
    shortenedLink: nanoid(6),
    userId,
  });

  return newLink;
};

export const patchLinkService = async (originalLink, pageName, id, userId) => {
  const patchedLink = await Link.findOne({ where: { id, userId } });
  if (!patchedLink) throwNotFoundLinkError();
  await patchedLink.update({ originalLink, pageName });
  return patchedLink;
};

export const deleteLinkService = async (id, userId) => {
  const deletedLink = await Link.findOne({ where: { id, userId } });
  if (!deletedLink) throwNotFoundLinkError();
  await deletedLink.destroy();
  return deletedLink;
};

const throwNotFoundLinkError = () => {
  const error = new Error("The link does not exist.");
  error.statusCode = 404;
  throw error;
};
