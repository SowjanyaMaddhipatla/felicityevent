// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api";

// export default function OrganiserEventDetails() {
//   const { id } = useParams();
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     fetchEvent();
//   }, []);

//   const fetchEvent = async () => {
//     try {
//       const res = await api.get(`/events/${id}`);
//       setEvent(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!event) return <p>Loading...</p>;

//   return (
//     <div className="container">
//       <h2>{event.title}</h2>

//       <p><strong>Description:</strong> {event.description}</p>
//       <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
//       <p><strong>Location:</strong> {event.location}</p>

//       <hr />

//       <h3>Participants</h3>

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {event.participants?.map((p) => (
//             <tr key={p._id}>
//               <td>{p.firstName} {p.lastName}</td>
//               <td>{p.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api";

// export default function OrganiserEventDetails() {
//   const { id } = useParams();
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     fetchEvent();
//   }, []);

//   const fetchEvent = async () => {
//     try {
//       const res = await api.get(`/events/${id}`);
//       setEvent(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!event) return <p>Loading...</p>;

//   return (
//     <div className="container">
//       <h2>{event.title}</h2>

//       <p><strong>Description:</strong> {event.description}</p>
//       <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
//       <p><strong>Location:</strong> {event.location}</p>

//       <hr />

//       <h3>Participants ({event.participants?.length || 0})</h3>

//       {event.participants?.length === 0 ? (
//         <p>No registrations yet.</p>
//       ) : (
//         <table border="1" cellPadding="8">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {event.participants.map((p) => (
//               <tr key={p._id}>
//                 <td>
//                   {p.firstName} {p.lastName}
//                 </td>
//                 <td>{p.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function OrganiserEventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data.event || res.data); // Adjust to backend response
    } catch (err) {
      console.error(err);
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{event.title}</h2>

      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>

      <hr />

      <h3>Participants ({event.participants?.length || 0})</h3>

      {event.participants?.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {event.participants.map((p) => (
              <tr key={p._id}>
                <td>{p.name || `${p.firstName} ${p.lastName}`}</td>
                <td>{p.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
