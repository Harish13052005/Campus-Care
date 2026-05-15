const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Hostel", "College"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Solved"],
      default: "Pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔽 These fields were missing earlier
    userName: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Only define the model if it hasn't been compiled yet
module.exports =
  mongoose.models.Complaint || mongoose.model("Complaint", complaintSchema);
