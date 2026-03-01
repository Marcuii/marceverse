/**
 * @file ExperiencePage.jsx
 * @description Full-detail page for a single entity entry.
 *
 * Reused by all 5 entity types (experience, education, certification,
 * activity, competition).  The entity type is inferred from the URL
 * pathname and the string `id` param fetches the specific document.
 *
 * Renders long descriptions, skill chips, and a lightbox-enabled
 * image gallery.
 */

import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars -- used as <motion.div>, <motion.img>
import { motion } from "framer-motion";
import { useParams, useLocation } from "react-router";
import { FaX } from "react-icons/fa6";
import { API_BASE_URL } from "../config/api";

export default function ExperienceDetail() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);

  // Determine the type based on the URL path
  const path = location.pathname.split("/")[1]; // experience, education, activity, etc.

  useEffect(() => {
    fetch(`${API_BASE_URL}/${path}/${id}`)
      .then((response) => {
        if (!response.ok) {
           throw new Error(`${path} not found`);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((err) => console.error(`Error fetching ${path} details:`, err));
  }, [id, path]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-neutral">Loading...</p>
      </div>
    );
  }

  // Helper to get the organization/company name based on type
  const getOrganization = () => {
      if (data.company) return data.company;
      if (data.institution) return data.institution;
      if (data.organization) return data.organization;
      if (data.issuer) return data.issuer;
      if (data.organizer) return data.organizer;
      return "";
  };

  return (
    <div className="bg-base-100/30 rounded-xl backdrop-blur flex items-center justify-center mx-5 mb-5 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl rounded-2xl shadow-2xl bg-neutral border border-primary/30 p-10"
      >
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-primary">{data.title}</h1>
          <p className="text-lg text-secondary mt-2">{getOrganization()}</p>
          <p className="text-sm text-accent mt-1">
            {data.period} {data.type && `• ${data.type}`}
          </p>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-primary mb-2">
            Description
          </h1>
          {data.details.longDescription.map((paragraph, index) => (
            <p key={index} className="text-accent mt-1 leading-relaxed">
              {paragraph === "" ? <br /> : paragraph}
            </p>
          ))}
        </div>

        {data.details.skills && (
          <div className="mb-8">
            <h2 className="text-xl text-primary font-semibold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {data.details.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-content shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.details.images && data.details.images.length > 0 && (
          <div>
            <h2 className="text-xl text-primary font-semibold mb-3">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.details.images.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  loading="lazy"
                  alt="experience"
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl cursor-pointer shadow-lg border border-secondary/40"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute max-w-4xl w-full p-4"
          >
            <img
              src={selectedImage}
              alt="popup"
              loading="lazy"
              className="rounded-2xl shadow-2xl border border-secondary/40"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-7 right-3 p-2 rounded-full bg-error text-error-content shadow-lg hover:bg-error/80 transition"
            >
              <FaX size={22} />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
