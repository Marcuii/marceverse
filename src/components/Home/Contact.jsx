"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoLogoVercel } from "react-icons/io5";
import { FaSquareUpwork } from "react-icons/fa6";
import { TbBrandFiverr } from "react-icons/tb";
import { PiNumberSquareFiveFill } from "react-icons/pi";
import { RiRecordCircleFill } from "react-icons/ri";

export default function Footer() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); // { type: "success"|"error", message: "" }

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_Service_ID,
        import.meta.env.VITE_EMAILJS_Template_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_Public_Key
      )
      .then(
        () => {
          setNotification({
            type: "success",
            message: "✅ Message sent successfully!",
          });
          form.current.reset();
        },
        () => {
          setNotification({
            type: "error",
            message: "❌ Failed to send message. Try again!",
          });
        }
      )
      .finally(() => {
        setLoading(false);
        setTimeout(() => setNotification(null), 4000); // auto-hide after 4s
      });
  };

  return (
    <section
      id="contact"
      className="w-full px-8 md:px-16 lg:px-24 py-12 bg-neutral flex flex-col items-center overflow-hidden relative"
    >
      {/* Notification Popover */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h3 className="text-xl font-semibold text-neutral-content mb-4">📬 Get in Touch</h3>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg border border-neutral/30 bg-base-100"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg border border-neutral/30 bg-base-100"
            />
            <input
              type="text"
              name="title"
              placeholder="Subject"
              required
              className="w-full p-3 rounded-lg border border-neutral/30 bg-base-100"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows="4"
              className="w-full p-3 rounded-lg border border-neutral/30 bg-base-100"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition flex items-center justify-center"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-start space-y-4">
          <h3 className="text-xl font-semibold text-neutral-content mb-4">🌐 Connect with Me</h3>
          <div className="flex flex-wrap gap-4 text-4xl">
            <a
              href="https://github.com/marcuii"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 text-neutral-content transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://vercel.com/marcelino-saads-projects"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 text-neutral-content transition"
            >
              <IoLogoVercel />
            </a>
            <a
              href="https://linkedin.com/in/marcelino-saad"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 text-neutral-content transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01f2cfd17ef2f545e5?viewMode=1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 text-neutral-content transition"
            >
              <FaSquareUpwork />
            </a>
            <a
             href="https://www.fiverr.com/maroemad"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 text-neutral-content transition"
            >
              <TbBrandFiverr />
            </a>
            <a
              href="https://khamsat.com/user/marcelino"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 text-neutral-content transition"
            >
              <PiNumberSquareFiveFill />
            </a>
            <a
              href="https://mostaql.com/u/Marcelino_E"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 text-neutral-content transition"
            >
              <RiRecordCircleFill />
            </a>
            <a
              href="mailto:marcelino.saad@proton.me"
              className="hover:scale-110 text-neutral-content transition"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://wa.me/+201271653735"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 text-neutral-content transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://facebook.com/marcelino.e.saad"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 text-neutral-content transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com/marcelino.e.saad"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 text-neutral-content transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="text-center text-sm text-neutral-content mt-12">
        © {new Date().getFullYear()} Marcelino Saad. All rights reserved.
      </div>
    </section>
  );
}
