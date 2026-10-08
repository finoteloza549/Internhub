# InternHub — Full-Stack MERN Internship Platform

InternHub is a production-quality web application designed for students to discover internships and entry-level jobs, manage their applications, and enable employers and administrators to streamline job recruitment and platform moderation.

---

## 🏗 Core Architecture

InternHub is structured following strict clean software architecture principles:

```
React (Vite + Tailwind) 
  ↓
REST API (Axios Services)
  ↓
Express Routes & Controllers
  ↓
Services / Business Logic
  ↓
Mongoose ODM Schemas & Models
  ↓
MongoDB Database
```

---

## 🛠 Tech Stack

### Frontend
- **Framework & Tooling**: React 18, Vite, React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios with request/response interceptors
- **Forms & Validation**: React Hook Form, Zod
- **Icons**: Lucide React
- **State Management**: React Context API (`AuthContext`)

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB & Mongoose ODM
- **Security**: Helmet, CORS, bcryptjs, JSON Web Tokens (JWT)
- **Validation & Error Handling**: Zod, Centralized ApiError & Error Middleware
- **Logging**: Morgan HTTP logger

---

## 📁 Project Structure

```
internhub/
├── client/                     # React Frontend (Vite + Tailwind)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images and local media
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Navbar, Footer, Button, Loader, ErrorMessage
│   │   │   ├── layout/         # Layout specific components
│   │   │   ├── jobs/           # Job listing cards & filters
│   │   │   ├── applications/   # Application tracking UI
│   │   │   └── dashboard/      # Role-specific dashboard widgets
│   │   ├── context/            # AuthContext provider
│   │   ├── hooks/              # useAuth, useFetch hooks
│   │   ├── layouts/            # PublicLayout, StudentLayout, EmployerLayout, AdminLayout
│   │   ├── pages/              # Public, Student, Employer, Admin page views
│   │   ├── routes/             # AppRoutes central router
│   │   ├── services/           # API integration services (axios)
│   │   └── utils/              # Helper utilities & constants
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Express Backend REST API
│   ├── src/
│   │   ├── config/             # Database (Mongoose) & Cloudinary configs
│   │   ├── controllers/        # HTTP Request & Response handlers
│   │   ├── middleware/         # Auth, Role, Error & Upload middlewares
│   │   ├── models/             # Mongoose Schemas (User, StudentProfile, Job, etc.)
│   │   ├── routes/             # Express API endpoints
│   │   ├── services/           # Core Business Logic Services
│   │   ├── utils/              # JWT, Password & ApiError utilities
│   │   ├── validators/         # Zod schemas for request validation
│   │   ├── app.js              # Express app initialization & middleware configuration
│   │   └── server.js           # Server boot & database connection
│   ├── .env.example
│   └── package.json
│
├── .env.example
├── .gitignore
└── package.json                # Monorepo task scripts
```

---

## ⚡ Quick Start (Phase 1 Setup)

### Prerequisites
- **Node.js**: v18+ (Tested on v24.x)
- **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` or a MongoDB Atlas connection string.

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd internhub
   ```

2. **Install all dependencies**:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` in the `server` directory:
   ```bash
   cd server
   cp .env.example .env
   ```

4. **Run the Application in Development**:
   - **Backend Server**:
     ```bash
     cd server
     npm run dev
     ```
     Server will start on `http://localhost:5000`. Health check endpoint is available at `http://localhost:5000/api/health`.

   - **Frontend Client**:
     ```bash
     cd client
     npm run dev
     ```
     Client will start on `http://localhost:5173`.

---

## 📜 Phase 1 — Verification Status

- [x] Monorepo workspace initialized
- [x] Backend Express REST API app structured with security middleware (Helmet, CORS, Morgan)
- [x] Mongoose database connector & centralized error handler configured
- [x] Health check endpoint `/api/health` created and verified
- [x] React 18 + Vite + Tailwind CSS frontend initialized with React Router DOM
- [x] Clean role-aware Layouts (`PublicLayout`, `StudentLayout`, `EmployerLayout`, `AdminLayout`)
- [x] Modular Axios API layer with JWT interceptors
- [x] AuthContext global state management & `useAuth` hook ready for Phase 2 authentication
