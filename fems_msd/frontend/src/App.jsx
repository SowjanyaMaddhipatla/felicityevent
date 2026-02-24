
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Components
// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";

// // Pages
// import Login from "./pages/Login";
// import Register from "./pages/Register"; // ✅ added
// import ParticipantDashboard from "./pages/ParticipantDashboard";
// import OrganizerDashboard from "./pages/OrganizerDashboard";
// import BrowseEvents from "./pages/BrowseEvents";
// import EventDetails from "./pages/EventDetails";
// import CreateEvent from "./pages/CreateEvent";
// import Profile from "./pages/Profile";
// import Clubs from "./pages/Clubs";


// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/register" element={<Register />} />

//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />

//         {/* Participant Routes */}
//         <Route
//           path="/participant/dashboard"
//           element={
//             <ProtectedRoute role="participant">
//               <ParticipantDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/browse-events"
//           element={
//             <ProtectedRoute role="participant">
//               <BrowseEvents />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/events/:id"
//           element={
//             <ProtectedRoute role="participant">
//               <EventDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute role="participant">
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/clubs"
//           element={
//             <ProtectedRoute role="participant">
//               <Clubs />
//             </ProtectedRoute>
//           }
//         />

//         {/* Organizer Routes */}
//         <Route
//           path="/organizer/dashboard"
//           element={
//             <ProtectedRoute role="organizer">
//               <OrganizerDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/create-event"
//           element={
//             <ProtectedRoute role="organizer">
//               <CreateEvent />
//             </ProtectedRoute>
//           }
//         />

//         {/* Catch-all route */}
//         <Route path="*" element={<h2>Page Not Found</h2>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ParticipantDashboard from "./pages/ParticipantDashboard";
import OrganiserDashboard from "./pages/OrganiserDashboard";
import BrowseEvents from "./pages/BrowseEvents";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import Organisers from "./pages/Organisers";
import Welcome from "./pages/welcome";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AddOrganiser from "./pages/AddOrganiser";
import ViewOrganisers from "./pages/ViewOrganisers";
import RemoveOrganiser from "./pages/RemoveOrganiser";
import ManageOrganisers from "./pages/ManageOrganisers";
import AdminPasswordRequests from "./pages/AdminPasswordRequests";
import OrganiserEventDetails from "./pages/OrganiserEventDetails"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Participant Routes */}
        <Route
          path="/participant/dashboard"
          element={
            <ProtectedRoute roles={["participant"]}>
              <ParticipantDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/browse-events"
          element={
            <ProtectedRoute roles={["participant"]}>
              <BrowseEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <ProtectedRoute roles={["participant"]}>
              <EventDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={["participant", "organiser"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Organisers"
          element={
            <ProtectedRoute roles={["participant"]}>
              <Organisers />
            </ProtectedRoute>
          }
        />

        {/* Organiser Routes */}
        <Route
          path="/organiser/dashboard"
          element={
            <ProtectedRoute roles={["organiser"]}>
              <OrganiserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-event"
          element={
            <ProtectedRoute roles={["organiser"]}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-organiser"
          element={
            <AdminRoute>
              <AddOrganiser />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/remove-organiser"
          element={
            <AdminRoute>
              <RemoveOrganiser />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/view-organisers"
          element={
            <AdminRoute>
              <ViewOrganisers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-organisers"
          element={
            <AdminRoute>
              <ManageOrganisers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/password-requests"
          element={
            <AdminRoute>
              <AdminPasswordRequests />
            </AdminRoute>
          }
        />
        <Route
          path="/organiser/event/:id"
          element={
            <ProtectedRoute>
              <OrganiserEventDetails />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Welcome />} />


        {/* Catch-all route */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
