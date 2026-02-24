

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api";
// import Fuse from "fuse.js";

// const BrowseEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [filters, setFilters] = useState({
//     type: "all",
//     eligibility: "all",
//     startDate: "",
//     endDate: "",
//   });

//   const [error, setError] = useState(null);

//   // 1️⃣ Fetch all events once
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         const res = await api.get("/events", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setEvents(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch events");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   // 2️⃣ Apply search + filters locally
//   useEffect(() => {
//     let temp = [...events];

//     // Type filter
//     if (filters.type !== "all") {
//       temp = temp.filter((e) => e.type === filters.type);
//     }

//     // Eligibility filter
//     if (filters.eligibility !== "all") {
//       temp = temp.filter((e) => e.eligibility === filters.eligibility);
//     }

//     // Date range filter
//     if (filters.startDate) {
//       temp = temp.filter((e) => new Date(e.startDate) >= new Date(filters.startDate));
//     }
//     if (filters.endDate) {
//       temp = temp.filter((e) => new Date(e.endDate) <= new Date(filters.endDate));
//     }

//     // Fuzzy search
//     if (search) {
//       const fuse = new Fuse(temp, {
//         keys: ["name", "organiser.firstName", "organiser.lastName"],
//         threshold: 0.3,
//       });
//       temp = fuse.search(search).map((r) => r.item);
//     }

//     setFilteredEvents(temp);
//   }, [events, search, filters]);

//   // Trending
//   const trendingEvents = events
//     .filter((e) => new Date(e.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000))
//     .sort((a, b) => b.participants.length - a.participants.length)
//     .slice(0, 5);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Browse Events</h1>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search events or organisers..."
//         className="border p-2 mb-4 w-full"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Filters */}
//       <div className="flex gap-4 mb-4 flex-wrap">
//         <select
//           value={filters.type}
//           onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//           className="border p-2"
//         >
//           <option value="all">All Types</option>
//           <option value="normal">Normal</option>
//           <option value="merchandise">Merchandise</option>
//         </select>

//         <select
//           value={filters.eligibility}
//           onChange={(e) => setFilters({ ...filters, eligibility: e.target.value })}
//           className="border p-2"
//         >
//           <option value="all">All Participants</option>
//           <option value="IIIT Only">IIIT Only</option>
//         </select>

//         <input
//           type="date"
//           value={filters.startDate}
//           onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
//           className="border p-2"
//         />
//         <input
//           type="date"
//           value={filters.endDate}
//           onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
//           className="border p-2"
//         />
//       </div>

//       {loading && <p>Loading events...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Trending */}
//       {trendingEvents.length > 0 && (
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Trending (24h)</h2>
//           {trendingEvents.map((e) => (
//             <Link
//               key={e._id}
//               to={`/events/${e._id}`}
//               className="border p-4 rounded hover:bg-gray-100 block mb-2"
//             >
//               <h3 className="font-bold">{e.name}</h3>
//               <p>Organizer: {e.organiser?.firstName} {e.organiser?.lastName}</p>
//               <p>Type: {e.type}</p>
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* Filtered events */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2">All Events</h2>
//         {filteredEvents.length === 0 ? (
//           <p>No events found.</p>
//         ) : (
//           filteredEvents.map((e) => (
//             <Link
//               key={e._id}
//               to={`/events/${e._id}`}
//               className="border p-4 rounded hover:bg-gray-100 block mb-2"
//             >
//               <h3 className="font-bold">{e.name}</h3>
//               <p>Organizer: {e.organiser?.firstName} {e.organiser?.lastName}</p>
//               <p>Type: {e.type}</p>
//               <p>Eligibility: {e.eligibility}</p>
//               <p>Dates: {new Date(e.startDate).toLocaleDateString()} - {new Date(e.endDate).toLocaleDateString()}</p>
//             </Link>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default BrowseEvents;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Fuse from "fuse.js";
import "./BrowseEvents.css";

const BrowseEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    eligibility: "all",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState(null);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await api.get("/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter + fuzzy search
  useEffect(() => {
    let temp = [...events];

    if (filters.type !== "all") {
      temp = temp.filter((e) => e.type === filters.type);
    }

    if (filters.eligibility !== "all") {
      temp = temp.filter((e) => e.eligibility === filters.eligibility);
    }

    if (filters.startDate) {
      temp = temp.filter(
        (e) => new Date(e.startDate) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      temp = temp.filter(
        (e) => new Date(e.endDate) <= new Date(filters.endDate)
      );
    }

    if (search) {
      const fuse = new Fuse(temp, {
        keys: ["name", "organiser.firstName", "organiser.lastName"],
        threshold: 0.3,
      });
      temp = fuse.search(search).map((r) => r.item);
    }

    setFilteredEvents(temp);
  }, [events, search, filters]);

  // Trending: top 5 events in last 24h
  const trendingEvents = events
    .filter(
      (e) => new Date(e.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    )
    .sort((a, b) => b.participants.length - a.participants.length)
    .slice(0, 5);

  return (
    <div className="browse-container">
      <h1 className="page-title">Browse Events</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search events or organisers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Filters */}
      <div className="filters">
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="all">All Types</option>
          <option value="normal">Normal</option>
          <option value="merchandise">Merchandise</option>
        </select>

        <select
          value={filters.eligibility}
          onChange={(e) =>
            setFilters({ ...filters, eligibility: e.target.value })
          }
        >
          <option value="all">All Participants</option>
          <option value="IIIT">IIIT Only</option>
          <option value="Non-IIIT">Non-IIIT</option>
        </select>

        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
      </div>

      {loading && <p className="status-message">Loading events...</p>}
      {error && <p className="status-message error">{error}</p>}

      {/* Trending */}
      {trendingEvents.length > 0 && (
        <div className="trending-section">
          <h2>Trending (24h)</h2>
          <div className="trending-scroll">
            {trendingEvents.map((e) => (
              <Link
                key={e._id}
                to={`/events/${e._id}`}
                className="event-card trending-card"
              >
                <h3>{e.name}</h3>
                <p>
                  Organizer: {e.organiser?.firstName} {e.organiser?.lastName}
                </p>
                <p>Participants: {e.participants.length}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Filtered Events */}
      <div className="events-section">
  <h2>
    {filters.type !== "all" ||
    filters.eligibility !== "all" ||
    filters.startDate ||
    filters.endDate ||
    search
      ? "Filtered Events"
      : "All Events"}
  </h2>
        {filteredEvents.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <div className="events-grid">
            {filteredEvents.map((e) => (
              <Link
                key={e._id}
                to={`/events/${e._id}`}
                className="event-card"
              >
                <h3>{e.name}</h3>
                <p>
                  Organizer: {e.organiser?.firstName} {e.organiser?.lastName}
                </p>
                <p>Type: {e.type}</p>
                <p>Eligibility: {e.eligibility}</p>
                <p>
                  Dates:{" "}
                  {new Date(e.startDate).toLocaleDateString()} -{" "}
                  {new Date(e.endDate).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseEvents;