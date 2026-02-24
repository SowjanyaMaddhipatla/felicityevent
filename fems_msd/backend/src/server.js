// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import cors from "cors"; // ✅ import cors

// import ticketRoutes from "./routes/ticket.routes.js";
// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import eventRoutes from "./routes/event.routes.js";

// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json());

// // ✅ Enable CORS for your frontend
// app.use(cors({
//   origin: process.env.FRONTEND_URL, // allow frontend
//   credentials: true, // optional, needed if using cookies
// }));

// // Health Check Route
// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Backend is running successfully",
//   });
// });

// // API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/events", eventRoutes);
// app.use("/api/tickets", ticketRoutes);

// // 404 Handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });






import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import createAdmin from "./utils/createAdmin.js";

import ticketRoutes from "./routes/ticket.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import eventRoutes from "./routes/event.routes.js";
import adminRoutes from "./routes/admin.routes.js";


dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running successfully",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/admin", adminRoutes);
// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5001;

/*
  🔥 PROPER SERVER STARTUP FLOW
  1. Connect to DB
  2. Provision Admin
  3. Start server
*/
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    await createAdmin(); // ✅ auto-create admin if not exists

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
