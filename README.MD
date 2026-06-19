KeepShare API 
Hey there! Welcome to KeepShare, a production-grade backend service built to handle user bookmark management alongside real-time click tracking and analytics.

Instead of just building another basic, flat CRUD application, this project was designed to practice secure session handling (via HTTP-Only cookies), deep database relationships, and dynamic server-side redirects.

Tech Stack & Patterns Used
Runtime: Node.js

Framework: Express.js (with custom global error handling)

Database: MongoDB via Mongoose (handling relational ObjectIDs)

Security: Hashed passwords using bcrypt & session management via JWT (jsonwebtoken)

Code Architecture: Controller-driven, decoupled routing, custom ApiError utilities, and asyncHandler wrappers to eliminate try-catch boilerplate.

The Data Architecture
The project utilizes three interconnected data models:

User: Manages identities, handles pre-save secure password hashing, and carries array references to their custom collections and bookmarks.

Bookmark: The core link entity. Tracks the destination URL, title, description, and an atomic clicks counter.

Collection: A structural wrapper allowing users to bucket individual bookmarks together into categories (e.g., "Frontend Dev Resources").

Key Features Under the Hood
1. Robust Auth Middleware (verifyJWT)
We bypass standard, insecure local storage tokens. Instead, the backend issues an Access Token on login and drops it into a secure, browser-inaccessible HTTP-Only Cookie. The auth.middleware.js automatically sniffs, verifies, and extracts user details for protected routes.

2. The Analytics Redirect Engine
When a user hits the tracking route (GET /api/v1/b/:bookmarkId), the backend doesn't just vomit a JSON object back. It instantly updates the MongoDB document incrementing the hit counter ($inc: { clicks: 1 }), logs the analytic metrics, and triggers a clean res.redirect() to send the client directly to their target web destination.

Getting Started
1. Clone & Install
Bash
npm install
2. Set up your Environment Variables
Create a .env file in your root folder and configure the following values:

Code snippet
PORT=8000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret_key_make_it_long
ACCESS_TOKEN_EXPIRY=1d
3. Run the App
Bash
# For development (with nodemon)
npm run dev

# For production
npm start
Project Structure
Plaintext
src/
├── config/          # Database connection logs
├── controllers/     # Route logic handling logic layers
├── middlewares/     # Auth checks, error capture bounds
├── models/          # User, Bookmark, and Collection schemas
├── routes/          # Clean Express routers
├── utils/           # Custom ApiError and asyncHandler utilities
└── app.js           # Server configurations & global middleware setups
