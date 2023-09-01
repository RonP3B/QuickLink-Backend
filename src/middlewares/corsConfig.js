import cors from "cors";

const whiteList = [process.env.ORIGIN1];

export const corsConfig = cors({
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) return callback(null, origin);
    return callback(`CORS origin unauthorized: ${origin}`);
  },
  credentials: true,
});
