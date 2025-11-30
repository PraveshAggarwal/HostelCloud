HostelCloud
HostelCloud is a comprehensive Hostel Management System built with the MERN Stack (MongoDB, Express.js, React, Node.js). It simplifies hostel administration by providing distinct portals for Admins and Students to manage daily operations, attendance, complaints, and facility requests efficiently.

✨ Key Features
🔐 Authentication & Security
Role-Based Access Control: Secure login separation for Admins and Students.

Secure Authentication: Powered by JWT (JSON Web Tokens) stored in HTTP-only cookies.

Protected Routes: Frontend middleware prevents unauthorized access to dashboard pages.

👨‍💼 Admin Dashboard
Student Management: View and manage student records.

Attendance Oversight: Track student attendance and view daily/monthly stats.

Leave Management: Review and approve/reject student leave applications.

Complaint Resolution: View and manage maintenance or other complaints raised by students.

Laundry Management: Oversee laundry service requests.

Notice Board: Create and broadcast digital notices to all students.

Quick Stats: Dashboard overview with counters for total students, attendance, complaints, etc.

🎓 Student Dashboard
Profile View: Access personal details (Room No, Mobile, Guardian info).

Attendance Tracker: View personal attendance history and percentage with visual charts.

Digital Notice Board: Real-time access to hostel announcements.

Complaint Box: Submit complaints regarding hostel facilities.

Leave Application: Apply for leaves digitally.

Laundry Requests: Request laundry services directly from the dashboard.

🛠 Tech Stack
Frontend
Framework: React 19

Build Tool: Vite

Styling: Tailwind CSS + DaisyUI

Routing: React Router DOM v7

State Management: Zustand (Client state), TanStack Query (Server state)

Icons: Lucide React

HTTP Client: Axios

Notifications: React Hot Toast

Backend
Runtime: Node.js

Framework: Express.js

Database: MongoDB (with Mongoose)

Authentication: JWT, Bcrypt.js, Cookie-Parser

CORS: Configured for secure cross-origin requests

📂 Project Structure
/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Logic for Auth, Students, Attendance, etc.
│   │   ├── lib/           # DB Connection and helpers
│   │   ├── middleware/    # Auth middleware (protectRoute)
│   │   ├── models/        # Mongoose Schemas (User, Student, Notice, etc.)
│   │   ├── routes/        # API Routes
│   │   └── server.js      # Express Entry Point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Dashboards (Admin/Student) & Feature Components
│   │   ├── hooks/         # Custom hooks (useAuth, useLogout)
│   │   ├── lib/           # API and Axios setup
│   │   ├── pages/         # Login, Register, AdminPage, StudentPage
│   │   ├── App.jsx        # Routing & Layout
│   │   └── main.jsx       # Entry Point
│   └── package.json
│
└── package.json           # Root scripts for building and starting
🚀 Getting Started
Prerequisites
Node.js (v18+)

MongoDB Atlas connection string (or local MongoDB)

1. Installation
Clone the repository and install dependencies for the root, backend, and frontend.

Bash

git clone https://github.com/PraveshAggarwal/HostelCloud.git
cd HostelCloud

# Install dependencies for both backend and frontend automatically via root script
# (Or go into each folder and run npm install manually)
npm run build 
2. Environment Configuration
Create a .env file in the backend directory:

Code snippet

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secure_secret_key
NODE_ENV=development
(Note: The frontend is configured to communicate with http://localhost:5000 or the relative path in production.)

3. Running the Application
To run the app in Development Mode, you need two terminals:

Terminal 1: Backend

Bash

cd backend
npm run dev
# Server runs on http://localhost:5000
Terminal 2: Frontend

Bash

cd frontend
npm run dev
# App runs on http://localhost:5173
4. Production Build
To build the frontend and serve it via the backend (Node.js) server:

Bash

# From the root directory
npm run build
npm start
The build script installs dependencies and builds the React app into frontend/dist.

The start script runs the backend, which is configured to serve static files from frontend/dist when NODE_ENV=production.
