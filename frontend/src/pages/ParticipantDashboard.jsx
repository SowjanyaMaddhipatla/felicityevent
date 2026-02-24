// import React, { useEffect, useState } from "react";
// import api from "../api";
// import EventList from "../components/EventList";

// const ParticipantDashboard = () => {
//   const [upcomingEvents, setUpcomingEvents] = useState([]);
//   const [historyEvents, setHistoryEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const resUpcoming = await api.get("/events/upcoming", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUpcomingEvents(resUpcoming.data);

//         const resHistory = await api.get("/events/history", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setHistoryEvents(resHistory.data);
//       } catch (err) {
//         console.error(err.response?.data || err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, [token]);

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Participant Dashboard</h1>

//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-2">Upcoming Events</h2>
//         {upcomingEvents.length ? (
//           <EventList events={upcomingEvents} />
//         ) : (
//           <p>No upcoming events</p>
//         )}
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold mb-2">Participation History</h2>
//         {historyEvents.length ? (
//           <EventList events={historyEvents} />
//         ) : (
//           <p>No past events</p>
//         )}
//       </section>
//     </div>
//   );
// };

// export default ParticipantDashboard;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import EventList from "../components/EventList";

const ParticipantDashboard = () => {
  const navigate = useNavigate();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const registeredRes = await API.get("/events/my-registrations");
        const recommendedRes = await API.get("/events");

        setRegisteredEvents(registeredRes.data);
        setRecommendedEvents(recommendedRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleEventClick = (event) => {
    navigate(`/events/${event._id}`);
  };

  return (
    <div style={styles.container}>
      <h2>Welcome, {user?.name || "Participant"}</h2>

      {loading && <p>Loading dashboard...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <section style={styles.section}>
            <h3>Your Registered Events</h3>
            {registeredEvents.length === 0 ? (
              <p>You haven't registered for any events yet.</p>
            ) : (
              <EventList
                events={registeredEvents}
                onEventClick={handleEventClick}
              />
            )}
          </section>

          <section style={styles.section}>
            <h3>Explore Events</h3>
            <EventList
              events={recommendedEvents}
              onEventClick={handleEventClick}
            />
          </section>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "20px",
  },
  section: {
    marginTop: "30px",
  },
};

export default ParticipantDashboard;
