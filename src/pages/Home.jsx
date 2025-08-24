import Hero from './../components/Home/Hero';
import About from '../components/Home/About';
import ProjectsSection from '../components/Home/Projects';
import ExperienceSection from '../components/Home/ExperienceSection';
import EducationActivities from '../components/Home/EducationActivities';
import Contact from '../components/Home/Contact';

export default function Home() {
  return (
    <div className='w-full z-0 mt-10 flex flex-col items-center justify-center'>
      <Hero />
      <About />
      <ProjectsSection />
      <ExperienceSection />
      <EducationActivities />
      <Contact />
    </div>
    
  );
}
