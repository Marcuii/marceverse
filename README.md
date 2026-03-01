# MarceVerse

> Full-stack MERN portfolio platform — public site, admin dashboard, and API deployed as a Vercel monorepo.

[![Version](https://img.shields.io/badge/version-3.0.0-blue)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![License](https://img.shields.io/badge/license-ISC-lightgrey)]()

---

## Table of Contents

- [About](#about)
- [Architecture](#architecture)
- [Monorepo Structure](#monorepo-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment (Vercel)](#deployment-vercel)
- [API Reference](#api-reference)
- [Project History](#project-history)

---

## About

**MarceVerse** is a multiverse-themed developer portfolio that showcases projects, professional experience, education, certifications, activities, and competitions. The platform consists of three independently deployable applications:

| App | Description | Default Port |
| --- | --- | --- |
| **client** | Public portfolio website with cosmic theme, particles, and animations | `5173` |
| **admin** | Content management dashboard with drag-and-drop reordering | `5174` |
| **server** | RESTful Express API with MongoDB and Cloudinary integration | `5000` |

---

## Architecture

```
┌──────────────┐     ┌──────────────┐
│    Client     │     │    Admin     │
│  (React SPA)  │     │  (React SPA) │
│  Port 5173    │     │  Port 5174   │
└──────┬───────┘     └──────┬───────┘
       │   GET (public)      │   CRUD (x-api-key)
       └─────────┬───────────┘
                 ▼
       ┌──────────────────┐
       │      Server       │
       │   (Express API)   │
       │    Port 5000      │
       └────┬─────────┬───┘
            │         │
            ▼         ▼
    ┌───────────┐ ┌────────────┐
    │  MongoDB  │ │ Cloudinary │
    │  Atlas    │ │    CDN     │
    └───────────┘ └────────────┘
```

### Key Design Decisions

- **Dual entry points** — The Express app is built once in `server/app.js`. Local dev uses `server.js` (connects DB + listens), Vercel uses `api/index.js` (lazy DB connection as a serverless function).
- **Config-driven admin** — Five entity types share one list page and one form page via `entityConfig.js` + `entitySchema.js`, eliminating ~80% of CRUD boilerplate.
- **API-key auth** — Admin routes are protected by a static API key compared with `crypto.timingSafeEqual` (no JWT complexity needed for a single-user admin).
- **Vercel monorepo** — Three separate Vercel projects point to one GitHub repository, each with its own Root Directory.

---

## Monorepo Structure

```
marceverse/
├── client/              # Public portfolio SPA (React 19 + Vite 7)
│   ├── src/
│   │   ├── components/  # Landing, Navbar, Home sections, ErrorBoundary
│   │   ├── config/      # API base URL
│   │   ├── context/     # GeneralInfoContext
│   │   └── pages/       # Home, ExperiencePage, NotFound
│   ├── .env.example
│   ├── vercel.json
│   └── package.json
│
├── admin/               # Content management dashboard (React 19 + Vite 7)
│   ├── src/
│   │   ├── components/  # Layout, Sidebar, ConfirmModal, SortableRow, Toast
│   │   ├── config/      # entityConfig.js, entitySchema.js (Zod)
│   │   ├── context/     # AuthContext
│   │   ├── pages/       # Dashboard, EntityListPage, EntityFormPage, Projects, GeneralInfo
│   │   └── services/    # Axios API client
│   ├── .env.example
│   ├── vercel.json
│   └── package.json
│
├── server/              # Express 5 REST API
│   ├── api/
│   │   └── index.js     # Vercel serverless entry point
│   ├── config/          # MongoDB + Cloudinary configuration
│   ├── controllers/     # Entity CRUD factory + project + general + reorder
│   ├── middleware/       # asyncHandler, authMiddleware, errorHandler
│   ├── models/          # Mongoose schemas (7 models)
│   ├── routes/          # Express route files (9 routes)
│   ├── utils/           # Cloudinary helpers
│   ├── app.js           # Express app factory
│   ├── server.js        # Local development entry point
│   ├── vercel.json
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── package.json         # Root scripts (dev, install-all)
└── README.md
```

> Each sub-project has its own detailed README — see [`client/README.md`](client/README.md), [`admin/README.md`](admin/README.md), and [`server/README.md`](server/README.md).

---

## Tech Stack

### Server

| Technology | Purpose |
| --- | --- |
| Node.js ≥ 18 | Runtime |
| Express 5 | Web framework |
| Mongoose 9 | MongoDB ODM |
| Cloudinary + Multer | Image upload & CDN |
| Helmet | Security headers |
| express-rate-limit | Request throttling |
| dotenv | Environment config |

### Client

| Technology | Purpose |
| --- | --- |
| React 19 | UI framework |
| Vite 7 (SWC) | Build tool |
| Tailwind CSS 3 + DaisyUI 4 | Styling (30+ themes) |
| Material Tailwind 3 | Material Design components |
| Framer Motion 12 | Animations |
| tsparticles | Particle backgrounds |
| EmailJS | Contact form |
| React Router 7 | Routing |

### Admin

| Technology | Purpose |
| --- | --- |
| React 19 | UI framework |
| Vite 7 | Build tool |
| Tailwind CSS 3 + DaisyUI 4 | Styling |
| React Hook Form 7 | Form management |
| Zod 4 | Schema validation |
| @dnd-kit | Drag-and-drop reorder |
| Axios | HTTP client |
| React Router 7 | Routing |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MongoDB** — Atlas cluster or local instance
- **Cloudinary** account (for image uploads)

### Installation

```bash
# Clone the repository
git clone https://github.com/Marcuii/marceverse.git
cd marceverse

# Install all dependencies (client + server + admin)
npm run install-all
```

---

## Environment Variables

Each sub-project requires its own `.env` file. Copy the examples and fill in real values:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
cp admin/.env.example  admin/.env
```

### Server (`server/.env`)

| Variable | Description | Example |
| --- | --- | --- |
| `PORT` | HTTP port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `my_cloud` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abc...xyz` |
| `ADMIN_API_KEY` | Static admin API key | `your_secure_key` |
| `CORS_ORIGINS` | Comma-separated allowed origins | `http://localhost:5173,http://localhost:5174` |

### Client (`client/.env`)

| Variable | Description | Example |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Server API URL | `http://localhost:5000/api` |
| `VITE_EMAILJS_Service_ID` | EmailJS service ID | `service_xxx` |
| `VITE_EMAILJS_Template_ID` | EmailJS template ID | `template_xxx` |
| `VITE_EMAILJS_Public_Key` | EmailJS public key | `xxx` |

### Admin (`admin/.env`)

| Variable | Description | Example |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Server API URL | `http://localhost:5000/api` |

---

## Development

### Run All Three Apps

```bash
# From the root directory — starts server, client, and admin concurrently
npm run dev
```

### Run Individually

```bash
npm run server   # Express API on :5000
npm run client   # Portfolio site on :5173
npm run admin    # Admin dashboard on :5174
```

---

## Deployment (Vercel)

The monorepo deploys as **three separate Vercel projects**, all linked to the same GitHub repository. Each project uses a different **Root Directory**.

### 1. Server (API)

| Setting | Value |
| --- | --- |
| Root Directory | `server` |
| Framework Preset | Other |
| Environment Variables | All from `server/.env.example` |

The `server/vercel.json` rewrites all routes to the `api/index.js` serverless function. The serverless entry lazily connects to MongoDB on cold start and reuses the connection across warm invocations.

### 2. Client (Portfolio)

| Setting | Value |
| --- | --- |
| Root Directory | `client` |
| Framework Preset | Vite |
| Environment Variables | All from `client/.env.example` |

Point `VITE_API_BASE_URL` to the deployed server URL (e.g. `https://marceverse-api.vercel.app/api`).

### 3. Admin (Dashboard)

| Setting | Value |
| --- | --- |
| Root Directory | `admin` |
| Framework Preset | Vite |
| Environment Variables | All from `admin/.env.example` |

Point `VITE_API_BASE_URL` to the deployed server URL. Add the admin's production domain to the server's `CORS_ORIGINS`.

### Post-Deployment Checklist

- [ ] Server `CORS_ORIGINS` includes both the client and admin production domains
- [ ] Client and admin `VITE_API_BASE_URL` points to the deployed server
- [ ] MongoDB Atlas network access allows Vercel's IP ranges (or `0.0.0.0/0`)
- [ ] Cloudinary credentials are set in the server's Vercel environment
- [ ] `ADMIN_API_KEY` is set to a strong, unique value

---

## API Reference

### Public Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Health check |
| `GET` | `/api/projects` | All projects |
| `GET` | `/api/experience` | All experiences |
| `GET` | `/api/experience/:id` | Single experience |
| `GET` | `/api/education` | All education entries |
| `GET` | `/api/education/:id` | Single education entry |
| `GET` | `/api/certification` | All certifications |
| `GET` | `/api/certification/:id` | Single certification |
| `GET` | `/api/activity` | All activities |
| `GET` | `/api/activity/:id` | Single activity |
| `GET` | `/api/competition` | All competitions |
| `GET` | `/api/competition/:id` | Single competition |
| `GET` | `/api/general` | General / profile info |

### Protected Endpoints (require `x-api-key` header)

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/projects` | Create project (multipart) |
| `PUT` | `/api/projects/:id` | Update project (multipart) |
| `DELETE` | `/api/projects/:id` | Delete project |
| `POST` | `/api/{entity}` | Create entity (multipart) |
| `PUT` | `/api/{entity}/:id` | Update entity (multipart) |
| `DELETE` | `/api/{entity}/:id` | Delete entity |
| `PUT` | `/api/general` | Update general info (multipart) |
| `PUT` | `/api/reorder/:type` | Persist reorder |
| `GET` | `/api/auth/verify` | Verify API key |

---

## Project History

| Version | Description |
| --- | --- |
| **v1.0** | Static HTML portfolio with local JSON data files |
| **v2.0** | Client-only deployment at [marceverse.vercel.app](https://marceverse.vercel.app/) |
| **v3.0** | Full MERN stack — Express API, MongoDB Atlas, Cloudinary CDN, admin dashboard, Vercel monorepo deployment |

---

## License

ISC
