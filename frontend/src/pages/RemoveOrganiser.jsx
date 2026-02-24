import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const RemoveOrganiser = () => {
  const navigate = useNavigate();
  const [organisers, setOrganisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));

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

  /* ===========================
     Delete Organiser
  =========================== */
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete organiser "${name}"?\n\nAll events created by this organiser will also be deleted.`
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      const token = localStorage.getItem("token");

      await API.delete(`/admin/organiser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from UI instantly
      setOrganisers((prev) =>
        prev.filter((org) => org._id !== id)
      );

    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to delete organiser."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Remove Organiser</h1>

      <button
        style={styles.backButton}
        onClick={() => navigate("/admin/dashboard")}
      >
        ← Back to Dashboard
      </button>

      {loading && <p>Loading organisers...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && organisers.length === 0 && (
        <p>No organisers available.</p>
      )}

      {!loading && organisers.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Action</th>
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
                  <button
                    style={styles.deleteButton}
                    onClick={() =>
                      handleDelete(
                        org._id,
                        `${org.firstName} ${org.lastName}`
                      )
                    }
                    disabled={deletingId === org._id}
                  >
                    {deletingId === org._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
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
   Styling
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
  deleteButton: {
    padding: "6px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default RemoveOrganiser;