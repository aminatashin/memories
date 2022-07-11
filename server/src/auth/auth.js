import { verifyToken } from "./token.js";
export const tokenAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log(error);
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const payload = await verifyToken(token);
    if (payload) {
      req.user = {
        _id: payload._id,
      };
      next();
    } else {
      console.log("user not authorized!Get token,Sign Up");
    }
  }
};
