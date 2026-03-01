# MarceVerse — Client

> Public-facing portfolio website with a multiverse / cosmic theme.

## Overview

The client is the visitor-facing single-page application that renders the MarceVerse portfolio. It fetches all content from the API at runtime, supports 30+ DaisyUI themes, and features particle backgrounds, scroll-triggered animations, and lazy-loaded routes.

| Aspect | Detail |
| --- | --- |
| Framework | React 19 |
| Build Tool | Vite 7 (SWC plugin) |
| Styling | Tailwind CSS 3 + DaisyUI 4 + Material Tailwind |
| Animations | Framer Motion 12 |
| Particles | tsparticles (slim) |
| Routing | React Router 7 |
| Email | EmailJS (contact form) |
| Deployment | Vercel (static SPA) |

---

## Directory Structure

```
client/
├── public/
│   └── bg.jpg                      # Full-screen background image
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ErrorBoundary.jsx       # Graceful React error catching
│   │   ├── Landing.jsx             # Full-screen intro (orbiting icons + typewriter)
│   │   ├── ParticlesComponent.jsx  # tsparticles canvas (variant 1)
│   │   ├── ParticlesComponent2.jsx # tsparticles canvas (variant 2)
│   │   ├── StickyNavbar.jsx        # Fixed header with theme switcher
│   │   └── Home/
│   │       ├── About.jsx           # About / bio section
│   │       ├── Contact.jsx         # EmailJS contact form
│   │       ├── EducationActivities.jsx # Education, certifications, activities, competitions
│   │       ├── ExperienceSection.jsx   # Experience timeline cards
│   │       ├── Hero.jsx            # Hero banner with typewriter effect
│   │       └── Projects.jsx        # Project showcase grid
│   ├── config/
│   │   └── api.js                  # API base URL from env
│   ├── context/
│   │   └── GeneralInfoContext.jsx  # Singleton general info provider
│   ├── pages/
│   │   ├── Home.jsx                # Assembles all Home/* sections
│   │   ├── ExperiencePage.jsx      # Detail page (experience/education/etc.)
│   │   └── NotFound.jsx            # 404 page
│   ├── App.jsx                     # Root component + route definitions
│   ├── index.css                   # Tailwind directives + custom styles
│   └── main.jsx                    # React DOM entry point
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

### Dynamic Data Fetching

All portfolio content (projects, experiences, education, etc.) is fetched from the MarceVerse API at runtime. No data is bundled at build time. The `GeneralInfoContext` provides profile information globally.

### Unified Detail Page

All entity detail routes (`/experience/:id`, `/education/:id`, `/certification/:id`, `/activity/:id`, `/competition/:id`) render the same `ExperiencePage` component. The entity type is inferred from the URL path, keeping the client routing minimal.

### Visual Layers

The app renders a layered visual stack:

1. **Landing** — Full-screen intro with orbiting tech icons and typewriter effect
2. **Background** — Fixed background image + particle canvas overlay
3. **Content** — Sticky navbar + lazy-loaded route pages

### Theming

Supports 30+ DaisyUI themes that users can switch via the navbar. Theme preference is persisted in `localStorage` and falls back to system preference (`prefers-color-scheme`).

---

## Routes

| Path | Component | Description |
| --- | --- | --- |
| `/` | `Home` | Main portfolio page (Hero, About, Projects, Experience, Education, Contact) |
| `/experience/:id` | `ExperiencePage` | Experience detail view |
| `/education/:id` | `ExperiencePage` | Education detail view |
| `/certification/:id` | `ExperiencePage` | Certification detail view |
| `/activity/:id` | `ExperiencePage` | Activity detail view |
| `/competition/:id` | `ExperiencePage` | Competition detail view |
| `*` | `NotFound` | 404 page |

---

## Environment Variables

Copy `.env.example` to `.env`:

```env
# API
VITE_API_BASE_URL=http://localhost:5000/api

# EmailJS (contact form)
VITE_EMAILJS_Service_ID=your_service_id
VITE_EMAILJS_Template_ID=your_template_id
VITE_EMAILJS_Public_Key=your_public_key
```

---

## Local Development

```bash
# From the client/ directory
npm install
cp .env.example .env   # Fill in values
npm run dev             # Starts on http://localhost:5173
```

---

## Vercel Deployment

1. Create a new Vercel project linked to the monorepo.
2. Set **Root Directory** to `client`.
3. Set **Framework Preset** to **Vite**.
4. Add all environment variables from `.env.example` in the Vercel dashboard.
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
| react-router | 7.x | Client-side routing |
| framer-motion | 12.x | Scroll & layout animations |
| @tsparticles/react + slim | 3.x | Particle background effects |
| @material-tailwind/react | 3.x-beta | Material Design components |
| @emailjs/browser | 4.x | Contact form email delivery |
| react-simple-typewriter | 5.x | Typewriter text effect |
| iconoir-react + react-icons | 7.x / 5.x | Icon libraries |
| tailwindcss | 3.x | Utility-first CSS |
| daisyui | 4.x | Tailwind component library (30+ themes) |
| vite | 7.x | Build tool + dev server |
