# MarceVerse — Server

> RESTful Express 5 API powering the MarceVerse portfolio platform.

## Overview

The server exposes a JSON API consumed by both the **client** (public portfolio) and the **admin** panel. It handles CRUD for seven entity types, image uploads via Cloudinary, drag-and-drop reorder persistence, and API-key-based authentication.

| Aspect | Detail |
| --- | --- |
| Runtime | Node.js ≥ 18 |
| Framework | Express 5 |
| Database | MongoDB Atlas (Mongoose 9) |
| Image CDN | Cloudinary (multer-storage-cloudinary) |
| Auth | Static API-key via `x-api-key` header (constant-time comparison) |
| Deployment | Vercel Serverless Functions |

---

## Directory Structure

```
server/
├── api/
│   └── index.js            # Vercel serverless entry point
├── config/
│   ├── cloudinary.js        # Cloudinary SDK + Multer storage config
│   └── db.js                # Mongoose connection helper
├── controllers/
│   ├── entityController.js  # Shared CRUD factory for 5 entity types
│   ├── projectController.js # Project-specific CRUD (single image)
│   ├── generalInfoController.js
│   └── reorderController.js
├── middleware/
│   ├── asyncHandler.js      # Async route wrapper (catches thrown errors)
│   ├── authMiddleware.js    # API-key guard (constant-time compare)
│   └── errorHandler.js      # 404 catch-all + global error handler
├── models/
│   ├── Activity.js
│   ├── Certification.js
│   ├── Competition.js
│   ├── Education.js
│   ├── Experience.js
│   ├── GeneralInfo.js
│   └── Project.js
├── routes/
│   ├── activityRoutes.js
│   ├── authRoutes.js
│   ├── certificationRoutes.js
│   ├── competitionRoutes.js
│   ├── educationRoutes.js
│   ├── experienceRoutes.js
│   ├── generalInfoRoutes.js
│   ├── projectRoutes.js
│   └── reorderRoutes.js
├── utils/
│   └── cloudinaryUtils.js   # Cloudinary image deletion helper
├── app.js                   # Express app factory (middleware + routes)
├── server.js                # Local-dev entry (DB connect + listen)
├── vercel.json              # Vercel route rewrites
├── package.json
├── .env.example
└── README.md
```

---

## API Endpoints

### Public (no auth)

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/projects` | List all projects (sorted by order) |
| `GET` | `/api/experience` | List all experiences |
| `GET` | `/api/experience/:id` | Get single experience |
| `GET` | `/api/education` | List all education entries |
| `GET` | `/api/education/:id` | Get single education entry |
| `GET` | `/api/certification` | List all certifications |
| `GET` | `/api/certification/:id` | Get single certification |
| `GET` | `/api/activity` | List all activities |
| `GET` | `/api/activity/:id` | Get single activity |
| `GET` | `/api/competition` | List all competitions |
| `GET` | `/api/competition/:id` | Get single competition |
| `GET` | `/api/general` | Get general / profile info |
| `GET` | `/` | Health-check |

### Protected (requires `x-api-key` header)

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/projects` | Create project (multipart) |
| `PUT` | `/api/projects/:id` | Update project (multipart) |
| `DELETE` | `/api/projects/:id` | Delete project |
| `POST` | `/api/{entity}` | Create entity (multipart) |
| `PUT` | `/api/{entity}/:id` | Update entity (multipart) |
| `DELETE` | `/api/{entity}/:id` | Delete entity |
| `PUT` | `/api/general` | Update general info (multipart) |
| `PUT` | `/api/reorder/:type` | Persist reorder for any entity |
| `GET` | `/api/auth/verify` | Verify API key validity |

---

## Architecture

### Dual Entry Points

The Express `app` is created once in **`app.js`** (middleware, routes, error handlers). Two separate entry points consume it:

| File | Purpose |
| --- | --- |
| `server.js` | **Local development** — connects to MongoDB, starts `app.listen()` |
| `api/index.js` | **Vercel production** — lazy DB connection on cold start, delegates to `app` |

This split allows the same codebase to run locally with `nodemon` **and** deploy as a Vercel Serverless Function without any code changes.

### Entity Controller Factory

Five entity types (Experience, Education, Certification, Activity, Competition) share the same CRUD shape. `entityController.js` is a factory that generates `getAll`, `getById`, `create`, `update`, and `delete` handlers for any Mongoose model, eliminating duplication.

### Security

- **Helmet** — Sets secure HTTP headers.
- **CORS** — Configurable allowed origins via `CORS_ORIGINS` env var.
- **Rate Limiting** — Global 200 req / 10 min; stricter 60 req / 10 min on auth & reorder routes.
- **API-Key Auth** — Constant-time comparison via `crypto.timingSafeEqual` to prevent timing attacks.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# Server
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Auth
ADMIN_API_KEY=your_secure_api_key

# CORS (comma-separated origins)
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
```

---

## Local Development

```bash
# From the server/ directory
npm install
cp .env.example .env   # Fill in values
npm run dev             # Starts with nodemon on port 5000
```

---

## Vercel Deployment

1. Create a new Vercel project linked to the monorepo.
2. Set **Root Directory** to `server`.
3. Set **Framework Preset** to **Other**.
4. Add all environment variables from `.env.example` in the Vercel dashboard.
5. The `vercel.json` rewrites all incoming routes to the `api/index.js` serverless function.

---

## Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `npm start` | `node server.js` | Production start (local) |
| `npm run dev` | `nodemon server.js` | Development with hot-reload |

---

## Tech Stack

| Package | Version | Role |
| --- | --- | --- |
| express | 5.x | Web framework |
| mongoose | 9.x | MongoDB ODM |
| cloudinary | 1.x | Image CDN SDK |
| multer + multer-storage-cloudinary | 2.x / 4.x | File upload handling |
| helmet | 8.x | Security headers |
| cors | 2.x | Cross-origin resource sharing |
| express-rate-limit | 8.x | Request throttling |
| dotenv | 17.x | Environment variable loading |
