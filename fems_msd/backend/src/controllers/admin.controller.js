// import User from "../models/User.js";
// import bcrypt from "bcryptjs";

// export const createOrganiser = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;

//     // Check if already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const organiser = await User.create({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       role: "organiser",
//     });

//     res.status(201).json({
//       message: "Organiser created successfully",
//       organiser: {
//         id: organiser._id,
//         email: organiser.email,
//         role: organiser.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import User from "../models/User.js";
import Event from "../models/Event.js";
import bcrypt from "bcryptjs";

/* ===============================
   CREATE ORGANISER
================================= */
export const createOrganiser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const organiser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "organiser",
    });

    res.status(201).json({
      message: "Organiser created successfully",
      organiser: {
        id: organiser._id,
        firstName: organiser.firstName,
        lastName: organiser.lastName,
        email: organiser.email,
        role: organiser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   VIEW ALL ORGANISERS
================================= */
export const getAllOrganisers = async (req, res) => {
  try {
    const organisers = await User.find({ role: "organiser" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(organisers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   DELETE ORGANISER
   + DELETE ALL THEIR EVENTS
================================= */
export const deleteOrganiser = async (req, res) => {
  try {
    const organiser = await User.findById(req.params.id);

    if (!organiser || organiser.role !== "organiser") {
      return res.status(404).json({ message: "Organiser not found" });
    }

    // Delete all events created by this organiser
    await Event.deleteMany({ createdBy: organiser._id });

    // Delete organiser
    await organiser.deleteOne();

    res.json({
      message: "Organiser and all associated events deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/* ===============================
   DISABLE ORGANISER
================================= */
/* ===============================
   TOGGLE ORGANISER ACTIVE STATUS
================================= */

export const toggleOrganiserStatus = async (req, res) => {
  try {
    const organiser = await User.findById(req.params.id);

    if (!organiser || organiser.role !== "organiser") {
      return res.status(404).json({ message: "Organiser not found" });
    }

    organiser.isActive = !organiser.isActive;
    await organiser.save();

    // 🔥 Update all events of this organiser
    await Event.updateMany(
      { createdBy: organiser._id },
      { isActive: organiser.isActive }
    );

    res.json({
      message: organiser.isActive
        ? "Organiser enabled & events activated"
        : "Organiser disabled & events deactivated",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ARCHIVE ORGANISER
================================= */
export const toggleArchiveOrganiser = async (req, res) => {
  try {
    const organiser = await User.findById(req.params.id);

    if (!organiser || organiser.role !== "organiser") {
      return res.status(404).json({ message: "Organiser not found" });
    }

    organiser.isArchived = !organiser.isArchived;
    await organiser.save();

    // 🔥 Update events too
    await Event.updateMany(
      { createdBy: organiser._id },
      { isArchived: organiser.isArchived }
    );

    res.json({
      message: organiser.isArchived
        ? "Organiser archived & events archived"
        : "Organiser restored & events restored",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};