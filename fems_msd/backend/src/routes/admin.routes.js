// import express from "express";
// import { verifyToken } from "../middleware/auth.middleware.js";
// import { isAdmin } from "../middleware/admin.middleware.js";
// import { createOrganiser } from "../controllers/admin.controller.js";

// const router = express.Router();

// // Admin creates organiser
// router.post(
//   "/create-organiser",
//   verifyToken,
//   isAdmin,
//   createOrganiser
// );

// export default router;



import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import {
  createOrganiser,
  getAllOrganisers,
  deleteOrganiser,
  toggleOrganiserStatus,
  toggleArchiveOrganiser     
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post(
  "/create-organiser",
  verifyToken,
  isAdmin,
  createOrganiser
);

router.get(
  "/organisers",
  verifyToken,
  isAdmin,
  getAllOrganisers
);

router.delete(
  "/organiser/:id",
  verifyToken,
  isAdmin,
  deleteOrganiser
);

router.patch(
  "/organiser/:id/disable",
  verifyToken,
  isAdmin,
  toggleOrganiserStatus
);

router.patch(
  "/organiser/:id/archive",
  verifyToken,
  isAdmin,
  toggleArchiveOrganiser
);

export default router;