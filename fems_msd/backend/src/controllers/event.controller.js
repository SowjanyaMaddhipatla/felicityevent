

// import Event from "../models/Event.js";
// import User from "../models/User.js";

// /* ===============================
//    CREATE EVENT (Organiser)
// ================================= */

// export const createEvent = async (req, res) => {
//   try {
//     const organiserId = req.user.userId;

//     if (!organiserId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const {
//       name,
//       description,
//       type,
//       eligibility,
//       registrationDeadline,
//       startDate,
//       endDate,
//       registrationLimit,
//       registrationFee,
//       tags,
//       status,
//       customFields,
//       merchandiseConfig,
//     } = req.body;

//     // Basic validation
//     if (!name || !description || !type) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     if (new Date(endDate) < new Date(startDate)) {
//       return res
//         .status(400)
//         .json({ message: "End date must be after start date" });
//     }

//     const event = await Event.create({
//       name,
//       description,
//       type,
//       eligibility,
//       registrationDeadline,
//       startDate,
//       endDate,
//       registrationLimit,
//       registrationFee,
//       tags,
//       organiser: organiserId,
//       status: status || "draft",
//       customFields: type === "normal" ? customFields : [],
//       merchandiseConfig:
//         type === "merchandise" ? merchandiseConfig : null,
//     });

//     res.status(201).json(event);
//   } catch (error) {
//     console.error("CREATE EVENT ERROR:", error);
//     res.status(500).json({ message: "Failed to create event" });
//   }
// };
// /* ===============================
//    GET ALL EVENTS (Visible to Users)
//    - Only active events
//    - Only from active organisers
// ================================= */
// export const getEvents = async (req, res) => {
//   try {
//     const events = await Event.find({
//       isActive: true,
//       isArchived: false,
//     })
//       .populate({
//         path: "organiser",
//         select: "firstName lastName email isActive isArchived",
//         match: { isActive: true, isArchived: false }, // 🔥 important
//       })
//       .sort({ date: 1 });

//     // 🔥 Remove events where organiser is null (disabled/archived)
//     const filteredEvents = events.filter(
//       (event) => event.organiser !== null
//     );

//     res.json(filteredEvents);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching events" });
//   }
// };

// /* ===============================
//    GET SINGLE EVENT
// ================================= */
// export const getEventById = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id)
//       .populate({
//         path: "organiser",
//         select: "firstName lastName email isActive isArchived",
//       })
//       .populate("participants", "firstName lastName email");

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     // 🔥 Block if event OR organiser inactive
//     if (
//       !event.isActive ||
//       event.isArchived ||
//       !event.organiser ||
//       !event.organiser.isActive ||
//       event.organiser.isArchived
//     ) {
//       return res.status(403).json({ message: "Event not available" });
//     }

//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching event" });
//   }
// };

// /* ===============================
//    REGISTER FOR EVENT
// ================================= */
// export const registerForEvent = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id).populate("organiser");

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     // 🔥 Block if event OR organiser inactive
//     if (
//       !event.isActive ||
//       event.isArchived ||
//       !event.organiser.isActive ||
//       event.organiser.isArchived
//     ) {
//       return res.status(403).json({
//         message: "Event is not available for registration",
//       });
//     }

//     if (event.participants.includes(req.user.userId)) {
//       return res.status(400).json({ message: "Already registered" });
//     }

//     event.participants.push(req.user.userId);
//     await event.save();

//     res.json({ message: "Registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Registration failed" });
//   }
// };

// /* ===============================
//    GET MY REGISTRATIONS
// ================================= */
// export const getMyRegistrations = async (req, res) => {
//   try {
//     const events = await Event.find({
//       participants: req.user.userId,
//       isActive: true,
//       isArchived: false,
//     })
//       .populate({
//         path: "organiser",
//         select: "firstName lastName email isActive isArchived",
//         match: { isActive: true, isArchived: false },
//       })
//       .sort({ date: 1 });

//     const filteredEvents = events.filter(
//       (event) => event.organiser !== null
//     );

//     res.json(filteredEvents);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching registrations" });
//   }
// };


// export const getMyEvents = async (req, res) => {
//   try {
//     const events = await Event.find({
//       organiser: req.user.userId,
//     })
//       .populate("participants", "firstName lastName email")
//       .sort({ createdAt: -1 });

//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching organiser events" });
//   }
// };







import Event from "../models/Event.js";
import User from "../models/User.js";

/* ===============================
   CREATE EVENT (Organiser)
================================= */
export const createEvent = async (req, res) => {
  try {
    const organiserId = req.user.userId;

    if (!organiserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      name,
      description,
      type,
      eligibility,
      registrationDeadline,
      startDate,
      endDate,
      registrationLimit,
      registrationFee,
      tags,
      status,
      customForm,
      merchandiseDetails,
    } = req.body;

    // Basic validation
    if (!name || !description || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res
        .status(400)
        .json({ message: "End date must be after start date" });
    }

    const event = await Event.create({
      name,
      description,
      type: type.toLowerCase(), // ensure lowercase to match enum
      eligibility,
      registrationDeadline,
      startDate,
      endDate,
      registrationLimit,
      registrationFee,
      tags,
      organiser: organiserId,
      status: (status || "draft").toLowerCase(),
      customForm: type.toLowerCase() === "normal" ? customForm : [],
      merchandiseDetails:
        type.toLowerCase() === "merchandise" ? merchandiseDetails : [],
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
};

/* ===============================
   GET ALL EVENTS (Visible to Users)
================================= */
// export const getEvents = async (req, res) => {
//   try {
//     const events = await Event.find({ isActive: true, isArchived: false })
//       .populate({
//         path: "organiser",
//         select: "firstName lastName email isActive isArchived",
//         match: { isActive: true, isArchived: false },
//       })
//       .sort({ startDate: 1 });

//     const filteredEvents = events.filter((event) => event.organiser !== null);

//     res.json(filteredEvents);
//   } catch (error) {
//     console.error("GET EVENTS ERROR:", error);
//     res.status(500).json({ message: "Error fetching events" });
//   }
// };

// /* ===============================
//    GET ALL EVENTS (Visible to Users)
//    Supports filters & search
// ================================= */
// export const getEvents = async (req, res) => {
//   try {
//     const { search, type, eligibility, startDate, endDate, followedClubs } =
//       req.query;

//     const query = {
//       isActive: true,
//       isArchived: false,
//     };

//     // Type filter
//     if (type && type !== "all") query.type = type.toLowerCase();

//     // Eligibility filter
//     if (eligibility && eligibility !== "all") query.eligibility = eligibility;

//     // Date range filter
//     if (startDate || endDate) {
//       query.startDate = {};
//       if (startDate) query.startDate.$gte = new Date(startDate);
//       if (endDate) query.startDate.$lte = new Date(endDate);
//     }

//     // Initial find
//     let events = await Event.find(query)
//       .populate({
//         path: "organiser",
//         select: "firstName lastName email isActive isArchived",
//         match: { isActive: true, isArchived: false },
//       })
//       .sort({ startDate: 1 });

//     // Remove events with inactive organisers
//     events = events.filter((e) => e.organiser !== null);

//     // Fuzzy search
//     if (search) {
//       const regex = new RegExp(search, "i"); // case-insensitive
//       events = events.filter(
//         (e) =>
//           regex.test(e.name) ||
//           regex.test(`${e.organiser.firstName} ${e.organiser.lastName}`)
//       );
//     }

//     // Followed clubs filter
//     if (followedClubs) {
//       const followedIds = followedClubs.split(","); // e.g., "id1,id2"
//       events = events.filter((e) => followedIds.includes(e.organiser._id.toString()));
//     }

//     res.json(events);
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     res.status(500).json({ message: "Error fetching events" });
//   }
// };



/* ===============================
   GET ALL EVENTS (Visible to Users)
   - Only active events
   - Filters: type, eligibility, date range
================================= */
export const getEvents = async (req, res) => {
  try {
    const { type, eligibility, startDate, endDate } = req.query;

    // Base query: only active events
    const query = { isActive: true, isArchived: false };

    // Apply type filter if provided
    if (type && type !== "all") {
      query.type = type;
    }

    // Apply eligibility filter if provided
    if (eligibility && eligibility !== "all") {
      query.eligibility = eligibility;
    }

    // Apply date range filter if provided
    if (startDate || endDate) {
      query.startDate = {};
      if (startDate) query.startDate.$gte = new Date(startDate);
      if (endDate) query.startDate.$lte = new Date(endDate);
    }

    let events = await Event.find(query)
      .populate({
        path: "organiser",
        select: "firstName lastName email isActive isArchived",
        match: { isActive: true, isArchived: false },
      })
      .sort({ createdAt: -1 });

    // Remove events where organiser is null (disabled/archived)
    events = events.filter((event) => event.organiser !== null);

    res.json(events);
  } catch (error) {
    console.error("GET EVENTS ERROR:", error);
    res.status(500).json({ message: "Error fetching events" });
  }
};
/* ===============================
   GET SINGLE EVENT
================================= */
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate({
        path: "organiser",
        select: "firstName lastName email isActive isArchived",
      })
      .populate("participants", "firstName lastName email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (
      !event.isActive ||
      event.isArchived ||
      !event.organiser ||
      !event.organiser.isActive ||
      event.organiser.isArchived
    ) {
      return res.status(403).json({ message: "Event not available" });
    }

    res.json(event);
  } catch (error) {
    console.error("GET EVENT ERROR:", error);
    res.status(500).json({ message: "Error fetching event" });
  }
};

/* ===============================
   REGISTER FOR EVENT
================================= */
export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("organiser");

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (
      !event.isActive ||
      event.isArchived ||
      !event.organiser?.isActive ||
      event.organiser?.isArchived
    ) {
      return res
        .status(403)
        .json({ message: "Event is not available for registration" });
    }

    if (event.participants.includes(req.user.userId)) {
      return res.status(400).json({ message: "Already registered" });
    }

    event.participants.push(req.user.userId);
    await event.save();

    res.json({ message: "Registered successfully" });
  } catch (error) {
    console.error("REGISTER EVENT ERROR:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

/* ===============================
   GET MY REGISTRATIONS
================================= */
export const getMyRegistrations = async (req, res) => {
  try {
    const events = await Event.find({
      participants: req.user.userId,
      isActive: true,
      isArchived: false,
    })
      .populate({
        path: "organiser",
        select: "firstName lastName email isActive isArchived",
        match: { isActive: true, isArchived: false },
      })
      .sort({ startDate: 1 });

    const filteredEvents = events.filter((event) => event.organiser !== null);

    res.json(filteredEvents);
  } catch (error) {
    console.error("GET MY REGISTRATIONS ERROR:", error);
    res.status(500).json({ message: "Error fetching registrations" });
  }
};

/* ===============================
   GET MY EVENTS (Organiser)
================================= */
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organiser: req.user.userId })
      .populate("participants", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    console.error("GET MY EVENTS ERROR:", error);
    res.status(500).json({ message: "Error fetching organiser events" });
  }
};


// top5 events 
export const getTrendingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      isActive: true,
      isArchived: false,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // last 24h
    })
      .populate("organiser", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching trending events" });
  }
};