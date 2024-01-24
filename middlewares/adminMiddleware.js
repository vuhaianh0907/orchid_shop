import asyncHandler from "express-async-handler";
import { protect } from "./authMiddleware.js";

const admin = asyncHandler(async (req, res, next) => {
  try {
    await protect(req, res, async () => {
      if (req.user.role === 'admin') {
        next(); // Allow access to the next middleware or route handler
      } else {
        res.status(403).json({ message: 'Permission denied. Admin access required.' });
      }
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error in admin middleware:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
  
  export {admin};