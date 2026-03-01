/**
 * @file About.jsx
 * @description "About Me" section with profile image, bio text, and
 * animated skill-bar groups fetched from GeneralInfo context.
 *
 * Uses `framer-motion` for staggered reveal animations and a dynamic
 * `iconMap` to render skill icons by name from the database.
 */

// eslint-disable-next-line no-unused-vars -- used as <motion.div>
import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaGithub, FaJava } from "react-icons/fa";
import { FcLinux } from "react-icons/fc";
import { RiNextjsFill } from "react-icons/ri";
import { SiMongodb, SiExpress, SiTailwindcss, SiCplusplus, SiAdobephotoshop, SiAdobeaftereffects, SiBootstrap, SiArduino, SiNestjs, SiRedux } from "react-icons/si";
import { useGeneralInfo } from "../../context/GeneralInfoContext";

/** Maps icon name strings stored in MongoDB → rendered React icon components. */
const iconMap = {
  FaReact: <FaReact className="text-blue-400" />,
  FaJs: <FaJs className="text-yellow-400" />,
  SiTailwindcss: <SiTailwindcss className="text-cyan-400" />,
  SiBootstrap: <SiBootstrap className="text-purple-500" />,
  FaCss3Alt: <FaCss3Alt className="text-blue-500" />,
  FaHtml5: <FaHtml5 className="text-orange-500" />,
  SiRedux: <SiRedux className="text-purple-500" />,
  RiNextjsFill: <RiNextjsFill className="text-gray-300" />,
  SiExpress: <SiExpress className="text-gray-300" />,
  FaNodeJs: <FaNodeJs className="text-green-500" />,
  SiMongodb: <SiMongodb className="text-green-400" />,
  SiNestjs: <SiNestjs className="text-red-500" />,
  SiCplusplus: <SiCplusplus className="text-blue-600" />,
  FaJava: <FaJava className="text-[#037590]" />,
  FaPython: <FaPython className="text-yellow-300" />,
  FaGitAlt: <FaGitAlt className="text-red-500" />,
  FaGithub: <FaGithub className="text-gray-300" />,
  FaDocker: <FaDocker className="text-blue-400" />,
  FcLinux: <FcLinux className="text-[#007582]" />,
  SiAdobephotoshop: <SiAdobephotoshop className="text-blue-400" />,
  SiAdobeaftereffects: <SiAdobeaftereffects className="text-purple-500" />,
  SiArduino: <SiArduino className="text-[#007582]" />,
};

const SkillBar = ({ skill }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="mb-6"
  >
    <div className="flex items-center gap-3 mb-2">
      <span className="text-2xl">{iconMap[skill.icon] || <span className="text-gray-400">?</span>}</span>
      <p className="font-semibold text-neutral-content">{skill.name}</p>
    </div>
    <div className="w-full bg-neutral-content/20 rounded-full h-3 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="h-3 rounded-full bg-gradient-to-r from-accent to-secondary"
      />
    </div>
    <p className="text-sm text-neutral-content mt-1">{skill.level}%</p>
  </motion.div>
);

const About = () => {
  const { generalInfo, loading } = useGeneralInfo();

  if (loading || !generalInfo) return null;

  return (
    <section
      id="about"
      className="w-full mt-16 px-8 md:px-16 lg:px-24 py-12 bg-neutral flex flex-col items-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-secondary flex items-center justify-center gap-2">
          About Me
        </h2>
        <p className="mt-4 text-lg text-neutral-content max-w-2xl">
          A quick look into who I am, what I do, and the multiverse of skills I
          explore.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-52 sm:w-64 md:w-72 lg:w-80 rounded-2xl overflow-hidden border-4 border-secondary shadow-lg"
        >
          <img
            src={generalInfo.about.image}
            alt={`About ${generalInfo.name}`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center lg:text-left"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-accent mb-4">
            {generalInfo.about.title}
          </h3>
          <p className="text-neutral-content text-lg leading-relaxed mb-6">
            {generalInfo.about.description}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-16 w-full"
      >
        <h3 className="text-3xl font-bold text-secondary text-center mb-10">
          Skills
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {generalInfo.skills.map((cat, i) => (
            <div key={i}>
              <h4 className="text-xl font-semibold text-accent mb-6 text-center">{cat.category}</h4>
              {cat.items.map((skill, j) => (
                <SkillBar key={j} skill={skill} />
              ))}
            </div>
          ))}
          
        </div>
      </motion.div>
    </section>
  );
};

export default About;
