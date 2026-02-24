// import React from "react";
// import { Navigate } from "react-router-dom";

// /**
//  * ProtectedRoute ensures only authenticated users with the correct role
//  * can access certain routes.
//  *
//  * @param {ReactNode} children - The component to render if allowed
//  * @param {string[]} roles - Array of allowed roles, e.g., ["participant"]
//  */
// const ProtectedRoute = ({ children, roles = [] }) => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user")); // user info stored on login

//   if (!token || !user) {
//     // Not logged in
//     return <Navigate to="/login" replace />;
//   }

//   if (roles.length > 0 && !roles.includes(user.role)) {
//     // Logged in but role not allowed
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;






import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute ensures only authenticated users with the correct role
 * can access certain routes.
 *
 * @param {ReactNode} children - The component to render if allowed
 * @param {string[]} roles - Array of allowed roles, e.g., ["participant"]
 */
const ProtectedRoute = ({ children, roles = [] }) => {
  const token = localStorage.getItem("token");

  // Safe JSON parse
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (!token || !user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    // Logged in but role not allowed
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
