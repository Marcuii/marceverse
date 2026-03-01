/**
 * @file Hero.jsx
 * @description Full-width hero section with animated typewriter roles,
 * hero description, call-to-action buttons, and a profile image.
 *
 * All content is driven by the GeneralInfo context so changes
 * made in the admin panel are reflected instantly.
 */

import { Typewriter } from "react-simple-typewriter";
import { useGeneralInfo } from "../../context/GeneralInfoContext";

const Hero = () => {
  const { generalInfo, loading } = useGeneralInfo();

  if (loading || !generalInfo) {
      return <div className="h-screen w-full flex items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  }

  return (
    <section
      id="hero"
      className="w-full flex flex-col lg:flex-row justify-center items-center text-center md:text-left px-15"
    >
      <div className="z-10 bg-neutral/60 border-primary border-4 rounded-2xl p-10 mx-5 w-10/12 lg:w-5/12 h-[612px] sm:h-[440px] md:h-[484px] lg:h-[572px] xl:h-[484px] flex flex-col gap-4 justify-between items-center lg:items-start animate-floatreverse backdrop-blur">
        <p className=" max-w-xl text-2xl text-neutral-content font-bold mb-4 w-full text-start">
          Hello 👋, I'm
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-primary drop-shadow-lg">
          <Typewriter
            words={generalInfo.role}
            loop={50}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-secondary font-medium">
          {generalInfo.tagline}
        </p>

        <p className="mt-4 max-w-xl text-base md:text-lg text-neutral-content">
          {generalInfo.heroDescription}
        </p>

          <a
            href={generalInfo.cv.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-7 top-8 btn btn-primary rounded-full px-6"
          >
            📃 My CV
          </a>
      </div>

      <div className="z-10 w-full md:w-5/12 mt-10 lg:mt-0 flex justify-center lg:justify-end relative">
        <div className="w-60 sm:w-72 aspect-square md:w-80 lg:w-96 rounded-full overflow-hidden border-4 border-primary animate-float">
          <img
            src={generalInfo.heroImage}
            alt={generalInfo.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
