// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav style={styles.nav}>
//       <h2 style={styles.logo}>EventHub</h2>
//       <div>
//         <Link to="/browse-events" style={styles.link}>
//           Browse Events
//         </Link>
//         <Link to="/Organisers" style={styles.link}>
//           Organisers
//         </Link>
//         <Link to="/profile" style={styles.link}>
//           Profile
//         </Link>
//       </div>
//     </nav>
//   );
// };

// const styles = {
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "15px 40px",
//     backgroundColor: "#1f2937",
//     color: "white",
//   },
//   logo: {
//     margin: 0,
//   },
//   link: {
//     marginLeft: "20px",
//     textDecoration: "none",
//     color: "white",
//     fontWeight: "500",
//   },
// };

// export default Navbar;


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav style={styles.nav}>
//       <h2 style={styles.logo}>EventHub</h2>

//       <div>
//         {/* PARTICIPANT NAV */}
//         {user?.role === "participant" && (
//           <>
//             <Link to="/participant/dashboard" style={styles.link}>
//               Dashboard
//             </Link>
//             <Link to="/browse-events" style={styles.link}>
//               Browse Events
//             </Link>
//             <Link to="/Organisers" style={styles.link}>
//               Organisers
//             </Link>
//             <Link to="/profile" style={styles.link}>
//               Profile
//             </Link>
//           </>
//         )}

        
//         {/* ADMIN NAV (FOR MARKS REQUIREMENT) */}
//         {user?.role === "admin" && (
//           <>
//             <Link to="/admin/dashboard" style={styles.link}>
//               Dashboard
//             </Link>
//             <Link to="/admin/manage-organisers" style={styles.link}>
//               Manage Clubs
//             </Link>
//             <Link to="/admin/password-requests" style={styles.link}>
//               Password Reset Requests
//             </Link>
//           </>
//         )}

//         {user?.role === "organiser" && (
//           <>
//             <Link to="/organiser" style={styles.link} >Dashboard </Link>
//             <Link to="/create-event" style={styles.link}>Create Event</Link>
//             <Link to="/organiser/events" style={styles.link}>Ongoing Events</Link>
//             <Link to="/organiser/profile" style={styles.link}>Profile</Link>
//           </>
//         )}
//         {/* LOGOUT BUTTON (ALL ROLES) */}
//         {user && (
//           <button onClick={handleLogout} style={styles.logoutButton}>
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// const styles = {
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "15px 40px",
//     backgroundColor: "#1f2937",
//     color: "white",
//   },
//   logo: {
//     margin: 0,
//   },
//   link: {
//     marginLeft: "20px",
//     textDecoration: "none",
//     color: "white",
//     fontWeight: "500",
//   },
//   logoutButton: {
//     marginLeft: "20px",
//     padding: "6px 12px",
//     backgroundColor: "#dc3545",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//   },
// };

// export default Navbar;




import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>EventHub</h2>

      <div>
        {/* PARTICIPANT NAV */}
        {user?.role === "participant" && (
          <>
            <Link to="/participant/dashboard" style={styles.link}>
              Dashboard
            </Link>
            <Link to="/browse-events" style={styles.link}>
              Browse Events
            </Link>
            <Link to="/organisers" style={styles.link}>
              Organisers
            </Link>
            <Link to="/profile" style={styles.link}>
              Profile
            </Link>
          </>
        )}

        {/* ADMIN NAV */}
        {user?.role === "admin" && (
          <>
            <Link to="/admin/dashboard" style={styles.link}>
              Dashboard
            </Link>
            <Link to="/admin/manage-organisers" style={styles.link}>
              Manage Clubs
            </Link>
            <Link to="/admin/password-requests" style={styles.link}>
              Password Reset Requests
            </Link>
          </>
        )}

        {/* ORGANISER NAV */}
        {user?.role === "organiser" && (
          <>
            <Link to="/organiser/dashboard" style={styles.link}>
              Dashboard
            </Link>
            <Link to="/create-event" style={styles.link}>Create Event</Link>
           
            <Link to="/organiser/events" style={styles.link}>
              Ongoing Events
            </Link>
            <Link to="/profile" style={styles.link}>
              Profile
            </Link>
          </>
        )}

        {/* LOGOUT */}
        {user && (
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#1f2937",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  link: {
    marginLeft: "20px",
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
  },
  logoutButton: {
    marginLeft: "20px",
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Navbar;