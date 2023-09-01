import {
  deleteLinkService,
  getLinksService,
  getOriginalLinkService,
  getSingleLinkService,
  patchLinkService,
  postLinkService,
} from "../services/linksServices.js";

export const getLinks = async (req, res, next) => {
  try {
    const links = await getLinksService(req.userId);
    return res.json({ links });
  } catch (error) {
    console.log(`LinkController -> getLinks -> ${error}`);
    next(error);
  }
};

export const getSingleLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    const link = await getSingleLinkService(id, req.userId);
    return res.json({ link });
  } catch (error) {
    console.log(`LinkController -> getSingleLink -> ${error}`);
    next(error);
  }
};

export const getOriginalLink = async (req, res, next) => {
  try {
    const { shortenedLink } = req.params;
    const link = await getOriginalLinkService(shortenedLink);
    return res.json({ originalLink: link.originalLink });
  } catch (error) {
    console.log(`LinkController -> getOriginalLink -> ${error}`);
    next(error);
  }
};

export const postLink = async (req, res, next) => {
  try {
    const { pageName, link } = req.body;
    const newLink = await postLinkService(link, pageName, req.userId);
    return res
      .status(201)
      .json({ newLink, toastMsg: "Link created successfully" });
  } catch (error) {
    console.log(`LinkController -> postLink -> ${error}`);
    next(error);
  }
};

export const patchLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { pageName, link } = req.body;
    const patchedLink = await patchLinkService(link, pageName, id, req.userId);
    return res.json({ patchedLink, toastMsg: "Link updated successfully" });
  } catch (error) {
    console.log(`LinkController -> patchLink -> ${error}`);
    next(error);
  }
};

export const deleteLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedLink = await deleteLinkService(id, req.userId);
    return res.json({ deletedLink, toastMsg: "Link deleted successfully" });
  } catch (error) {
    console.log(`LinkController -> deleteLink -> ${error}`);
    next(error);
  }
};
