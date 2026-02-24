// import mongoose from "mongoose";

// const itemSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   size: { type: String, trim: true },
//   color: { type: String, trim: true },
//   variants: { type: [String], default: [] },
//   stockQuantity: { type: Number, default: 0, min: 0 },
//   purchaseLimitPerParticipant: { type: Number, default: 1, min: 1 },
// });

// const eventSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: { type: String, required: true },
//     eventType: {
//       type: String,
//       enum: ["normal", "merchandise"],
//       required: true,
//     },
//     eligibility: { type: String, default: "All Participants" },
//     registrationDeadline: { type: Date, required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     registrationLimit: { type: Number, default: 100, min: 1 },
//     registrationFee: { type: Number, default: 0, min: 0 },
//     organiser: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     participants: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     tags: { type: [String], default: [] },
//     // Merchandise-specific
//     items: {
//       type: [itemSchema],
//       default: [],
//     },
//     customForm: { type: Object, default: {} }, // For normal events: dynamic form schema
//     status: {
//       type: String,
//       enum: ["draft", "published", "ongoing", "completed", "closed"],
//       default: "draft",
//     },
//   },
//   { timestamps: true }
// );

// // Validations before saving
// eventSchema.pre("save", function (next) {
//   if (this.endDate < this.startDate) {
//     return next(new Error("End date must be after start date"));
//   }
//   if (this.registrationDeadline > this.startDate) {
//     return next(
//       new Error("Registration deadline must be before event start date")
//     );
//   }
//   next();
// });

// // Unique event name per organiser
// eventSchema.index({ organiser: 1, name: 1 }, { unique: true });

// export default mongoose.model("Event", eventSchema);





// import mongoose from "mongoose";

// const eventSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     type: {
//       type: String,
//       enum: ["normal", "merchandise"],
//       required: true,
//       lowercase: true,
//     },
//     eligibility: {
//       type: String,
//       default: "All Participants",
//     },
//     registrationDeadline: {
//       type: Date,
//       required: true,
//     },
//     startDate: {
//       type: Date,
//       required: true,
//     },
//     endDate: {
//       type: Date,
//       required: true,
//     },
//     registrationLimit: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//     registrationFee: {
//       type: Number,
//       default: 0,
//     },
//     organiser: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     tags: [String],
//     participants: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     merchandiseDetails: [
//       {
//         itemName: String,
//         size: String,
//         color: String,
//         variants: [String],
//         stock: Number,
//         purchaseLimit: Number,
//       },
//     ],
//     customForm: [
//       {
//         fieldName: String,
//         fieldType: String,
//         required: Boolean,
//         options: [String],
//       },
//     ],
    

//     status: {
//       type: String,
//       enum: ["draft", "published", "ongoing", "closed", "completed"],
//       default: "draft",
//       lowercase: true,
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     isArchived: {
//       type: Boolean,
//       default: false,
//     },
//   },

//   { timestamps: true }
// );

// // Validations
// eventSchema.pre("save", function (next) {
//   if (this.endDate < this.startDate) {
//     return next(new Error("Event end date must be after start date"));
//   }
//   if (this.registrationDeadline > this.startDate) {
//     return next(new Error("Registration deadline must be before event start"));
//   }
//   next();
// });

// export default mongoose.model("Event", eventSchema);



import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["normal", "merchandise"],
      required: true,
      lowercase: true,
    },
    eligibility: {
      type: String,
      default: "All Participants",
    },
    registrationDeadline: {
      type: Date,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    registrationLimit: {
      type: Number,
      required: true,
      min: 1,
    },
    registrationFee: {
      type: Number,
      default: 0,
    },
    organiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [String],
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    merchandiseDetails: [
      {
        itemName: String,
        size: String,
        color: String,
        variants: [String],
        stock: Number,
        purchaseLimit: Number,
      },
    ],
    customForm: [
      {
        fieldName: String,
        fieldType: String,
        required: Boolean,
        options: [String],
      },
    ],
    

    status: {
      type: String,
      enum: ["draft", "published", "ongoing", "closed", "completed"],
      default: "draft",
      lowercase: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

// Validations
eventSchema.pre("save", function (next) {
  if (this.endDate < this.startDate) {
    return next(new Error("Event end date must be after start date"));
  }
  if (this.registrationDeadline > this.startDate) {
    return next(new Error("Registration deadline must be before event start"));
  }
  next();
});

export default mongoose.model("Event", eventSchema);
