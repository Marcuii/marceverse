import { useEffect, useState } from "react";
import {
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiJavascript,
  SiGit,
  SiGithub,
  SiDocker,
  SiLinux,
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiRedux,
  SiMongodb,
  SiExpress,
  SiNestjs,
  SiNodedotjs,
} from "react-icons/si";
import { Typewriter } from "react-simple-typewriter";
import ParticlesComponent from "./ParticlesComponent";

const Landing = () => {
  const [visible, setVisible] = useState(true);

  // Hide the landing page after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setVisible(false);
      }
    };
    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`z-50 absolute inset-0 h-screen flex items-center justify-center bg-neutral text-neutral-content ${
        visible ? "" : "animate-slideup"
      }`}
    >
      <ParticlesComponent />
      <h1 className="md:hidden lg:block top-20 sm:top-12 lg:top-16 lg:left-16 absolute text-5xl font-extrabold tracking-tight text-start animate-fadein">
        <Typewriter
          words={["Welcome!", "to ..."]}
          loop={50}
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h1>

      <div className="w-3/12 lg:w-1/5 aspect-square bg-primary [mask-image:url('/mvicon.png')] [mask-repeat:no-repeat] [mask-size:contain] [mask-position:center]  absolute px-4 animate-fadein" />

      <div className="relative flex items-center justify-center w-[190vw] aspect-square lg:w-9/12 lg:max-w-6xl overflow-hidden p-4">
        <Orbit
          size="100%"
          duration="35s"
          reverse
          icons={[
            {
              Icon: SiMongodb,
              color: "text-green-500",
              pos: "-top-4 left-1/2 -translate-x-1/2",
            },
            {
              Icon: SiExpress,
              color: "text-gray-200",
              pos: "-bottom-4 left-1/2 -translate-x-1/2",
            },
            {
              Icon: SiNestjs,
              color: "text-red-500",
              pos: "-left-4 top-1/2 -translate-y-1/2",
            },
            {
              Icon: SiNodedotjs,
              color: "text-green-400",
              pos: "-right-4 top-1/2 -translate-y-1/2",
            },
          ]}
        >
          <Orbit
            size="90%"
            duration="28s"
            icons={[
              {
                Icon: SiReact,
                color: "text-cyan-300",
                pos: "-top-4 left-1/2 -translate-x-1/2",
              },
              {
                Icon: SiTailwindcss,
                color: "text-sky-300",
                pos: "-bottom-4 left-1/2 -translate-x-1/2",
              },
              {
                Icon: SiNextdotjs,
                color: "text-white",
                pos: "-left-4 top-1/2 -translate-y-1/2",
              },
              {
                Icon: SiRedux,
                color: "text-indigo-400",
                pos: "-right-4 top-1/2 -translate-y-1/2",
              },
            ]}
          >
            <Orbit
              size="80%"
              duration="22s"
              reverse
              icons={[
                {
                  Icon: SiGit,
                  color: "text-orange-600",
                  pos: "-top-4 left-1/2 -translate-x-1/2",
                },
                {
                  Icon: SiGithub,
                  color: "text-gray-200",
                  pos: "-bottom-4 left-1/2 -translate-x-1/2",
                },
                {
                  Icon: SiDocker,
                  color: "text-sky-400",
                  pos: "-left-4 top-1/2 -translate-y-1/2",
                },
                {
                  Icon: SiLinux,
                  color: "text-yellow-500",
                  pos: "-right-4 top-1/2 -translate-y-1/2",
                },
              ]}
            >
              <Orbit
                size="70%"
                duration="15s"
                icons={[
                  {
                    Icon: SiHtml5,
                    color: "text-orange-500",
                    pos: "-top-4 left-1/2 -translate-x-1/2",
                  },
                  {
                    Icon: SiCss3,
                    color: "text-blue-500",
                    pos: "-bottom-4 left-1/2 -translate-x-1/2",
                  },
                  {
                    Icon: SiBootstrap,
                    color: "text-purple-600",
                    pos: "-left-4 top-1/2 -translate-y-1/2",
                  },
                  {
                    Icon: SiJavascript,
                    color: "text-yellow-400",
                    pos: "-right-4 top-1/2 -translate-y-1/2",
                  },
                ]}
              >
              </Orbit>
            </Orbit>
          </Orbit>
        </Orbit>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => setVisible(false)}
      >
        <span className="block w-8 h-8 border-l-4 border-b-4 border-primary -rotate-45"></span>
      </div>
    </div>
  );
};

// Orbits creating function
function Orbit({ size, duration, icons, reverse, children }) {
  return (
    <div
      className={`relative flex items-center aspect-square justify-center rounded-full border border-neutral-content/50 animate-spin`}
      style={{
        width: size,
        height: size,
        animationDuration: duration,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      {icons.map(({ Icon, color, pos }, i) => (
        <div key={i} className={`absolute ${pos}`}>
          <Icon className={`text-2xl sm:text-3xl md:text-4xl animate-spin-slow ${color}`} />
        </div>
      ))}
      {children}
    </div>
  );
}

export default Landing;
