import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching complaints", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const markAsSolved = async (complaintId) => {
    try {
      await axios.put(`http://localhost:5000/api/complaints/${complaintId}`, {
        status: 'Solved',
      });
      fetchComplaints();
    } catch (error) {
      console.error("Error marking as solved", error);
    }
  };

  const downloadExcel = () => {
    const dataToExport = filteredComplaints.map(comp => ({
      Title: comp.title,
      Category: comp.category,
      Description: comp.description,
      Status: comp.status || "Pending",
      Name: comp.userName,
      RollNo: comp.rollNo,
      Email: comp.email,
      Branch: comp.branch
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaints");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "Complaints.xlsx");
  };

  const filteredComplaints = complaints.filter((comp) => {
    const categoryMatch = selectedCategory === "All" || comp.category === selectedCategory;
    const statusMatch = selectedStatus === "All" || comp.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 relative">
      {/* Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/";
        }}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all shadow-md"
      >
        Logout
      </button>

      <h2 className="text-3xl font-bold text-center mt-12 mb-6 text-gray-800">All Complaints</h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Filter by Category
          </button>
          {showCategoryDropdown && (
            <div className="absolute bg-white border rounded shadow-md mt-2 animate-fade-in z-10">
              {["All", "Hostel", "College"].map((cat) => (
                <div
                  key={cat}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedCategory === cat ? "bg-blue-200 font-semibold" : ""}`}
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
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
          >
            Filter by Status
          </button>
          {showStatusDropdown && (
            <div className="absolute bg-white border rounded shadow-md mt-2 animate-fade-in z-10">
              {["All", "Pending", "Solved"].map((status) => (
                <div
                  key={status}
                  className={`px-4 py-2 cursor-pointer hover:bg-purple-100 ${selectedStatus === status ? "bg-purple-200 font-semibold" : ""}`}
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

      {/* Download Excel */}
      <div className="text-center mb-6">
        <button
          onClick={downloadExcel}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-all shadow-md"
        >
          Download as Excel
        </button>
      </div>

      {/* Complaints List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredComplaints.length === 0 ? (
          <p className="text-center col-span-full text-gray-700 text-lg">No complaints found.</p>
        ) : (
          filteredComplaints.map((comp) => (
            <div
              key={comp._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-blue-400"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-2">{comp.title}</h3>
              <p><span className="font-semibold">Category:</span> {comp.category}</p>
              <p><span className="font-semibold">Description:</span> {comp.description}</p>
              <p><span className="font-semibold">Status:</span> {comp.status || "Pending"}</p>

              <div className="mt-4 text-sm text-gray-600">
                <p><span className="font-semibold">Submitted by:</span> {comp.userName}</p>
                <p><span className="font-semibold">Roll No:</span> {comp.rollNo}</p>
                <p><span className="font-semibold">Email:</span> {comp.email}</p>
                <p><span className="font-semibold">Branch:</span> {comp.branch}</p>
              </div>

              {comp.status !== "Solved" && (
                <button
                  onClick={() => markAsSolved(comp._id)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Mark as Solved
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
