import jwt from "jsonwebtoken";

export const requiresRefreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new Error("Refresh token cookie is missing or invalid.");
    }

    const { uid } = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

    req.userId = uid;
    next();
  } catch (error) {
    console.log(`Requires token failed: ${error}`);
    res.status(403).json({ error: error.message });
  }
};
