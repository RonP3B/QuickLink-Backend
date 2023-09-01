import jwt from "jsonwebtoken";

export const generateAccessToken = (uid) => {
  try {
    const expiresIn = 60 * 10;
    const accessToken = jwt.sign({ uid }, process.env.JWT_SECRET, {
      expiresIn,
    });
    return accessToken;
  } catch (error) {
    console.log(`Failed to generate JWT: ${error}`);
  }
};

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24;

  try {
    const refreshToken = jwt.sign({ uid }, process.env.REFRESH_JWT_SECRET, {
      expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + expiresIn * 1000),
      secure: process.env.NODE_ENV !== "development",
      sameSite: "none",
    });
  } catch (error) {
    console.log(`Failed to generate refresh JWT: ${error}`);
  }
};
