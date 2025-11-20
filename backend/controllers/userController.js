// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import validator from "validator";
// import userModel from "../models/userModel.js";

// // INFO: Function to create token
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };

// // INFO: Route for user login
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid email or password" });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);

//     if (isPasswordCorrect) {
//       const token = createToken(user._id);
//       res.status(200).json({ success: true, token });
//     } else {
//       res
//         .status(400)
//         .json({ success: false, message: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.log("Error while logging in user: ", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // INFO: Route for user registration
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // INFO: Check if user already exists
//     const userExists = await userModel.findOne({ email });
//     if (userExists) {
//       return res
//         .status(400)
//         .json({ success: false, message: "User already exists" });
//     }

//     // INFO: Validating email and password
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ success: false, message: "Invalid email" });
//     }
//     if (password.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 8 characters",
//       });
//     }

//     // INFO: Hashing user password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // INFO: Create new user
//     const newUser = new userModel({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     // INFO: Save user to database
//     const user = await newUser.save();

//     // INFO: Create token
//     const token = createToken(user._id);

//     // INFO: Return success response
//     res.status(200).json({ success: true, token });
//   } catch (error) {
//     console.log("Error while registering user: ", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // INFO: Route for admin login
// const loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (
//       email === process.env.ADMIN_EMAIL &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       const token = jwt.sign(email + password, process.env.JWT_SECRET);

//       res.status(200).json({ success: true, token });
//     } else {
//       res
//         .status(400)
//         .json({ success: false, message: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.log("Error while logging in admin: ", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export { loginUser, registerUser, loginAdmin };

// backend/controllers/userController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";

// INFO: Function to create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// INFO: Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const token = createToken(user._id);
      return res.status(200).json({
        success: true,
        token,
        user: { _id: user._id, name: user.name, email: user.email },
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error while logging in user: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // INFO: Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // INFO: Validating email and password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // INFO: Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // INFO: Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // INFO: Save user to database
    const user = await newUser.save();

    // INFO: Create token
    const token = createToken(user._id);

    // INFO: Return success response
    return res.status(201).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log("Error while registering user: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.status(200).json({ success: true, token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error while logging in admin: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: GET profile (protected)
const getProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error while fetching profile:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch profile" });
  }
};

// INFO: PUT update profile (protected)
const updateProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) {
      if (!validator.isEmail(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email" });
      }
      user.email = email;
    }
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters",
        });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updated = await user.save();

    const token = createToken(updated._id);
    const safeUser = {
      _id: updated._id,
      name: updated.name,
      email: updated.email,
    };

    return res.status(200).json({ success: true, user: safeUser, token });
  } catch (error) {
    console.error("Error while updating profile:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update profile" });
  }
};

export { loginUser, registerUser, loginAdmin, getProfile, updateProfile };
