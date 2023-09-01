import jwt from "jsonwebtoken";

export const requiresToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Authorization header is missing or invalid.");
    }

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = uid;
    next();
  } catch (error) {
    console.log(`Requires token failed: ${error}`);
    res.status(401).json({ error: error.message, code: "ERR_JWT" });
  }
};
