import express from "express";
import { getMyTickets, getTicketById } from "../controllers/ticket.controller.js";
import { verifyToken, verifyRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all tickets for the logged-in participant
router.get("/", verifyToken, verifyRole(["participant"]), getMyTickets);

// Get a specific ticket by ID
router.get("/:id", verifyToken, verifyRole(["participant", "organiser"]), getTicketById);

export default router;
