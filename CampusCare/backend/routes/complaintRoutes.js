const express = require("express");
const {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
  getUserComplaints, // ✅ Import the new controller
} = require("../controllers/complaintController");

const router = express.Router();

// Complaint-related routes
router.post("/", createComplaint);                // Submit complaint
router.get("/", getComplaints);                   // Get all complaints
router.get("/user/:id", getUserComplaints);       // ✅ Get complaints by user ID
router.get("/:id", getComplaintById);             // Get single complaint
router.put("/:id", updateComplaintStatus);        // Mark as Solved
router.delete("/:id", deleteComplaint);           // Delete complaint

module.exports = router;