import User from "../models/user.model.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // generate token
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      // generate token
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc logout user / clear cookie
// @route POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: new Date(0), //expire
  });

  res.status(200).json({ message: "logout successfully" });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  // if user authorized by the auth middleware, then in the request there is a user object
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    throw new Error("User not found");
  }
});

// @desc update user profile
// @route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // update only the frontend updated fields only
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    /*if user updated their password, then only this block will trigger, because we created a method in the user model to 
    hash the password when the password is changed by the user, It will automatically trigger if user changes the password field
    */
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    throw new Error("User not found");
  }
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
