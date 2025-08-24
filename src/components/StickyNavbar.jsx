import {
  Button,
  IconButton,
  Collapse,
  Navbar,
  Menu,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  MenuScale,
  Xmark,
} from "iconoir-react";
import { IoMdColorPalette } from "react-icons/io";
import { FaGraduationCap, FaHome, FaProjectDiagram } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { MdWorkspacePremium } from "react-icons/md";
import { LuMessageCircleMore } from "react-icons/lu";

// Navlist Creator
const LINKS = [
  {
    icon: FaHome,
    title: "Home",
    href: "/#hero",
  },
  {
    icon: FaUserGear,
    title: "About",
    href: "/#about",
  },
  {
    icon: FaProjectDiagram,
    title: "Projects",
    href: "/#projects",
  },
  {
    icon: MdWorkspacePremium,
    title: "Experience",
    href: "/#experience",
  },
  {
    icon: FaGraduationCap,
    title: "E & A",
    href: "/#education",
  },
  {
    icon: LuMessageCircleMore,
    title: "Contact",
    href: "/#contact",
  },
];
  
function NavList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  const handleScroll = (href) => {
    const sectionId = href.replace("/#", "");

    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="m-auto flex flex-col lg:flex-row gap-x-3 gap-y-1.5 items-center">
      {LINKS.map(({ icon: Icon, title, href }) => {
        const sectionId = href.replace("/#", "");
        const isActive = activeSection === sectionId;

        return (
          <button
            key={title}
            onClick={() => handleScroll(href)}
            className={`w-full flex items-center gap-x-2 p-1 lg:px-2 rounded-md justify-center transition-all duration-200
              ${isActive ? "bg-primary text-primary-content shadow-md" : "hover:text-primary hover:bg-neutral-content/65"}`}
          >
            <Icon className="h-4 w-4" />
            {title}
          </button>
        );
      })}
    </div>
  );
}

// Themes Menu Creator
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

function ThemesMenu() {
  const [theme, setTheme] = useState("light");

  // Update theme on mount, also button text
  useEffect(() => {
    if (!localStorage.theme) {
      // Set theme as device preferences
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    } else {
      setTheme(localStorage.theme);
    }
  }, []);

  return (
    <Menu>
      <Menu.Trigger
        as={Button}
        className={`bg-neutral-content border-primary text-neutral hover:bg-neutral hover:text-neutral-content flex flex-row w-full lg:w-32`}
      >
        <IoMdColorPalette className="h-5 w-5 text-primary" />
        <span className="ml-2">{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
      </Menu.Trigger>
      <Menu.Content className="z-40 overflow-y-scroll h-96 pl-4 pt-4">
        {themes.map((theme) => (
          <Menu.Item
            key={theme}
            className="group bg-base-100/50 p-0 text-primary hover:text-primary dark:hover:text-primary focus:text-primary dark:focus:text-primary"
            data-theme={theme}
            onClick={() => (changeTheme(theme), setTheme(theme))}
          >
            <span className="rounded-3xl flex flex-row items-center justify-between gap-5 w-full bg-base-100 transition-all duration-200 p-2 group-hover:m-0 group-hover:rounded-sm m-1 group-hover:scale-105">
              <span className="text-sm">
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </span>
              <span className="flex flex-row gap-1">
                <span className="bg-primary h-9 rounded-badge w-2"></span>
                <span className="bg-secondary rounded-badge w-2"></span>
                <span className="bg-accent rounded-badge w-2"></span>
                <span className="bg-neutral rounded-badge w-2"></span>
              </span>
            </span>
          </Menu.Item>
        ))}
      </Menu.Content>
    </Menu>
  );
}

// Theme changer function
function changeTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

export default function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [actTheme, setActTheme] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Resize Listenr
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setActTheme(true);
        setOpenNav(false);
      } else {
        setActTheme(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`z-10 h-fit fixed top-0 w-full transition-all duration-500 ${
        scrolled ? "p-4" : "p-0"
      }`}
    >
      <Navbar
        className={`transition-all duration-500 bg-neutral text-neutral-content
        ${scrolled ? "rounded-box shadow-xl shadow-gray-800" : "border-0 rounded-none"}`}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row w-fit">
            <div className="w-28 h-12 bg-primary [mask-image:url('/mvicon.png')] [mask-repeat:no-repeat] [mask-size:contain] [mask-position:center]" />
            <span className="hidden pt-1 h-12 pl-6 border-l-2 text-3xl border-primary xl:block">
              MarceVerse
            </span>
          </div>
          <div className="hidden lg:block m-auto">
            <NavList />
          </div>
          {actTheme && <ThemesMenu />}
          <IconButton
            size="sm"
            variant="ghost"
            color="secondary"
            onClick={() => setOpenNav(!openNav)}
            className="ml-auto grid lg:hidden border-neutral-content"
          >
            {openNav ? (
              <Xmark className="h-5 w-5" />
            ) : (
              <MenuScale className="h-5 w-5" />
            )}
          </IconButton>
        </div>

        <Collapse open={openNav}>
          <hr className="my-2 border-t-2 border-neutral-content" />
          <NavList />
          <hr className="my-2 border-t-2 border-neutral-content" />
          <ThemesMenu />
        </Collapse>
      </Navbar>
    </div>
  );
}
