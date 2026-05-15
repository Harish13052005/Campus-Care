import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import UserDashboard from "./pages/user/UserDashboard"; 
import UserHome from "./pages/user/UserHome"; // User home page after login
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MyComplaintsPage from "./pages/user/MyComplaintsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />

      {/* ✅ Home Page After Login */}
      <Route path="/user/home" element={<UserHome />} />  {/* Correct path for UserHome */}

      {/* ✅ Submit Complaint page */}
      <Route path="/user/submit-complaint" element={<UserDashboard />} />

      {/* ✅ My Complaints */}
      <Route path="/user/my-complaints" element={<MyComplaintsPage />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      
      {/* Catch-all 404 */}
      <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404 - Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
