// import React, { useEffect, useState } from "react";
// import api from "../api";

// const Clubs = () => {
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchClubs = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         const response = await api.get("/users/organizers", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setClubs(response.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch clubs");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClubs();
//   }, []);

//   const handleFollow = async (clubId, isFollowing) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (isFollowing) {
//         await api.post(
//           `/users/unfollow/${clubId}`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } else {
//         await api.post(
//           `/users/follow/${clubId}`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       }
//       // Update local state
//       setClubs((prevClubs) =>
//         prevClubs.map((club) =>
//           club._id === clubId ? { ...club, isFollowing: !isFollowing } : club
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update follow status");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Clubs / Organizers</h1>

//       {loading && <p>Loading clubs...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {clubs.map((club) => (
//             <div
//               key={club._id}
//               className="border p-4 rounded shadow flex flex-col justify-between"
//             >
//               <div>
//                 <h2 className="text-lg font-semibold">{club.name}</h2>
//                 <p className="text-sm">{club.category}</p>
//                 <p className="text-sm">{club.description}</p>
//                 <p className="text-sm mt-1">Contact: {club.email}</p>
//               </div>
//               <button
//                 className={`mt-2 py-1 px-3 rounded ${
//                   club.isFollowing
//                     ? "bg-red-500 text-white"
//                     : "bg-blue-500 text-white"
//                 }`}
//                 onClick={() => handleFollow(club._id, club.isFollowing)}
//               >
//                 {club.isFollowing ? "Unfollow" : "Follow"}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Clubs;



import { useEffect, useState } from "react";
import { getOrganisers } from "../api";

const Organisers = () => {
  const [organisers, setOrganisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrganisers = async () => {
      try {
        const res = await getOrganisers();
        setOrganisers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch Organisers");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganisers();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Organisers</h2>

      {loading && <p>Loading Organisers...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && organisers.length === 0 && (
        <p>No Organisers available.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {organisers.map((org) => (
          <div
            key={org._id}
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>{org.name}</h3>
            <p style={{ color: "#555" }}>{org.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organisers;
