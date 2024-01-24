  import asyncHandler from "express-async-handler";
  import Account from "../models/accountModel.js";
  import generateToken from "../utils/generateToken.js";

  //Customer functions

  //@desc Auth user/set token
  //@route POST /api/accounts/auth
  //@access public
  const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Account.findOne({ email });

    if (user && (await user.matchPasswords(password)) && user.isActive) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401);
      if (!user) {
        throw new Error("User not found");
      } else if (!user.matchPasswords(password)) {
        throw new Error("Invalid password");
      } else if (!user.isActive) {
        throw new Error("User account is not active");
      } else {
        throw new Error("Invalid email or password");
      }
    }
  });

  //@desc Register a new user
  //@route POST /api/accounts/
  //@access public
  const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, phone, address, avatar } = req.body;
    const userExisted = await Account.findOne({ email });

    if (userExisted) {
      res.status(400);
      throw new Error("User already existed");
    }

    const user = await Account.create({
      username,
      email,
      password,
      phone,
      address,
      avatar,
      role: "customer",
      isActive: true, // Assuming you want the user to be active upon registration
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });

  //@desc Logout user
  //@route POST /api/accounts/logout
  //@access public
  const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out" });
  });

  //@desc Get user profile
  //@route GET /api/accounts/profile
  //@access private
  const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      phone: req.user.phone,
      address: req.user.address,
      avatar: req.user.avatar,
    };
    res.status(200).json(user);
  });

  //@desc Update user profile
  //@route PUT /api/accounts/profile
  //@access private
  const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await Account.findById(req.user._id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      user.avatar = req.body.avatar || user.avatar;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updateUser = await user.save();
      res.status(200).json({
        _id: updateUser._id,
        username: updateUser.username,
        email: updateUser.email,
        phone: updateUser.phone,
        address: updateUser.address,
        avatar: updateUser.avatar,
        role: updateUser.role,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

  //Admin functions

  //@desc Create staff account (Admin only)
  //@route POST /api/accounts/create-staff
  //@access private (admin)
  const createStaffAccount = asyncHandler(async (req, res) => {
    const { username, email, password, phone, address, avatar } = req.body;
    const userExisted = await Account.findOne({ email });

    if (userExisted) {
      res.status(400);
      throw new Error("User already existed");
    }

    const staffUser = await Account.create({
      username,
      email,
      password,
      phone,
      address,
      avatar,
      role: "staff",
      isActive: true,
    });

    res.status(201).json({
      _id: staffUser._id,
      username: staffUser.username,
      email: staffUser.email,
      role: staffUser.role,
    });
  });

  //@desc Create manager account (Admin only)
  //@route POST /api/accounts/create-manager
  //@access private (admin)
  const createManagerAccount = asyncHandler(async (req, res) => {
    const { username, email, password, phone, address, avatar } = req.body;
    const userExisted = await Account.findOne({ email });

    if (userExisted) {
      res.status(400);
      throw new Error("User already existed");
    }

    const managerUser = await Account.create({
      username,
      email,
      password,
      phone,
      address,
      avatar,
      role: "manager",
      isActive: true,
    });

    res.status(201).json({
      _id: managerUser._id,
      username: managerUser.username,
      email: managerUser.email,
      role: managerUser.role,
    });
  });

  //@desc Deactivate user account (Admin only)
  //@route PUT /api/accounts/deactivate/:userId
  //@access private (admin)
  const deactivateAccount = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const userToUpdate = await Account.findById(userId);

    if (!userToUpdate) {
      res.status(404);
      throw new Error("User not found");
    }

    // Deactivate the user account
    userToUpdate.isActive = false;

    const updatedUser = await userToUpdate.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
    });
  });

  //@desc Reactivate user account (Admin only)
  //@route PUT /api/accounts/reactivate/:userId
  //@access private (admin)
  const reactivateAccount = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const userToUpdate = await Account.findById(userId);

    if (!userToUpdate) {
      res.status(404);
      throw new Error("User not found");
    }

    // Deactivate the user account
    userToUpdate.isActive = true;

    const updatedUser = await userToUpdate.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
    });
  });

  //@desc Register a new admin
  //@route POST /api/accounts/new-admin
  //@access private
  const registerAdmin = asyncHandler(async (req, res) => {
    const { username, email, password, phone, address, avatar } = req.body;
    const userExisted = await Account.findOne({ email });

    if (userExisted) {
      res.status(400);
      throw new Error("User already existed");
    }

    const user = await Account.create({
      username,
      email,
      password,
      phone,
      address,
      avatar,
      role: "admin",
      isActive: true, // Assuming you want the user to be active upon registration
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });

  export {
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
  };
