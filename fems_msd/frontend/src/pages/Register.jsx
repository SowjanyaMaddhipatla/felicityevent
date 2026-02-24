// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "participant", // default role
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await API.post("/auth/register", formData);
//       alert("Registration successful! Please login.");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Register</h2>

//       {error && <p style={styles.error}>{error}</p>}

//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />

//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           style={styles.input}
//         >
//           <option value="participant">Participant</option>
//           <option value="organizer">Organizer</option>
//         </select>

//         <button type="submit" disabled={loading} style={styles.button}>
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "80px auto",
//     padding: "30px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     textAlign: "center",
//     backgroundColor: "#fff",
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
//     padding: "10px",
//     borderRadius: "5px",
//     border: "none",
//     backgroundColor: "#28a745",
//     color: "#fff",
//     cursor: "pointer",
//   },
//   error: {
//     color: "red",
//   },
// };

// export default Register;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    participantType: "iiit", // default // default role
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // POST request to backend
      await API.post("/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

      <label style={styles.label}>Participant Type</label>

<select
  name="participantType"
  value={formData.participantType}
  onChange={handleChange}
  required
  style={styles.input}
>
  <option value="iiit">IIIT</option>
  <option value="non-iiit">Non-IIIT</option>
</select>



        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
};

export default Register;
