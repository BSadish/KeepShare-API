# 🚀 KeepShare API

A production-grade backend service for **bookmark management + real-time click tracking + analytics**, built with Node.js, Express, and MongoDB.

Instead of a basic CRUD app, this project focuses on **secure authentication, relational database modeling, and scalable backend architecture**.

---

## ✨ Key Highlights

- 🔐 Secure authentication using HTTP-only cookies + JWT
- 📊 Real-time click tracking & analytics engine
- 🧠 Clean layered architecture (Controller → Service → Model)
- ⚡ Global error handling with custom utilities
- 🗂️ Structured bookmark collections system
- 🔁 Redirect-based analytics tracking system

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (jsonwebtoken)
- **Security:** bcrypt password hashing, HTTP-only cookies
- **Architecture:** MVC pattern + custom middleware system

---

## 🏗️ System Design Overview

This project is built around 3 core data models:

### 👤 User
- Handles authentication & identity
- Stores hashed passwords (bcrypt)
- Maintains references to bookmarks & collections

### 🔖 Bookmark
- Stores URL, title, description
- Tracks **click analytics (`clicks`)**
- Acts as the core redirect entity

### 📁 Collection
- Groups bookmarks into categories
- Example: “Frontend Dev”, “System Design”, “Favorites”

---

## 🔥 Core Features

### 🔐 1. Secure Authentication System

- Uses **JWT tokens stored in HTTP-only cookies**
- Prevents XSS-based token theft
- Middleware (`verifyJWT`) validates user on protected routes

---

### 📊 2. Analytics Redirect Engine

Instead of returning JSON, the backend:

1. Receives request:
   ```
   GET /api/v1/b/:bookmarkId
   ```
2. Finds bookmark in MongoDB
3. Increments click counter:
   ```js
   $inc: { clicks: 1 }
   ```
4. Logs analytics event
5. Redirects user:
   ```js
   res.redirect(targetUrl)
   ```

👉 This makes the system behave like a real tracking engine (similar to Bitly-style logic)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/keepshare-api.git
cd keepshare-api
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret_key_make_it_long
ACCESS_TOKEN_EXPIRY=1d
```

---

### 4. Run the Project

#### 🔧 Development Mode
```bash
npm run dev
```

#### 🚀 Production Mode
```bash
npm start
```

---

## 📂 Project Structure

```
src/
│
├── config/         # Database connection & configuration
├── controllers/    # Business logic (route handlers)
├── middlewares/    # Auth, error handling, validations
├── models/         # Mongoose schemas (User, Bookmark, Collection)
├── routes/         # Express route definitions
├── utils/          # Custom helpers (ApiError, asyncHandler)
└── app.js          # App initialization & global middleware
```

---

## ⚙️ Architecture Philosophy

This project follows a **clean separation of concerns**:

- Routes → only define endpoints
- Controllers → handle request logic
- Models → handle database structure
- Middleware → handles authentication & errors
- Utils → reusable logic (error handling, async wrapper)

---

## 📌 Future Improvements

- 📈 Advanced analytics dashboard
- 📱 Frontend integration (React/Next.js)
- 🧾 Rate limiting for tracking API
- 📊 User-level analytics reporting
- 🔔 Event logging system

---

## 👨‍💻 Author

**KeepShare API Project**

Built to practice:
- Scalable backend design
- Authentication systems
- Real-world API architecture

---

## ⭐ If you like this project

Give it a star ⭐ and feel free to fork it!