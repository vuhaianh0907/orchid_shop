import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  createManagerAccount,
  createStaffAccount,
  deactivateAccount,
  registerAdmin,
  reactivateAccount
} from "../controllers/accountController.js";
import { protect } from "../middlewares/authMiddleware.js";
import {admin} from '../middlewares/adminMiddleware.js'

const router = express.Router();

router.post("/accounts/auth", authUser);
router.post("/accounts/", registerUser);
router.post("/accounts/logout", logoutUser);
router
  .route("/accounts/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post("/accounts/create-staff", protect, admin, createStaffAccount);
router.post("/accounts/create-manager", protect, admin, createManagerAccount);
router.post("/accounts/new-admin", registerAdmin);
router.put("/accounts/deactivate/:userId", protect, admin, deactivateAccount);
router.put("/accounts/reactivate/:userId", protect, admin, reactivateAccount);

export default router;
