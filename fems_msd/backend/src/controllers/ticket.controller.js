import Ticket from "../models/Ticket.js";
import Event from "../models/Event.js";

// GET TICKETS FOR PARTICIPANT
export const getMyTickets = async (req, res) => {
  try {
    if (req.user.role !== "participant") {
      return res.status(403).json({ message: "Only participants can access tickets" });
    }

    const tickets = await Ticket.find({ participantId: req.user.userId })
      .populate("eventId", "title date location type")
      .populate("participantId", "name email");

    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE TICKET BY ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("eventId", "title date location type")
      .populate("participantId", "name email");

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // Only the owner can access
    if (req.user.userId !== ticket.participantId._id.toString() && req.user.role !== "organiser") {
      return res.status(403).json({ message: "Not authorized to view this ticket" });
    }

    res.status(200).json({ ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
