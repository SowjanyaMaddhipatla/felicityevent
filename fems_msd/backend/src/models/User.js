// // export default mongoose.model("User", userSchema);
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     // Participant / Organiser / Admin details
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },

//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },

//     role: {
//       type: String,
//       enum: ["participant", "organiser", "admin"],
//       default: "participant",
//     },

//     // Optional participant-specific fields
//     interests: [{ type: String }], // Areas of interest
//     followedClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Organiser" }],

//     // Optional organiser-specific fields
//     organiserName: { type: String },
//     description: { type: String },
//     category: { type: String },
//     contactNumber: { type: String },
//     collegeOrOrgName: { type: String },
//   },
//   { timestamps: true }
// );



// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true }, // keep this
//     password: { type: String, required: true },
//     role: { type: String, enum: ["participant", "organiser", "admin"], default: "participant" },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     isArchived: {
//       type: Boolean,
//       default: false,
//     },
//     participantType: {
//       type: String,
//       enum: ["iiit", "non-iiit"],
//       required: function () {
//         return this.role === "participant";
//       }
//     },
//   },
//   { timestamps: true }
// );

// // REMOVE any extra userSchema.index({ email: 1 }) if present





import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["participant", "organiser", "admin"], default: "participant" },
  participantType: { type: String, enum: ["iiit", "non-iiit"], required: function() { return this.role === "participant"; } },

  // NEW FIELDS
  contactNumber: { type: String, default: "" },
  collegeName: { type: String, default: "" },
  interests: { type: [String], default: [] },
  followedOrganisers: { type: [{ name: String, id: mongoose.Schema.Types.ObjectId }], default: [] },

}, { timestamps: true });
userSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model("User", userSchema);