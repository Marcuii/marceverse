/**
 * @file Dashboard.jsx
 * @description Overview page showing aggregate counts across all entity types.
 *
 * Fetches counts for Projects, Experience, Education, Certification,
 * Activity, and Competition in parallel and renders them as DaisyUI stat cards.
 */

import { useEffect, useState } from 'react';
import {
    getProjects,
    getExperiences,
    getEducations,
    getCertifications,
    getActivities,
    getCompetitions,
} from '../services/api';

const Dashboard = () => {
    const [projectCount, setProjectCount] = useState(0);
    const [experienceCount, setExperienceCount] = useState(0);
    const [educationCount, setEducationCount] = useState(0);
    const [certificationCount, setCertificationCount] = useState(0);
    const [activityCount, setActivityCount] = useState(0);
    const [competitionCount, setCompetitionCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    projects, 
                    experiences, 
                    educations, 
                    certifications, 
                    activities, 
                    competitions
                ] = await Promise.all([
                    getProjects(),
                    getExperiences(),
                    getEducations(),
                    getCertifications(),
                    getActivities(),
                    getCompetitions()
                ]);

                setProjectCount(projects.data.length);
                setExperienceCount(experiences.data.length);
                setEducationCount(educations.data.length);
                setCertificationCount(certifications.data.length);
                setActivityCount(activities.data.length);
                setCompetitionCount(competitions.data.length);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="stats shadow bg-primary text-primary-content">
                    <div className="stat">
                        <div className="stat-title text-primary-content opacity-80">Projects</div>
                        <div className="stat-value">{projectCount}</div>
                        <div className="stat-desc text-primary-content opacity-60">Portfolio Works</div>
                    </div>
                </div>

                <div className="stats shadow bg-secondary text-secondary-content">
                    <div className="stat">
                        <div className="stat-title text-secondary-content opacity-80">Experiences</div>
                        <div className="stat-value">{experienceCount}</div>
                        <div className="stat-desc text-secondary-content opacity-60">Professional Roles</div>
                    </div>
                </div>

                <div className="stats shadow bg-accent text-accent-content">
                    <div className="stat">
                        <div className="stat-title text-accent-content opacity-80">Education</div>
                        <div className="stat-value">{educationCount}</div>
                        <div className="stat-desc text-accent-content opacity-60">Academic Journey</div>
                    </div>
                </div>

                <div className="stats shadow bg-info text-info-content">
                    <div className="stat">
                        <div className="stat-title text-info-content opacity-80">Certifications</div>
                        <div className="stat-value">{certificationCount}</div>
                        <div className="stat-desc text-info-content opacity-60">Achieved</div>
                    </div>
                </div>

                <div className="stats shadow bg-success text-success-content">
                    <div className="stat">
                        <div className="stat-title text-success-content opacity-80">Activities</div>
                        <div className="stat-value">{activityCount}</div>
                        <div className="stat-desc text-success-content opacity-60">Extracurricular</div>
                    </div>
                </div>

                <div className="stats shadow bg-warning text-warning-content">
                    <div className="stat">
                        <div className="stat-title text-warning-content opacity-80">Competitions</div>
                        <div className="stat-value">{competitionCount}</div>
                        <div className="stat-desc text-warning-content opacity-60">Awards & Honors</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
