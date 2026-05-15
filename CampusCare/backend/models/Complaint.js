const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Solved"],
    default: "Pending",
  },  
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);