// // export default OrganiserDashboard;
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";
// import EventList from "../components/EventList";

// const OrganiserDashboard = () => {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const fetchMyEvents = async () => {
//       try {
//         const res = await API.get("/events/my-events"); 
//         setEvents(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load your events");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyEvents();
//   }, []);

//   const handleEventClick = (event) => {
//     navigate(`/events/${event._id}`);
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h2>Welcome, {user?.name || "Organiser"}</h2>
//         <button
//           style={styles.createBtn}
//           onClick={() => navigate("/create-event")}
//         >
//           + Create Event
//         </button>
//       </div>

//       {loading && <p>Loading your events...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {!loading && !error && (
//         <>
//           <h3>Your Events</h3>
//           <EventList events={events} onEventClick={handleEventClick} />
//         </>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "1000px",
//     margin: "40px auto",
//     padding: "20px",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "20px",
//   },
//   createBtn: {
//     padding: "8px 14px",
//     backgroundColor: "#28a745",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default OrganiserDashboard;






// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api";

// export default function OrganiserDashboard() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const res = await api.get("/events/my-events");
//       setEvents(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>My Events</h2>

//       {events.length === 0 && <p>No events created yet.</p>}

//       <div style={{ display: "grid", gap: "20px" }}>
//         {events.map((event) => (
//           <div
//             key={event._id}
//             style={{
//               padding: "20px",
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//             }}
//           >
//             <h3>{event.title}</h3>
//             <p>{event.description}</p>

//             <p>
//               <strong>Status:</strong>{" "}
//               {event.isArchived
//                 ? "Archived"
//                 : event.isActive
//                 ? "Active"
//                 : "Draft"}
//             </p>

//             <Link to={`/organiser/event/${event._id}`}>
//               Manage Event
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function OrganiserDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events/my-events");
      setEvents(res.data.events || res.data); // Adjust to backend response
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>My Events</h2>

      {events.length === 0 && <p>No events created yet.</p>}

      <div style={{ display: "grid", gap: "20px" }}>
        {events.map((event) => (
          <div
            key={event._id}
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h3>{event.title}</h3>
            <p>{event.description}</p>

            <p>
              <strong>Status:</strong>{" "}
              {event.isArchived
                ? "Archived"
                : event.isActive
                ? "Active"
                : "Draft"}
            </p>

            <Link to={`/organiser/event/${event._id}`}>
              Manage Event
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}