import { verifyToken } from "./token.js";

export const tokenAuth = async (req, re, next) => {
  try {
    if (!req.headers.authorization) {
      console.log(Error);
    } else {
      const token = req.headers.authorization.split(" ")[1];
      const payload = await verifyToken(token);
      if (payload) {
        req.user = {
          _id: payload._id,
          username: payload.username,
        };
        next();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
