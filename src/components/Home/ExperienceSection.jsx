import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ExperienceSection = () => {
  const [experiencesData, setExperiencesData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/eeadata.json")
      .then((res) => res.json())
      .then((data) =>
        setExperiencesData(data.filter((exp) => exp.tag === "Experience"))
      );
  }, []);

  return (
    <section
      id="experience"
      className="w-full px-8 md:px-16 lg:px-24 py-12 bg-neutral flex flex-col items-center overflow-hidden"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 flex items-center justify-center gap-2">
        Experiences
      </h2>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-primary md:block hidden"></div>

        <div className="space-y-12">
          {experiencesData.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`relative flex items-center w-full ${
                index % 2 === 0
                  ? "justify-start md:pr-[55%]"
                  : "justify-end md:pl-[55%]"
              }`}
            >
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-base-100 z-10 md:block hidden"></div>

              <div className="bg-base-100 shadow-lg p-6 rounded-2xl border border-neutral w-full relative hover:shadow-2xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-primary">{exp.title}</h3>

                <div className="flex items-center gap-2 mt-2 text-sm text-accent">
                  <span className="font-medium">{exp.company}</span>
                  <span className="text-accent">•</span>
                  <span className="italic">{exp.type}</span>
                </div>

                <p className="text-xs text-secondary mt-1 tracking-wide">
                  {exp.period}
                </p>

                <p className="mt-3 text-base leading-relaxed">
                  {exp.shortDescription}
                </p>

                <button
                  onClick={() => navigate(`/experience/${exp.id}`)}
                  className="btn btn-sm btn-primary mt-4 rounded-lg px-5"
                >
                  Show More
                </button>

                <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
