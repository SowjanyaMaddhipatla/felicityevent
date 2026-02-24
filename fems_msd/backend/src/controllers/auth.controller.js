
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // // REGISTER
// // export const registerUser = async (req, res) => {
// //   try {
// //     const { firstName, lastName, email, password, role } = req.body;

// //     // Block organisers registering themselves
// //     if (role === "organiser") {
// //       return res.status(403).json({
// //         message: "Organiser accounts are provisioned by Admin",
// //       });
// //     }

// //     // Email must exist
// //     if (!firstName || !lastName || !email || !password) {
// //       return res.status(400).json({ message: "Missing participant profile fields" });
// //     }

// //     // Check if participant already exists
// //     const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
// //     if (existingUser) {
// //       return res.status(400).json({ message: "Email already registered" });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const user = await User.create({
// //       firstName: firstName.trim(),
// //       lastName: lastName.trim(),
// //       email: email.trim().toLowerCase(),
// //       password: hashedPassword,
// //       role,
// //     });

// //     const token = jwt.sign(
// //       { userId: user._id, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "7d" }
// //     );

// //     res.status(201).json({
// //       message: "User registered successfully",
// //       token,
// //       role: user.role,
// //     });
// //   } catch (error) {
// //     // Handle duplicate key error if unique index triggers
// //     if (error.code === 11000) {
// //       return res.status(400).json({ message: "Email already registered" });
// //     }
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// export const registerUser = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, participantType } = req.body;

//     // Email must exist
//     if (!firstName || !lastName || !email || !password || !participantType) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Check if participant already exists
//     const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       firstName: firstName.trim(),
//       lastName: lastName.trim(),
//       email: email.trim().toLowerCase(),
//       password: hashedPassword,
//       role: "participant", // 🔒 FORCE role
//       participantType,     // IIIT or non-IIIT
//     });

//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(201).json({
//       message: "User registered successfully",
//       token,
//       role: user.role,
//     });

//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(400).json({ message: "Email already registered" });
//     }
//     res.status(500).json({ message: error.message });
//   }
// };



// // // LOGIN
// // export const loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email || !password) {
// //       return res.status(400).json({ message: "Email and password required" });
// //     }

// //     const user = await User.findOne({ email: email.trim().toLowerCase() });

// //     if (!user) {
// //       return res.status(400).json({ message: "Invalid credentials" });
// //     }

// //     // ✅ NEW — Prevent archived users
// //     if (user.isArchived) {
// //       return res.status(403).json({
// //         message: "Account archived. Contact admin.",
// //       });
// //     }

// //     // ✅ NEW — Prevent disabled users
// //     if (!user.isActive) {
// //       return res.status(403).json({
// //         message: "Account disabled. Contact admin.",
// //       });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);

// //     if (!isMatch) {
// //       return res.status(400).json({ message: "Invalid credentials" });
// //     }

// //     const token = jwt.sign(
// //       { userId: user._id, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "7d" }
// //     );

// //     res.status(200).json({
// //       message: "Login successful",
// //       token,
// //       role: user.role,
// //     });

// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };


// // LOGIN
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }

//     const user = await User.findOne({ email: email.trim().toLowerCase() });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       role: user.role,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// -------------------
// USER REGISTRATION (ALL ROLES / auth-specific)
// -------------------
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, participantType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "participant", // default role for registration
      participantType: participantType === "iiit" ? "IIIT" : "Non-IIIT",
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "Registration successful", token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------
// LOGIN (ALL ROLES)
// -------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};