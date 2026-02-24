import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const ViewOrganisers = () => {
  const navigate = useNavigate();
  const [organisers, setOrganisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ===========================
     Fetch Organisers
  =========================== */
  const fetchOrganisers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/admin/organisers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrganisers(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch organisers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganisers();
  }, []);

  return (
    <div style={styles.container}>
      <h1>All Organisers</h1>

      <button
        style={styles.backButton}
        onClick={() => navigate("/admin/dashboard")}
      >
        ← Back to Dashboard
      </button>

      {loading && <p>Loading organisers...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && organisers.length === 0 && (
        <p>No organisers found.</p>
      )}

      {!loading && organisers.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {organisers.map((org) => (
              <tr key={org._id}>
                <td style={styles.td}>
                  {org.firstName} {org.lastName}
                </td>
                <td style={styles.td}>{org.email}</td>
                <td style={styles.td}>
                  {new Date(org.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

/* ===========================
   Simple Styling
=========================== */
const styles = {
  container: {
    padding: "40px",
    maxWidth: "900px",
    margin: "auto",
  },
  backButton: {
    marginBottom: "20px",
    padding: "8px 12px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    borderBottom: "2px solid #ccc",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    borderBottom: "1px solid #eee",
    padding: "10px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default ViewOrganisers;