import { motion } from "framer-motion";
import { i } from "framer-motion/client";
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaGithub, FaJava } from "react-icons/fa";
import { FcLinux } from "react-icons/fc";
import { RiNextjsFill } from "react-icons/ri";
import { SiMongodb, SiExpress, SiTailwindcss, SiCplusplus, SiAdobephotoshop, SiAdobeaftereffects, SiBootstrap, SiArduino, SiNestjs, SiRedux } from "react-icons/si";

const skills = [
  {
    name : "Frontend",
    skills: [
    { name: "React", level: 90, icon: <FaReact className="text-blue-400" /> },
    { name: "JavaScript", level: 95, icon: <FaJs className="text-yellow-400" /> },
    { name: "TailwindCSS", level: 93, icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: "Bootstrap", level: 88, icon: <SiBootstrap className="text-purple-500" /> },
    { name: "CSS", level: 97, icon: <FaCss3Alt className="text-blue-500" /> },
    { name: "HTML", level: 100, icon: <FaHtml5 className="text-orange-500" /> },
    { name: "Redux", level: 50, icon: <SiRedux className="text-purple-500" /> },
    { name: "Next.js", level: 5, icon: <RiNextjsFill className="text-gray-300" /> },
  ]},
  {
    name: "Backend",
    skills: [
      { name: "Express.js", level: 75, icon: <SiExpress className="text-gray-300" /> },
      { name: "Node.js", level: 80, icon: <FaNodeJs className="text-green-500" /> },
      { name: "MongoDB", level: 70, icon: <SiMongodb className="text-green-400" /> },
      { name: "Nest.js", level: 3, icon: <SiNestjs className="text-red-500" /> },
  ]},
  {
    name: "Programming",
    skills: [
      { name: "C++", level: 85, icon: <SiCplusplus className="text-blue-600" /> },
      { name: "Java", level: 75, icon: <FaJava className="text-[#037590]" /> },
      { name: "Python", level: 90, icon: <FaPython className="text-yellow-300" /> },
    ]},
  {
    name: "Others",
    skills: [
      { name: "Git", level: 90, icon: <FaGitAlt className="text-red-500" /> },
      { name: "GitHub", level: 95, icon: <FaGithub className="text-gray-300" /> },
      { name: "Docker", level: 30, icon: <FaDocker className="text-blue-400" /> },
      { name: "Linux", level: 70, icon: <FcLinux className="text-[#007582]" /> },
      { name: "Photoshop", level: 95, icon: <SiAdobephotoshop className="text-blue-400" /> },
      { name: "After Effects", level: 80, icon: <SiAdobeaftereffects className="text-purple-500" /> },
      { name: "Arduino", level: 70, icon: <SiArduino className="text-[#007582]" /> },
  ]},
];

const SkillBar = ({ skill }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="mb-6"
  >
    <div className="flex items-center gap-3 mb-2">
      <span className="text-2xl">{skill.icon}</span>
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
            src="/aboutsec.png"
            alt="About Marcelino"
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
            MERN Stack Developer | Creative Coder
          </h3>
          <p className="text-neutral-content text-lg leading-relaxed mb-6">
            I’m Marcelino Saad, a passionate web developer who loves building
            modern, fast, and interactive applications using the MERN stack.
            Beyond coding, I enjoy exploring design, motion graphics, and
            immersive experiences in the multiverse of creativity.
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
          {skills.map((cat, i) => (
            <div key={i}>
              <h4 className="text-xl font-semibold text-accent mb-6 text-center">{cat.name}</h4>
              {cat.skills.map((skill, i) => (
                <SkillBar key={i} skill={skill} />
              ))}
            </div>
          ))}
          
        </div>
      </motion.div>
    </section>
  );
};

export default About;
