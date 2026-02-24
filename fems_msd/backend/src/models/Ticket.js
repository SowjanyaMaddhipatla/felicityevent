// import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid";

// const ticketSchema = new mongoose.Schema(
//   {
//     ticketId: {
//       type: String,
//       default: () => uuidv4(),
//       unique: true,
//     },
//     event: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Event",
//       required: true,
//     },
//     participant: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["registered", "pending", "approved", "rejected", "cancelled"],
//       default: "registered",
//     },
//     qrCodeData: { type: String, required: true }, // can store QR code payload (e.g., JSON with event + participant)
//     purchaseDetails: {
//       amountPaid: { type: Number, default: 0 },
//       paymentProofUrl: { type: String, default: "" }, // For merchandise payment uploads
//     },
//     issuedAt: { type: Date, default: Date.now },
//     checkedInAt: { type: Date },
//   },
//   { timestamps: true }
// );

// // Optional: prevent duplicate tickets for same event & participant
// ticketSchema.index({ event: 1, participant: 1 }, { unique: true });

// export default mongoose.model("Ticket", ticketSchema);




import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    ticketId: {
      type: String,
      required: true,
      unique: true,
    },
    qrCode: {
      type: String, // Can store QR code as Base64 string or URL to generated image
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    purchaseDetails: {
      type: [
        {
          itemName: String,
          size: String,
          color: String,
          quantity: Number,
        },
      ],
    },
    status: {
      type: String,
      enum: ["Registered", "Cancelled", "Completed", "Rejected"],
      default: "Registered",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
