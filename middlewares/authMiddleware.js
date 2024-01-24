import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/accountModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.status(401);
        throw new Error('Not authorized, token has expired');
      } else {
        res.status(401);
        throw new Error('Not authorized, invalid token');
      }
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export {protect};
