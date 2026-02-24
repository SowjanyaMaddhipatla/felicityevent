// // import express from "express";
// // import {
// //   getAllUsers,
// //   getMyProfile,
// //   updateMyProfile,
// //   deleteUser,
// // } from "../controllers/user.controller.js";

// // import {
// //   verifyToken,
// //   verifyRole,
// // } from "../middleware/auth.middleware.js";

// // const router = express.Router();

// // /*
// //   ADMIN ROUTES
// // */

// // // Get all users
// // router.get(
// //   "/",
// //   verifyToken,
// //   verifyRole("admin"),
// //   getAllUsers
// // );

// // // Delete user
// // router.delete(
// //   "/:id",
// //   verifyToken,
// //   verifyRole("admin"),
// //   deleteUser
// // );


// // /*
// //   AUTHENTICATED USER ROUTES
// // */

// // // Get own profile
// // router.get(
// //   "/me",
// //   verifyToken,
// //   getMyProfile
// // );

// // // Update own profile
// // router.put(
// //   "/me",
// //   verifyToken,
// //   updateMyProfile
// // );

// // export default router;


// import express from "express";
// import User from "../models/User.js";
// import {
//   registerParticipant,
//   loginUser,
//   getProfile,
//   updateProfile,
// } from "../controllers/user.controller.js";
// import { verifyToken, verifyRole } from "../middleware/auth.middleware.js";

// const router = express.Router();

// // Participant Registration
// router.post("/register", registerParticipant);

// // Login (all users)
// router.post("/login", loginUser);

// // Get user profile (all logged-in users)
// router.get("/profile", verifyToken, getProfile);


// router.get("/organisers", verifyToken, async (req, res) => {
//   try {
//     const organisers = await User.find({ role: "organiser" })
//       .select("-password");

//     res.json(organisers);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching organisers" });
//   }
// });

// export default router;








import express from "express";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/user.controller.js";
import { verifyToken, verifyRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get logged-in user profile
router.get("/profile", verifyToken, getProfile);

// Update profile (participants only)
router.put("/profile", verifyToken, verifyRole(["participant"]), updateProfile);

// Change password
router.put("/change-password", verifyToken, changePassword);

// Get all organisers (any logged-in user)
// router.get("/organisers", verifyToken, async (req, res) => {
//   try {
//     const organisers = await User.find({ role: "organiser" }).select("-password");
//     res.json(organisers);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching organisers" });
//   }
// });


router.get("/organisers", verifyToken, async (req, res) => {
  try {
    // Include virtuals using .lean({ virtuals: true })
    const organisers = await User.find({ role: "organiser" })
      .select("-password")
      .lean({ virtuals: true }); // <-- this ensures 'name' virtual is available

    res.json(organisers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching organisers" });
  }
});



export default router;