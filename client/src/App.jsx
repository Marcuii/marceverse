/**
 * @file App.jsx
 * @description Root component for the public portfolio site.
 *
 * Renders a layered visual stack:
 *  1. Full-screen Landing intro (orbiting tech icons + typewriter)
 *  2. Fixed background image + particle canvas
 *  3. Sticky navbar + lazy-loaded route pages (Home, ExperiencePage, 404)
 *
 * All detail routes (experience/:id, education/:id, etc.) reuse the
 * same `ExperiencePage` component — the entity type is inferred from
 * the URL path.
 */

import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import Landing from "./components/Landing";
import ParticlesComponent2 from "./components/ParticlesComponent2";
import StickyNavbar from "./components/StickyNavbar";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy-loaded route pages
const Home = lazy(() => import("./pages/Home"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Full-screen spinner shown while lazy-loaded pages are downloading. */
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
);

function App() {
  // Set initial theme based on localStorage or system preference
  useEffect(() => {
    if (!localStorage.theme) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      localStorage.setItem("theme", prefersDark ? "dark" : "light");
      document.documentElement.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
      );
    } else {
      document.documentElement.setAttribute("data-theme", localStorage.theme);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="relative">
        <Landing />
        <div className="z-0 top-0 left-0 right-0 min-h-screen bg-[url(/bg.jpg)] bg-cover bg-center fixed"></div>
        <ParticlesComponent2 />
        <div className="z-0 top-0 left-0 right-0 min-h-screen bg-base-100/20 bg-cover bg-center fixed"></div>

        <div className="relative z-10 flex flex-col items-center w-full bg-transparent pt-20">
          <StickyNavbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="experience/:id" element={<ExperiencePage />} />
              <Route path="education/:id" element={<ExperiencePage />} />
              <Route path="activity/:id" element={<ExperiencePage />} />
              <Route path="certification/:id" element={<ExperiencePage />} />
              <Route path="competition/:id" element={<ExperiencePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
