// import { useEffect, useState } from "react";
// import api from "../api";

// export default function OrganiserProfile() {
//   const [profile, setProfile] = useState({});

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     const res = await api.get("/users/me");
//     setProfile(res.data);
//   };

//   const updateProfile = async () => {
//     await api.put("/users/me", profile);
//     alert("Updated successfully");
//   };

//   return (
//     <div className="container">
//       <h2>Organiser Profile</h2>

//       <input
//         value={profile.firstName || ""}
//         onChange={(e) =>
//           setProfile({ ...profile, firstName: e.target.value })
//         }
//         placeholder="First Name"
//       />

//       <input
//         value={profile.lastName || ""}
//         onChange={(e) =>
//           setProfile({ ...profile, lastName: e.target.value })
//         }
//         placeholder="Last Name"
//       />

//       <input
//         value={profile.email || ""}
//         disabled
//       />

//       <button onClick={updateProfile}>
//         Save Changes
//       </button>
//     </div>
//   );
// }








import { useEffect, useState } from "react";
import api from "../api";

export default function OrganiserProfile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/me");
      setProfile(res.data.user || res.data); // Adjust for backend structure
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const updateProfile = async () => {
    try {
      const res = await api.put("/users/me", profile);
      alert("Updated successfully");
      setProfile(res.data.user); // Refresh profile with updated info
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container">
      <h2>Organiser Profile</h2>

      <input
        value={profile.firstName || ""}
        onChange={(e) =>
          setProfile({ ...profile, firstName: e.target.value })
        }
        placeholder="First Name"
      />

      <input
        value={profile.lastName || ""}
        onChange={(e) =>
          setProfile({ ...profile, lastName: e.target.value })
        }
        placeholder="Last Name"
      />

      <input
        value={profile.email || ""}
        disabled
        placeholder="Email"
      />

      <input
        value={profile.contactNumber || ""}
        onChange={(e) =>
          setProfile({ ...profile, contactNumber: e.target.value })
        }
        placeholder="Contact Number"
      />

      <textarea
        value={profile.description || ""}
        onChange={(e) =>
          setProfile({ ...profile, description: e.target.value })
        }
        placeholder="Description"
      />

      <button onClick={updateProfile}>
        Save Changes
      </button>
    </div>
  );
}