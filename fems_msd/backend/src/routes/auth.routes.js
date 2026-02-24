// import express from "express";
// import { register, login } from "../controllers/auth.controller.js";

// const router = express.Router();

// /*
//   AUTH ROUTES
// */

// router.post("/register", register);
// router.post("/login", login);

// export default router;


// import express from "express";
// import {
//   createEvent,
//   getAllEvents,
//   registerEvent,
//   getEventDetails,
// } from "../controllers/event.controller.js";
// import { verifyToken, verifyRole } from "../middleware/auth.middleware.js";

// const router = express.Router();

// // Organiser routes
// router.post("/", verifyToken, verifyRole(["organiser"]), createEvent);

// // Participant routes
// router.get("/", verifyToken, verifyRole(["participant", "organiser"]), getAllEvents);
// router.get("/:eventId", verifyToken, getEventDetails);
// router.post("/:eventId/register", verifyToken, verifyRole(["participant"]), registerEvent);

// export default router;

// import express from "express";
// import { registerUser, loginUser } from "../controllers/auth.controller.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// export default router;

import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Registration (all participants)
router.post("/register", registerUser);

// Login (all roles)
router.post("/login", loginUser);

export default router;