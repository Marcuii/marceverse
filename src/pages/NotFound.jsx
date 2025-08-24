import { motion } from "framer-motion";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center text-base-content p-6">
      <motion.div
        className="text-center max-w-lg bg-base-200 p-10 rounded-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Animated 404 */}
        <motion.h1
          className="text-8xl font-extrabold text-primary"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          404
        </motion.h1>

        {/* Message */}
        <p className="mt-4 text-xl text-secondary">
          You’ve stepped into a broken timeline 🌀
        </p>
        <p className="text-accent mt-1">
          The page you’re searching for doesn’t exist in this universe.
        </p>

        {/* Button */}
        <div className="mt-8">
          <Link
            to="/"
            className="px-6 py-3 rounded-2xl font-semibold md:text-lg shadow-lg 
                       bg-primary text-primary-content 
                       hover:bg-secondary hover:text-secondary-content 
                       transition-all duration-300"
          >
            🌌 Universe
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
