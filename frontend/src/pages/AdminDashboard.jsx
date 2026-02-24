// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import API from "../api";
// // import EventList from "../components/EventList";



// // const AdminDashboard = () => {
// //   return (
// //     <div style={{ padding: "40px" }}>
// //       <h1>Admin Dashboard 👑</h1>
// //       <p>Welcome Admin</p>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;


// import { useState } from "react";
// import API from "../api";

// const AdminDashboard = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       await API.post(
//         "/admin/create-organiser",
//         formData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Organiser created successfully");
//       setFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//       });
//     } catch (error) {
//       alert(error.response?.data?.message || "Error creating organiser");
//     }
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Admin Dashboard 👑</h1>

//       <h2>Add Organiser</h2>

//       <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
//         <input
//           name="firstName"
//           placeholder="First Name"
//           value={formData.firstName}
//           onChange={handleChange}
//           required
//         />
//         <br /><br />

//         <input
//           name="lastName"
//           placeholder="Last Name"
//           value={formData.lastName}
//           onChange={handleChange}
//           required
//         />
//         <br /><br />

//         <input
//           name="email"
//           placeholder="Email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <br /><br />

//         <input
//           name="password"
//           placeholder="Password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <br /><br />

//         <button type="submit">Create Organiser</button>
//       </form>
//     </div>
//   );
// };

// export default AdminDashboard;


import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard 👑</h1>

      <div style={styles.card} onClick={() => navigate("/admin/add-organiser")}>
        ➕ Add Organiser
      </div>

      <div style={styles.card} onClick={() => navigate("/admin/remove-organiser")}>
        ❌ Remove Organiser
      </div>

      <div style={styles.card} onClick={() => navigate("/admin/view-organisers")}>
        👀 View All Organisers
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
  },
  card: {
    padding: "20px",
    margin: "15px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px",
  },
};

export default AdminDashboard;