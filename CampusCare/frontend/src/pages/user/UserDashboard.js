import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginBg from "../../assets/image2.jpg";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    rollNo: "",
    email: "",
    branch: "",
    title: "",
    description: "",
    category: "Hostel",
    // date: "",
  });

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const id = localStorage.getItem("userId");

    if (!name || !id) {
      navigate("/user/login");
    } else {
      setUserName(name);
      setUserId(id);
      setFormData((prev) => ({ ...prev, userName: name }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/complaints", {
        ...formData,
        user: userId,
      });

      alert(res.data.message || "Complaint submitted successfully.");
      setFormData({
        userName: userName,
        rollNo: "",
        email: "",
        branch: "",
        title: "",
        description: "",
        category: "Hostel",
        // date: "",
      });
    } catch (error) {
      alert("Error submitting complaint. Try again.");
      console.error("Submit error:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/user/home");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center py-10"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
        <button
          onClick={handleBackClick}
          className="mb-4 text-blue-600 hover:text-blue-800 transition"
        >
          ← Back
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Submit a Complaint
          </h2>

          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            placeholder="Roll Number"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="Branch"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Complaint Title"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Complaint Description"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
          />

          {/* Hidden Date Field */}
          <div className="hidden">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-xl px-4 py-2"
            />
          </div>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Hostel">Hostel</option>
            <option value="College">College</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition transform hover:scale-105 duration-200"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;
