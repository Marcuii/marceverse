# MarceVerse — Admin Panel

> React-based content management dashboard for the MarceVerse portfolio.

## Overview

The admin panel is a single-page application that communicates with the MarceVerse API to manage all portfolio content — projects, experience, education, certifications, activities, competitions, and general profile information.

| Aspect | Detail |
| --- | --- |
| Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 3 + DaisyUI 4 |
| Forms | React Hook Form 7 + Zod 4 validation |
| Drag & Drop | @dnd-kit (sortable) |
| HTTP Client | Axios (pre-configured interceptor) |
| Routing | React Router 7 |
| Deployment | Vercel (static SPA) |

---

## Directory Structure

```
admin/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ConfirmModal.jsx    # Reusable delete confirmation dialog
│   │   ├── Layout.jsx          # Sidebar + Outlet wrapper
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   ├── SortableRow.jsx     # Drag-and-drop table row (@dnd-kit)
│   │   └── Toast.jsx           # Toast notification component
│   ├── config/
│   │   ├── entityConfig.js     # Entity type configurations (fields, labels, API fns)
│   │   └── entitySchema.js     # Zod validation schemas per entity
│   ├── context/
│   │   └── AuthContext.jsx     # API-key auth state + localStorage persistence
│   ├── pages/
│   │   ├── Dashboard.jsx       # Overview / stats page
│   │   ├── EntityFormPage.jsx  # Config-driven create/edit form (5 entity types)
│   │   ├── EntityListPage.jsx  # Config-driven list + reorder (5 entity types)
│   │   ├── GeneralInfo.jsx     # Singleton profile editor
│   │   ├── Login.jsx           # API-key login page
│   │   ├── ProjectForm.jsx     # Project-specific create/edit form
│   │   └── Projects.jsx        # Project list + reorder page
│   ├── services/
│   │   └── api.js              # Axios instance + all CRUD exports
│   ├── App.jsx                 # Root component + routing tree
│   ├── index.css               # Tailwind directives
│   └── main.jsx                # React DOM entry point
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

---

## Architecture

### Config-Driven Entity Management

Five entity types (Experience, Education, Certification, Activity, Competition) share an identical data shape. Instead of five separate list pages and five form pages, the admin uses a **factory pattern**:

| File | Purpose |
| --- | --- |
| `entityConfig.js` | Declares field names, labels, placeholders, and API functions per entity |
| `entitySchema.js` | Zod validation schemas for each entity type |
| `EntityListPage.jsx` | Single list component that reads config from the URL param `:entity` |
| `EntityFormPage.jsx` | Single form component that builds fields from config + validates with Zod |

This eliminates ~80% of duplicated admin page code. Projects and GeneralInfo have dedicated pages due to their unique schemas.

### Authentication

Authentication uses a static API key (not JWT). The key is stored in `localStorage` and automatically attached to every outgoing request via an Axios request interceptor (`x-api-key` header).

### Drag-and-Drop Reorder

All entity list pages support drag-and-drop reordering via `@dnd-kit`. Order changes are persisted to the server via `PUT /api/reorder/:type`.

---

## Routes

| Path | Component | Description |
| --- | --- | --- |
| `/login` | `Login` | API-key authentication |
| `/` | `Dashboard` | Overview page (protected) |
| `/projects` | `Projects` | Project list + reorder |
| `/projects/new` | `ProjectForm` | Create project |
| `/projects/edit/:id` | `ProjectForm` | Edit project |
| `/:entity` | `EntityListPage` | Config-driven entity list |
| `/:entity/new` | `EntityFormPage` | Config-driven create form |
| `/:entity/edit/:id` | `EntityFormPage` | Config-driven edit form |
| `/general` | `GeneralInfo` | Profile info editor |

---

## Environment Variables

Copy `.env.example` to `.env`:

```env
# Local:  http://localhost:5000/api
# Prod:   https://your-server.vercel.app/api
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Local Development

```bash
# From the admin/ directory
npm install
cp .env.example .env   # Point at running server
npm run dev             # Starts on http://localhost:5174
```

---

## Vercel Deployment

1. Create a new Vercel project linked to the monorepo.
2. Set **Root Directory** to `admin`.
3. Set **Framework Preset** to **Vite**.
4. Add `VITE_API_BASE_URL` environment variable pointing to the deployed server URL.
5. The `vercel.json` SPA rewrite ensures client-side routing works.

---

## Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `npm run dev` | `vite` | Start dev server (HMR) |
| `npm run build` | `vite build` | Production build to `dist/` |
| `npm run lint` | `eslint .` | Lint all source files |
| `npm run preview` | `vite preview` | Preview production build locally |

---

## Tech Stack

| Package | Version | Role |
| --- | --- | --- |
| react | 19.x | UI framework |
| react-router-dom | 7.x | Client-side routing |
| react-hook-form | 7.x | Performant form management |
| zod + @hookform/resolvers | 4.x / 5.x | Schema-based form validation |
| @dnd-kit/core + sortable | 6.x / 10.x | Drag-and-drop reordering |
| axios | 1.x | HTTP client |
| tailwindcss | 3.x | Utility-first CSS |
| daisyui | 4.x | Tailwind component library |
| vite | 7.x | Build tool + dev server |
