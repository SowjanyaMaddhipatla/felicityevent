// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../api";

// const EventDetails = () => {
//   const { id } = useParams();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await API.get(`/events/${id}`);
//         setEvent(res.data);
//       } catch (err) {
//         console.error(err);
//         setMessage("Failed to load event.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, [id]);

//   const handleRegister = async () => {
//     try {
//       await API.post(`/events/${id}/register`);
//       setMessage("Successfully registered!");
//     } catch (err) {
//       console.error(err);
//       setMessage("Registration failed.");
//     }
//   };

//   if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
//   if (!event) return <p style={{ textAlign: "center" }}>Event not found.</p>;

//   return (
//     <div style={styles.container}>
//       <h2>{event.title}</h2>

//       <p><strong>Description:</strong> {event.description}</p>
//       <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
//       <p><strong>Location:</strong> {event.location}</p>
//       <p><strong>Organiser:</strong> {event.OrganiserName || "N/A"}</p>

//       <button style={styles.button} onClick={handleRegister}>
//         Register
//       </button>

//       {message && <p style={styles.message}>{message}</p>}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "600px",
//     margin: "40px auto",
//     padding: "20px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     backgroundColor: "#fff",
//   },
//   button: {
//     marginTop: "15px",
//     padding: "10px 15px",
//     border: "none",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   message: {
//     marginTop: "15px",
//     fontWeight: "bold",
//   },
// };

// export default EventDetails;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      await API.post(`/events/${id}/register`);
      setMessage("Successfully registered!");
    } catch (err) {
      console.error(err);
      setMessage("Registration failed.");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!event) return <p style={{ textAlign: "center" }}>Event not found.</p>;

  return (
    <div style={styles.container}>
      <h2>{event.name}</h2>

      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Start:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
      <p><strong>End:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
      <p><strong>Type:</strong> {event.type}</p>
      <p><strong>Eligibility:</strong> {event.eligibility}</p>
      <p><strong>Organizer:</strong> {event.organiser?.firstName} {event.organiser?.lastName}</p>

      <button style={styles.button} onClick={handleRegister}>
        Register
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  button: {
    marginTop: "15px",
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    fontWeight: "bold",
  },
};

export default EventDetails;