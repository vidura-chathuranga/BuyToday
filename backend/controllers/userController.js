import User from "../models/user.model.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

// @desc register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

// @desc logout user / clear cookie
// @route POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

// @desc Get user profile
// @route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send(" get user profile");
});

// @desc update user profile
// @route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

// @desc Get Users
// @route GET /api/users/
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// @desc Get Users by Id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by ID");
});

// @desc Delete users
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// @desc Update users
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
