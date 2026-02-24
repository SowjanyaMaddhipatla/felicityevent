// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // Middleware to verify JWT
// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   console.log("Authorization header:", authHeader);
//   console.log("JWT Secret in middleware:", process.env.JWT_SECRET);

//   if (!authHeader)
//     return res.status(401).json({ message: "No token provided" });

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded token:", decoded);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.log("JWT ERROR:", err.message);
//     return res.status(403).json({ message: "Token is not valid" });
//   }
// };


// // Middleware for role-based access
// export const verifyRole = (roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res
//         .status(403)
//         .json({ message: "You do not have permission to access this route" });
//     }
//     next();
//   };
// };


// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// /*
//   Verify JWT Token
// */
// export const verifyToken = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Access denied. No token provided.",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Optional but recommended: check if user still exists
//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     req.user = user; // attach full user object
//     next();

//   } catch (error) {
//     return res.status(403).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };


// /*
//   Role-Based Authorization
//   Example:
//   verifyRole("admin")
//   verifyRole("organiser")
//   verifyRole("admin", "organiser")
// */
// export const verifyRole = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.user || !allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({
//         success: false,
//         message: "You do not have permission to access this route",
//       });
//     }
//     next();
//   };
// };





// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// /**
//  * Middleware to verify JWT token
//  */
// export const verifyToken = async (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     if (!authHeader)
//       return res.status(401).json({ message: "No token provided" });

//     const token = authHeader.split(" ")[1]; // Bearer <token>
//     if (!token)
//       return res.status(401).json({ message: "Token missing from header" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Attach user info to request
//     req.user = decoded;

//     // Optional: fetch user from DB for more info
//     const user = await User.findById(decoded.userId);
//     if (!user)
//       return res.status(401).json({ message: "User not found" });

//     req.user.role = user.role; // Ensure role is accurate from DB
//     next();
//   } catch (err) {
//     console.error("JWT Error:", err.message);
//     return res.status(403).json({ message: "Token is not valid" });
//   }
// };

// /**
//  * Middleware to verify roles
//  * @param {Array} roles - allowed roles
//  */
// export const verifyRole = (roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({
//         message: `Access denied. Allowed roles: ${roles.join(", ")}`,
//       });
//     }
//     next();
//   };
// };

import jwt from "jsonwebtoken";

// Verify JWT token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded should contain { userId, role }
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Role-based access control
export const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this route" });
    }
    next();
  };
};
