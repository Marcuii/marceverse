/**
 * @file EducationActivities.jsx
 * @description Tabbed section displaying Education, Certification,
 * Activity, and Competition entries in a filterable carousel.
 *
 * Uses `framer-motion` AnimatePresence for smooth tab transitions
 * and links each card to its detail page.
 */

// eslint-disable-next-line no-unused-vars -- used as <motion.div>
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../../config/api";
import { FaGraduationCap, FaCertificate, FaRunning, FaTrophy } from "react-icons/fa";

export default function EducationActivities() {
  const [educationData, setEducationData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [certificationsData, setCertificationsData] = useState([]);
  const [competitionData, setCompetitionData] = useState([]);
  const [activeTab, setActiveTab] = useState("education");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [edu, act, cert, comp] = await Promise.all([
          fetch(`${API_BASE_URL}/education`).then(res => res.json()),
          fetch(`${API_BASE_URL}/activity`).then(res => res.json()),
          fetch(`${API_BASE_URL}/certification`).then(res => res.json()),
          fetch(`${API_BASE_URL}/competition`).then(res => res.json()),
        ]);
        setEducationData(edu);
        setActivitiesData(act);
        setCertificationsData(cert);
        setCompetitionData(comp);
      } catch (error) {
        console.error("Error fetching education/activities data:", error);
      }
    };
    fetchData();
  }, []);

  const tabs = [
    { id: "education", label: "Education", icon: FaGraduationCap, data: educationData, type: "education", orgField: "institution" },
    { id: "certification", label: "Certifications", icon: FaCertificate, data: certificationsData, type: "certification", orgField: "issuer" },
    { id: "activity", label: "Activities", icon: FaRunning, data: activitiesData, type: "activity", orgField: "organization" },
    { id: "competition", label: "Competitions", icon: FaTrophy, data: competitionData, type: "competition", orgField: "organizer" },
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <section id="education" className="w-full flex justify-center py-20">
      <div className="w-11/12 lg:w-9/12 rounded-2xl p-4 md:p-8 border-4 border-primary flex flex-col items-center bg-base-100/30 backdrop-blur relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 py-1 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
          Education & Activities
        </h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn btn-md md:btn-lg gap-2 rounded-xl transition-all duration-300 ${
                activeTab === tab.id 
                  ? "btn-primary shadow-lg shadow-primary/20 scale-105" 
                  : "btn-ghost hover:bg-primary/10"
              }`}
            >
              <tab.icon className={activeTab === tab.id ? "text-white" : "text-primary"} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-full min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {currentTab.data.length > 0 ? (
                currentTab.data.map((item, index) => (
                  <motion.div
                    key={item._id || index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-base-100 shadow-xl p-6 rounded-2xl border border-neutral w-full group hover:border-primary transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 text-sm font-medium text-secondary/80 italic">
                        <span>{item[currentTab.orgField]}</span>
                      </div>

                      <p className="text-xs text-secondary mt-2 font-mono tracking-wider opacity-70">
                        {item.period}
                      </p>

                      <p className="mt-4 text-base leading-relaxed line-clamp-3 text-base-content/80">
                        {item.shortDescription}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(`/${currentTab.type}/${item.id}`)}
                      className="btn btn-sm btn-outline btn-primary mt-6 rounded-lg w-fit group-hover:btn-active transition-all"
                    >
                      View Details
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-secondary/50">
                  <currentTab.icon size={48} className="mb-4 opacity-20" />
                  <p className="text-xl">No {currentTab.label.toLowerCase()} found.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
