// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
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
//       const res = await API.post("/auth/login", formData);

//       // Store token & user info
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // Redirect based on role
//       if (res.data.user.role === "organizer") {
//         navigate("/organizer/dashboard");
//       } else {
//         navigate("/participant/dashboard");
//       }

//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Login</h2>

//       {error && <p style={styles.error}>{error}</p>}

//       <form onSubmit={handleSubmit} style={styles.form}>
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

//         <button type="submit" disabled={loading} style={styles.button}>
//           {loading ? "Logging in..." : "Login"}
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
//     backgroundColor: "#007bff",
//     color: "#fff",
//     cursor: "pointer",
//   },
//   error: {
//     color: "red",
//   },
// };

// export default Login;


// /*<p>
//   Don't have an account? <Link to="/register">Register</Link>
// </p>
//  */


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", formData);

      // Store token and user info safely
      const userData = {
        role: res.data.role,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
      };
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));

     // Redirect based on role
if (res.data.role === "admin") {
  navigate("/admin/dashboard");
} else if (res.data.role === "organiser") {
  navigate("/organiser/dashboard");
} else if (res.data.role === "participant") {
  navigate("/participant/dashboard");
} else {
  navigate("/");
}


    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
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

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
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
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
};

export default Login;
