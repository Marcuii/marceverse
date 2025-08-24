import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function EducationActivities() {
  const [educationData, setEducationData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/eeadata.json")
      .then((res) => res.json())
      .then((data) =>
        setEducationData(data.filter((item) => item.tag === "Education"))
      );

    fetch("/data/eeadata.json")
      .then((res) => res.json())
      .then((data) =>
        setActivitiesData(data.filter((item) => item.tag === "Activity"))
      );
  }, []);

  return (
    <section id="education" className="w-full flex justify-center py-20">
      <div className="w-11/12 lg:w-9/12 rounded-2xl p-8 border-4 border-primary flex flex-col items-center bg-base-100/30 backdrop-blur relative">
        <h2 className="text-3xl font-bold mb-10 py-1 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
          Education & Activities
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-base-100/30 border border-neutral rounded-2xl shadow-lg p-6 space-y-7"
          >
            <h3 className="text-2xl text-secondary font-semibold mb-4">
              Education
            </h3>
            {educationData.map((exp, index) => (
              <div
                key={index}
                className="bg-base-100 shadow-lg p-6 rounded-2xl border border-neutral w-full relative hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-primary">{exp.title}</h3>

                <div className="flex items-center gap-2 mt-2 text-sm text-accent">
                  <span className="font-medium">{exp.company}</span>
                </div>

                <p className="text-xs text-secondary mt-1 tracking-wide">
                  {exp.period}
                </p>

                <p className="mt-3 text-base leading-relaxed">
                  {exp.shortDescription}
                </p>

                <button
                  onClick={() => navigate(`/education/${exp.id}`)}
                  className="btn btn-sm btn-primary mt-4 rounded-lg px-5"
                >
                  Show More
                </button>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-base-100/50 border border-neutral rounded-2xl shadow-lg p-6 space-y-7"
          >
            <h3 className="text-2xl text-secondary font-semibold mb-4">
              Extracurricular Activities
            </h3>
            {activitiesData.map((exp, index) => (
              <div
                key={index}
                className="bg-base-100 shadow-lg p-6 rounded-2xl border border-neutral w-full relative hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-primary">{exp.title}</h3>

                <div className="flex items-center gap-2 mt-2 text-sm text-accent">
                  <span className="font-medium">{exp.company}</span>
                </div>

                <p className="text-xs text-secondary mt-1 tracking-wide">
                  {exp.period}
                </p>

                <p className="mt-3 text-base leading-relaxed">
                  {exp.shortDescription}
                </p>

                <button
                  onClick={() => navigate(`/activity/${exp.id}`)}
                  className="btn btn-sm btn-primary mt-4 rounded-lg px-5"
                >
                  Show More
                </button>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
