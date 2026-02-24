// import { useEffect, useState } from "react";
// import API from "../api";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//   });
//   const [editing, setEditing] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await API.get("/users/profile");
//         setUser(res.data);
//         setFormData({
//           name: res.data.name,
//           email: res.data.email,
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load profile");
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       const res = await API.put("/users/profile", formData);
//       setUser(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));
//       setEditing(false);
//       setMessage("Profile updated successfully!");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile");
//     }
//   };

//   if (!user) return <p style={{ textAlign: "center" }}>Loading profile...</p>;

//   return (
//     <div style={styles.container}>
//       <h2>My Profile</h2>

//       {message && <p style={styles.success}>{message}</p>}
//       {error && <p style={styles.error}>{error}</p>}

//       {!editing ? (
//         <div style={styles.profileBox}>
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Role:</strong> {user.role}</p>

//           <button style={styles.button} onClick={() => setEditing(true)}>
//             Edit Profile
//           </button>
//         </div>
//       ) : (
//         <form onSubmit={handleUpdate} style={styles.form}>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />

//           <div style={{ display: "flex", gap: "10px" }}>
//             <button type="submit" style={styles.button}>
//               Save
//             </button>
//             <button
//               type="button"
//               style={styles.cancelBtn}
//               onClick={() => setEditing(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "500px",
//     margin: "60px auto",
//     padding: "25px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     backgroundColor: "#fff",
//   },
//   profileBox: {
//     marginTop: "20px",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//     marginTop: "20px",
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     padding: "8px 14px",
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   cancelBtn: {
//     padding: "8px 14px",
//     backgroundColor: "#6c757d",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   success: {
//     color: "green",
//   },
//   error: {
//     color: "red",
//   },
// };

// export default Profile;










import { useEffect, useState } from "react";
import API from "../api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    collegeName: "",
    interests: "",
    followedOrganisers: "",
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        const data = res.data.user;

        setUser(data);

        // Convert arrays to comma-separated strings for form inputs
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          contactNumber: data.contactNumber || "",
          collegeName: data.collegeName || "",
          interests: (data.interests || []).join(", "),
          followedOrganisers: (data.followedOrganisers || []).map(f => f.name).join(", "),
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // Convert comma-separated strings back to arrays
      const updatePayload = {
        ...formData,
        interests: formData.interests.split(",").map(i => i.trim()).filter(Boolean),
        followedOrganisers: formData.followedOrganisers.split(",").map(i => ({ name: i.trim() })).filter(Boolean),
      };

      const res = await API.put("/users/profile", updatePayload);
      const updatedUser = res.data.user;

      setUser(updatedUser);
      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;

  return (
    <div style={styles.container}>
      <h2>My Profile</h2>

      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!editing ? (
        <div style={styles.profileBox}>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Participant Type:</strong> {user.participantType}</p>
          <p><strong>Contact Number:</strong> {user.contactNumber || "N/A"}</p>
          <p><strong>College/Organization:</strong> {user.collegeName || "N/A"}</p>
          <p><strong>Interests:</strong> {(user.interests || []).join(", ") || "N/A"}</p>
          <p><strong>Followed Organisers:</strong> {(user.followedOrganisers || []).map(f => f.name).join(", ") || "N/A"}</p>

          <button style={styles.button} onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdate} style={styles.form}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="First Name"
            style={styles.input}
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Last Name"
            style={styles.input}
          />
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            style={styles.input}
          />
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            placeholder="College / Organization Name"
            style={styles.input}
          />
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="Interests (comma-separated)"
            style={styles.input}
          />
          <input
            type="text"
            name="followedOrganisers"
            value={formData.followedOrganisers}
            onChange={handleChange}
            placeholder="Followed Organisers (comma-separated)"
            style={styles.input}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" style={styles.button}>Save</button>
            <button type="button" style={styles.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: "600px", margin: "60px auto", padding: "25px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" },
  profileBox: { marginTop: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" },
  input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "8px 14px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  cancelBtn: { padding: "8px 14px", backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  success: { color: "green" },
  error: { color: "red" },
};

export default Profile;