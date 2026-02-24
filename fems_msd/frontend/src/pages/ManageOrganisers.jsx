// import { useEffect, useState } from "react";
// import API from "../api";

// const ManageOrganisers = () => {
//   const [organisers, setOrganisers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchOrganisers = async () => {
//     try {
//       const res = await API.get("/admin/organisers");
//       setOrganisers(res.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to load organisers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrganisers();
//   }, []);

//   const handleDisable = async (id) => {
//     try {
//       await API.patch(`/admin/organiser/${id}/disable`);
//       fetchOrganisers();
//     } catch (err) {
//       alert("Failed to disable organiser");
//     }
//   };

//   const handleArchive = async (id) => {
//     try {
//       await API.patch(`/admin/organiser/${id}/archive`);
//       fetchOrganisers();
//     } catch (err) {
//       alert("Failed to archive organiser");
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure? This will permanently delete the organiser and their events."
//     );
//     if (!confirmDelete) return;

//     try {
//       await API.delete(`/admin/organiser/${id}`);
//       fetchOrganisers();
//     } catch (err) {
//       alert("Failed to delete organiser");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Manage Clubs / Organisers</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p style={styles.error}>{error}</p>}

//       {!loading && organisers.length === 0 && (
//         <p>No organisers found.</p>
//       )}

//       {!loading && organisers.length > 0 && (
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {organisers.map((org) => (
//               <tr key={org._id}>
//                 <td>{org.firstName} {org.lastName}</td>
//                 <td>{org.email}</td>
//                 <td>
//                   {org.isArchived
//                     ? "Archived"
//                     : org.isActive
//                     ? "Active"
//                     : "Disabled"}
//                 </td>
//                 <td>
//                   {!org.isArchived && (
//                     <>
//                       {org.isActive && (
//                         <button
//                           style={styles.disableBtn}
//                           onClick={() => handleDisable(org._id)}
//                         >
//                           Disable
//                         </button>
//                       )}
//                       <button
//                         style={styles.archiveBtn}
//                         onClick={() => handleArchive(org._id)}
//                       >
//                         Archive
//                       </button>
//                     </>
//                   )}

//                   <button
//                     style={styles.deleteBtn}
//                     onClick={() => handleDelete(org._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "40px",
//     maxWidth: "1000px",
//     margin: "auto",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "20px",
//   },
//   error: {
//     color: "red",
//   },
//   disableBtn: {
//     marginRight: "8px",
//     padding: "6px 10px",
//     backgroundColor: "#f59e0b",
//     border: "none",
//     cursor: "pointer",
//   },
//   archiveBtn: {
//     marginRight: "8px",
//     padding: "6px 10px",
//     backgroundColor: "#6b7280",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//   },
//   deleteBtn: {
//     padding: "6px 10px",
//     backgroundColor: "#dc2626",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//   },
// };

// export default ManageOrganisers;

















import { useEffect, useState } from "react";
import API from "../api";

const ManageOrganisers = () => {
  const [organisers, setOrganisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrganisers = async () => {
    try {
      const res = await API.get("/admin/organisers");
      setOrganisers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load organisers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganisers();
  }, []);

  const handleToggleStatus = async (id) => {
    try {
      await API.patch(`/admin/organiser/${id}/disable`);
      fetchOrganisers();
    } catch {
      alert("Failed to update organiser status");
    }
  };

  const handleArchive = async (id) => {
    try {
      await API.patch(`/admin/organiser/${id}/archive`);
      fetchOrganisers();
    } catch {
      alert("Failed to update archive status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete organiser and all their events?")) return;

    try {
      await API.delete(`/admin/organiser/${id}`);
      fetchOrganisers();
    } catch {
      alert("Failed to delete organiser");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Manage Clubs / Organisers</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && organisers.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {organisers.map((org) => (
              <tr key={org._id}>
                <td>{org.firstName} {org.lastName}</td>
                <td>{org.email}</td>
                <td>
                  {org.isArchived
                    ? "Archived"
                    : org.isActive
                      ? "Active"
                      : "Disabled"}
                </td>
                <td style={styles.actionsCell}>
                  <button
                    style={
                      org.isActive
                        ? styles.disableBtn
                        : styles.enableBtn
                    }
                    onClick={() => handleToggleStatus(org._id)}
                  >
                    {org.isActive ? "Disable" : "Enable"}
                  </button>

                  <button
                    style={
                      org.isArchived
                        ? styles.restoreBtn
                        : styles.archiveBtn
                    }
                    onClick={() => handleArchive(org._id)}
                  >
                    {org.isArchived ? "Restore" : "Archive"}
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(org._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && organisers.length === 0 && (
        <p>No organisers found.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "1100px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  actionsCell: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  error: {
    color: "red",
  },
  disableBtn: {
    padding: "6px 12px",
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  enableBtn: {
    padding: "6px 12px",
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  archiveBtn: {
    padding: "6px 12px",
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  restoreBtn: {
    padding: "6px 12px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 12px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ManageOrganisers;