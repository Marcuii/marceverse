import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { oklch, formatHex } from "culori";

const ParticlesComponent2 = () => {
  const [init, setInit] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("");
  const [neutralColor, setNeutralColor] = useState("");

  useEffect(() => {
    // Function to get primary and neutral colors from CSS variables
    const getColors = () => {
      const style = getComputedStyle(document.documentElement);
      const primary = style.getPropertyValue("--p").trim().split(" ");
      const neutralContent = style.getPropertyValue("--nc").trim().split(" ");
      // Convert colors from oklch to HEX
      const splittedPrimary = {
        mode: "oklch",
        l: +primary[0].split("%")[0] / 100,
        c: +primary[1],
        h: +primary[2],
      };
      const splittedNeutral = {
        mode: "oklch",
        l: +neutralContent[0].split("%")[0] / 100,
        c: +neutralContent[1],
        h: +neutralContent[2],
      };
      const primaryHEX = formatHex(oklch(splittedPrimary));
      const neutralHEX = formatHex(oklch(splittedNeutral));

      return [primaryHEX, neutralHEX];
    };

    const [p, n] = getColors();
    setPrimaryColor(p);
    setNeutralColor(n);

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const [p, n] = getColors();
      setPrimaryColor(p);
      setNeutralColor(n);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Initialize particles engine with the loaded slim preset
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (init) {
    return (
      <Particles
        id="tsparticles2"
        options={{
          background: {
            transparent: true,
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: neutralColor,
            },
            links: {
              color: primaryColor,
              distance: 150,
              enable: true,
              opacity: 0.7,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 4,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 80,
            },
            opacity: {
              value: { min: 0.1, max: 0.7 },
            },
            shape: {
              type: ["star", "circle"],
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    );
  }

  return <></>;
};

export default ParticlesComponent2;
