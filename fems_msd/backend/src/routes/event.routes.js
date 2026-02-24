
// import express from "express";
// import {
//   createEvent,
//   getEvents,
//   getEventById,
//   registerForEvent,
// } from "../controllers/event.controller.js";

// import { verifyToken, verifyRole } from "../middleware/auth.middleware.js";

// const router = express.Router();

// // Organiser creates event
// router.post("/", verifyToken, verifyRole(["organiser"]), createEvent);

// // Participants browse events
// router.get("/", verifyToken, verifyRole(["participant", "organiser", "admin"]), getEvents);

// // Single event details
// router.get("/:id", verifyToken, verifyRole(["participant", "organiser", "admin"]), getEventById);

// // Participant registers for an event
// router.post("/:id/register", verifyToken, verifyRole(["participant"]), registerForEvent);

// export default router;



import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  registerForEvent,
  getMyRegistrations,
  getMyEvents,
} from "../controllers/event.controller.js";

import { verifyToken, verifyRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// ===============================
// Participant: My Registrations
// ===============================
router.get(
  "/my-registrations",
  verifyToken,
  verifyRole(["participant"]),
  getMyRegistrations
);

// ===============================
// Organiser: My Events
// ===============================
router.get(
  "/my-events",
  verifyToken,
  verifyRole(["organiser"]),
  getMyEvents
);

// ===============================
// Create Event (Organiser)
// ===============================
router.post(
  "/",
  verifyToken,
  verifyRole(["organiser"]),
  createEvent
);

// ===============================
// Get All Events
// ===============================
router.get(
  "/",
  verifyToken,
  verifyRole(["participant", "organiser", "admin"]),
  getEvents
);

// ===============================
// Register For Event
// ===============================
router.post(
  "/:id/register",
  verifyToken,
  verifyRole(["participant"]),
  registerForEvent
);

// ===============================
// Get Event By ID (KEEP LAST)
// ===============================
router.get(
  "/:id",
  verifyToken,
  verifyRole(["participant", "organiser", "admin"]),
  getEventById
);

export default router;