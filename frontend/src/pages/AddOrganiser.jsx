import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // your axios instance

const AddOrganiser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ===========================
     Handle Input Change
  =========================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ===========================
     Handle Submit
  =========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await API.post(
        "/admin/create-organiser",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Organiser created successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Add Organiser</h1>

      <button
        style={styles.backButton}
        onClick={() => navigate("/admin/dashboard")}
      >
        ← Back to Dashboard
      </button>

      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Create Organiser"}
        </button>
      </form>
    </div>
  );
};

/* ===========================
   Simple Inline Styling
=========================== */
const styles = {
  container: {
    padding: "40px",
    maxWidth: "500px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    cursor: "pointer",
  },
  backButton: {
    marginBottom: "20px",
    padding: "8px 12px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  success: {
    color: "green",
    marginBottom: "10px",
  },
};

export default AddOrganiser;