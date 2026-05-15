CampusCare – Campus Complaint Management System

Built to streamline campus complaint resolution by digitizing complaint tracking, admin management, and automated email communication using the MERN stack.

CampusCare is a full-stack MERN web application developed to simplify and digitalize the campus complaint management process. The platform allows students to submit, track, and manage complaints related to hostel and college issues, while administrators can efficiently monitor, resolve, and manage complaints through a centralized dashboard.
The system improves transparency between students and administration by providing real-time complaint tracking, automated email notifications, complaint filtering, and Excel report generation.

🚀 Features
👨‍🎓 Student Module
Student Registration & Login
Submit complaints related to Hostel or College
Track complaint status in real time
View complaint history
Delete submitted complaints
Responsive and user-friendly interface
👨‍💼 Admin Module
Secure admin login
View all submitted complaints
Filter complaints by category and status
Mark complaints as solved
Export complaint records to Excel
Centralized complaint management dashboard
📧 Email Notification System
Automatic email notification to admin when a complaint is submitted
Confirmation email sent to student after complaint submission
Resolution email sent to student when complaint status is updated to "Solved"

🛠️ Tech Stack
Frontend
React.js
React Router DOM
Axios
Tailwind CSS
SheetJS (xlsx)
file-saver
Backend
Node.js
Express.js
express-async-handler
Database
MongoDB
Mongoose
Authentication & Security
JWT Authentication
bcryptjs
Additional Tools
Nodemailer (Gmail SMTP)
Nodemon

📂 Project Structure
CampusCare/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── sendEmail.js
│
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        ├── styles/
        └── App.js

⚙️ Core Functionalities
User Authentication
User registration and login system
JWT token generation after login
Local storage-based session handling
Complaint Management
Create complaints with category selection
Complaint status tracking (Pending / Solved)
Filter complaints by category and status
Delete complaints functionality
Admin Dashboard
View all complaints in responsive cards
Update complaint resolution status
Complaint filtering system
Export filtered complaints to Excel format
Email Automation
Admin receives complaint alerts instantly
Students receive confirmation and resolution emails automatically

🔄 Workflow
Student registers/login into the system
Student submits a complaint
Complaint data is stored in MongoDB
Admin reviews complaints through dashboard
Admin updates complaint status to "Solved"
Student receives automated resolution email

🖥️ Installation & Setup

Clone Repository
git clone <repository-url>
cd CampusCare

Backend Setup
cd backend
npm install

Create a .env file inside the backend folder:
MONGO_URI=mongodb://localhost:27017/campuscare
PORT=5000
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin_email@gmail.com

Start backend server:
npm run dev

Frontend Setup
cd frontend
npm install
npm start

Frontend runs on: http://localhost:3000
Backend runs on: http://localhost:5000

📊 Key Highlights
Full-stack MERN architecture
Complaint tracking system
Automated email notifications
Excel export functionality
Responsive UI design
Centralized admin dashboard
Real-time complaint status updates

🔮 Future Enhancements
Password hashing implementation
JWT middleware route protection
File/image upload support
Department-wise complaint handling
Cloud deployment support
Analytics dashboard
Mobile responsive optimization

📌 Conclusion

CampusCare provides an efficient and transparent digital solution for handling campus complaints. By automating complaint submission, tracking, resolution updates, and notifications, the system improves communication between students and administration while maintaining organized complaint records using modern MERN stack technologies.
