/**
 * Centralised configuration for the 5 generic entity types.
 *
 * Every entity shares the same schema shape:
 *   id · title · {secondaryField} · type · period · shortDescription · details
 *
 * The config drives both the list-page table and the create/edit form so that
 * we only maintain ONE list component and ONE form component.
 */

import {
  getExperiences, getExperienceById, createExperience, updateExperience, deleteExperience,
  getEducations, getEducationById, createEducation, updateEducation, deleteEducation,
  getCertifications, getCertificationById, createCertification, updateCertification, deleteCertification,
  getActivities, getActivityById, createActivity, updateActivity, deleteActivity,
  getCompetitions, getCompetitionById, createCompetition, updateCompetition, deleteCompetition,
} from '../services/api';

/** @type {Record<string, EntityConfig>} */
const entityConfig = {
  experience: {
    /* ---- naming ---- */
    slug: 'experience',
    singular: 'Experience',
    plural: 'Experience',

    /* ---- secondary field ---- */
    secondaryField: {
      key: 'company',
      label: 'Company / Organization',
      columnHeader: 'Company',
      placeholder: 'e.g. Google',
    },

    /* ---- form hints ---- */
    idPrefix: 'job',
    titleLabel: 'Title',
    titlePlaceholder: 'e.g. Software Engineer',
    typeHint: 'Remote, On-site, etc.',
    periodLabel: 'Period',
    periodPlaceholder: 'e.g. Jan 2023 - Present',
    skillsPlaceholder: 'React, Node.js, etc.',

    /* ---- API ---- */
    api: {
      getAll: getExperiences,
      getById: getExperienceById,
      create: createExperience,
      update: updateExperience,
      delete: deleteExperience,
    },
  },

  education: {
    slug: 'education',
    singular: 'Education',
    plural: 'Education',

    secondaryField: {
      key: 'institution',
      label: 'Institution',
      columnHeader: 'Institution',
      placeholder: 'e.g. MIT',
    },

    idPrefix: 'edu',
    titleLabel: 'Degree / Title',
    titlePlaceholder: 'e.g. B.Sc. Computer Science',
    typeHint: 'Bachelor, Master, PhD, etc.',
    periodLabel: 'Period',
    periodPlaceholder: 'e.g. 2020 - 2024',
    skillsPlaceholder: 'Machine Learning, Data Science, etc.',

    api: {
      getAll: getEducations,
      getById: getEducationById,
      create: createEducation,
      update: updateEducation,
      delete: deleteEducation,
    },
  },

  certification: {
    slug: 'certification',
    singular: 'Certification',
    plural: 'Certification',

    secondaryField: {
      key: 'issuer',
      label: 'Issuer',
      columnHeader: 'Issuer',
      placeholder: 'e.g. Amazon Web Services',
    },

    idPrefix: 'cert',
    titleLabel: 'Certification Title',
    titlePlaceholder: 'e.g. AWS Certified Solutions Architect',
    typeHint: 'Professional, Associate, etc.',
    periodLabel: 'Period / Issue Date',
    periodPlaceholder: 'e.g. Issued: Jan 2024',
    skillsPlaceholder: 'Cloud Computing, Security, etc.',

    api: {
      getAll: getCertifications,
      getById: getCertificationById,
      create: createCertification,
      update: updateCertification,
      delete: deleteCertification,
    },
  },

  activity: {
    slug: 'activity',
    singular: 'Activity',
    plural: 'Activity',

    secondaryField: {
      key: 'organization',
      label: 'Organization',
      columnHeader: 'Organization',
      placeholder: 'e.g. University Club',
    },

    idPrefix: 'act',
    titleLabel: 'Activity Title',
    titlePlaceholder: 'e.g. Club Founder',
    typeHint: 'Volunteer, Club, etc.',
    periodLabel: 'Period',
    periodPlaceholder: 'e.g. 2022 - 2023',
    skillsPlaceholder: 'Leadership, Event Planning, etc.',

    api: {
      getAll: getActivities,
      getById: getActivityById,
      create: createActivity,
      update: updateActivity,
      delete: deleteActivity,
    },
  },

  competition: {
    slug: 'competition',
    singular: 'Competition',
    plural: 'Competition',

    secondaryField: {
      key: 'organizer',
      label: 'Organizer',
      columnHeader: 'Organizer',
      placeholder: 'e.g. Tech Org',
    },

    idPrefix: 'comp',
    titleLabel: 'Competition Title',
    titlePlaceholder: 'e.g. Hackathon Winner',
    typeHint: 'National, Global, etc.',
    periodLabel: 'Period / Date',
    periodPlaceholder: 'e.g. Oct 2024',
    skillsPlaceholder: 'Problem Solving, Coding, etc.',

    api: {
      getAll: getCompetitions,
      getById: getCompetitionById,
      create: createCompetition,
      update: updateCompetition,
      delete: deleteCompetition,
    },
  },
};

export default entityConfig;
