import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Landing from "./components/Landing";
import ParticlesComponent2 from "./components/ParticlesComponent2";
import StickyNavbar from "./components/StickyNavbar";
import Home from "./pages/Home";
import ExperiencePage from "./pages/ExperiencePage";
import NotFound from "./pages/NotFound";

function App() {
  // Set initial theme based on localStorage or system preference
  useEffect(() => {
    if (!localStorage.theme) {
      // Set theme as device preferences
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
    <div className="relative">
      <Landing />
      <div className="z-0 top-0 left-0 right-0 min-h-screen bg-[url(/bg.jpg)] bg-cover bg-center fixed"></div>
      <ParticlesComponent2 />
      <div className="z-0 top-0 left-0 right-0 min-h-screen bg-base-100/20 bg-cover bg-center fixed"></div>

      <div className="relative z-10 flex flex-col items-center w-full bg-transparent pt-20">
        <StickyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="experience/:id" element={<ExperiencePage />} />
          <Route path="education/:id" element={<ExperiencePage />} />
          <Route path="activity/:id" element={<ExperiencePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
