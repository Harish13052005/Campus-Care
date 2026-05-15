import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginBg from "../../assets/image2.jpg";

const MyComplaintsPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const id = localStorage.getItem("userId");
    if (!name || !id) {
      navigate("/user/login");
    } else {
      setUserName(name);
      setUserId(id);
      fetchComplaints(id);
    }
  }, [navigate]);

  const fetchComplaints = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/complaints/user/${userId}`);
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      alert("Failed to load complaints. Try again.");
    }
  };

  const deleteComplaint = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this complaint?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const response = await axios.delete(`http://localhost:5000/api/complaints/${id}`);
      if (response.status === 200) {
        alert("Complaint deleted successfully.");
        fetchComplaints(userId);
      } else {
        alert("Failed to delete complaint. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
      alert("Failed to delete complaint.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const categoryMatch = selectedCategory === "All" || complaint.category === selectedCategory;
    const statusMatch = selectedStatus === "All" || complaint.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const dropdownItemClasses = (active) =>
    `px-4 py-2 cursor-pointer hover:bg-gray-100 ${active ? "bg-gray-200" : ""}`;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center pt-16 px-4"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <h2 className="text-3xl font-bold text-white mb-6 bg-black bg-opacity-50 px-6 py-2 rounded shadow">
        Complaints of {userName}
      </h2>

      {/* Back Button */}
      <button
        onClick={() => navigate("/user/home")}
        className="mb-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 transition duration-200 text-black font-semibold rounded shadow"
      >
        ⬅ Back
      </button>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="px-4 py-2 bg-white rounded shadow hover:bg-gray-100 transition"
          >
            Filter by Category
          </button>
          {showCategoryDropdown && (
            <div className="absolute mt-1 bg-white border rounded shadow-md w-40 z-50">
              {["All", "Hostel", "College"].map((cat) => (
                <div
                  key={cat}
                  className={dropdownItemClasses(selectedCategory === cat)}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowCategoryDropdown(false);
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="px-4 py-2 bg-white rounded shadow hover:bg-gray-100 transition"
          >
            Filter by Status
          </button>
          {showStatusDropdown && (
            <div className="absolute mt-1 bg-white border rounded shadow-md w-40 z-50">
              {["All", "Pending", "Solved"].map((status) => (
                <div
                  key={status}
                  className={dropdownItemClasses(selectedStatus === status)}
                  onClick={() => {
                    setSelectedStatus(status);
                    setShowStatusDropdown(false);
                  }}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Complaint List */}
      <div className="w-full max-w-2xl space-y-4">
        {filteredComplaints.length === 0 ? (
          <p className="text-white bg-black bg-opacity-50 p-4 rounded text-center">No complaints found for selected filters.</p>
        ) : (
          filteredComplaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white bg-opacity-90 p-4 rounded shadow hover:shadow-lg transition duration-300"
            >
              <p><span className="font-semibold">Title:</span> {complaint.title}</p>
              <p><span className="font-semibold">Description:</span> {complaint.description}</p>
              <p><span className="font-semibold">Category:</span> {complaint.category}</p>
              <p><span className="font-semibold">Status:</span> {complaint.status}</p>
              <button
                onClick={() => deleteComplaint(complaint._id)}
                className={`mt-2 px-4 py-2 rounded text-white font-medium ${
                  isDeleting ? "bg-gray-500" : "bg-red-500 hover:bg-red-600"
                } transition duration-200`}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyComplaintsPage;
