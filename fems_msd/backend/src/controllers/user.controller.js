// // import User from "../models/User.js";


// // /*
// //   GET ALL USERS (Admin only)
// // */
// // export const getAllUsers = async (req, res) => {
// //   try {
// //     const users = await User.find().select("-password");

// //     res.status(200).json({
// //       success: true,
// //       count: users.length,
// //       users,
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };


// // /*
// //   GET CURRENT USER PROFILE
// // */
// // export const getMyProfile = async (req, res) => {
// //   try {
// //     const user = await User.findById(req.user._id).select("-password");

// //     res.status(200).json({
// //       success: true,
// //       user,
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };


// // /*
// //   UPDATE CURRENT USER PROFILE
// // */
// // export const updateMyProfile = async (req, res) => {
// //   try {
// //     const { name, email } = req.body;

// //     const user = await User.findById(req.user._id);

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "User not found",
// //       });
// //     }

// //     if (name) user.name = name;
// //     if (email) user.email = email;

// //     await user.save();

// //     res.status(200).json({
// //       success: true,
// //       message: "Profile updated successfully",
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };


// // /*
// //   DELETE USER (Admin only)
// // */
// // export const deleteUser = async (req, res) => {
// //   try {
// //     const user = await User.findById(req.params.id);

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "User not found",
// //       });
// //     }

// //     await user.deleteOne();

// //     res.status(200).json({
// //       success: true,
// //       message: "User deleted successfully",
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };





// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // -------------------
// // PARTICIPANT REGISTRATION
// // -------------------
// export const registerParticipant = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;

//     // Email validation for IIIT participants
//     const iiitDomain = "@iiit.ac.in";
//     const isIIIT = email.endsWith(iiitDomain);
//     if (isIIIT === false && !password) {
//       return res.status(400).json({ message: "Password is required for non-IIIT participants" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const participant = await User.create({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       role: "participant",
//       participantType: isIIIT ? "IIIT" : "Non-IIIT",
//     });

//     const token = jwt.sign({ userId: participant._id, role: participant.role }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.status(201).json({ message: "Participant registered", token, role: participant.role });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------
// // USER LOGIN (ALL ROLES)
// // -------------------
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.status(200).json({ message: "Login successful", token, role: user.role });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------
// // GET PROFILE (All logged-in users)
// // -------------------
// export const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------
// // UPDATE PROFILE (Participant Only)
// // -------------------

// export const updateProfile = async (req, res) => {
//   try {
//     const updates = req.body;
//     const user = await User.findById(req.user.userId);

//     if (!user) return res.status(404).json({ message: "User not found" });
//     if (user.role !== "participant") return res.status(403).json({ message: "Only participants can update profile" });

//     const editableFields = [
//       "firstName",
//       "lastName",
//       "contactNumber",
//       "collegeName",
//       "interests",
//       "followedOrganisers"
//     ];

//     editableFields.forEach((field) => {
//       if (updates[field] !== undefined) user[field] = updates[field];
//     });

//     await user.save();

//     const userObj = user.toObject();
//     delete userObj.password;

//     res.status(200).json({ message: "Profile updated", user: userObj });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import User from "../models/User.js";
import bcrypt from "bcryptjs";

// -------------------
// GET PROFILE (ALL LOGGED-IN USERS)
// -------------------
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------
// UPDATE PROFILE (PARTICIPANT ONLY)
// -------------------
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "participant")
      return res.status(403).json({ message: "Only participants can update profile" });

    const editableFields = [
      "firstName",
      "lastName",
      "contactNumber",
      "collegeName",
      "interests",
      "followedOrganisers",
    ];

    editableFields.forEach((field) => {
      if (updates[field] !== undefined) {
        if (
          (field === "interests" || field === "followedOrganisers") &&
          typeof updates[field] === "string"
        ) {
          user[field] = updates[field].split(",").map((i) => i.trim());
        } else {
          user[field] = updates[field];
        }
      }
    });

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ message: "Profile updated", user: userObj });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------
// CHANGE PASSWORD
// -------------------
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};