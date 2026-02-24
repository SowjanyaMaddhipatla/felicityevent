// import axios from "axios";

// // Base URL for backend API
// const API = axios.create({
//   baseURL: "http://localhost:5001/api", // Update if deployed
// });

// API.interceptors.request.use((config) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (user?.token) {
//     config.headers.Authorization = `Bearer ${user.token}`;
//   }

//   return config;
// });

// // Auth APIs
// export const registerUser = (userData) => API.post("/auth/register", userData);
// export const loginUser = (credentials) => API.post("/auth/login", credentials);

// // User APIs
// export const getUserProfile = () => API.get("/users/profile");
// export const updateUserProfile = (updatedData) => API.put("/users/profile", updatedData);

// // Event APIs
// export const getAllEvents = (params) => API.get("/events", { params });
// export const getEventById = (eventId) => API.get(`/events/${eventId}`);
// export const createEvent = (eventData) => API.post("/events", eventData);
// export const registerForEvent = (eventId) => API.post(`/events/${eventId}/register`);

// // Ticket APIs
// export const getTickets = () => API.get("/tickets");
// export const getTicketById = (ticketId) => API.get(`/tickets/${ticketId}`);

// export default API;



import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auth APIs
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (credentials) => API.post("/auth/login", credentials);

// User APIs
export const getUserProfile = () => API.get("/users/profile");
export const updateUserProfile = (updatedData) =>
  API.put("/users/profile", updatedData);

// Event APIs
export const getAllEvents = (params) => API.get("/events", { params });
export const getEventById = (eventId) => API.get(`/events/${eventId}`);
export const createEvent = (eventData) => API.post("/events", eventData);
export const registerForEvent = (eventId) =>
  API.post(`/events/${eventId}/register`);
export const getOrganisers = () => API.get("/users/organisers");


// 🔥 Add This (Missing Earlier)
export const getMyRegistrations = () =>
  API.get("/events/my-registrations");

export default API;
