"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
      <motion.h1
        className="text-5xl font-extrabold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {user && user.displayName ? (
          <>
            Welcome back, <span className="text-blue-600">{user.displayName}</span>!
          </>
        ) : (
          <>
            Welcome to <span className="text-blue-600">AI Blog Platform</span>
          </>
        )}
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 max-w-lg mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Generate AI-powered blog content in seconds and share your ideas with
        the world.
      </motion.p>

      {!user && (
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/login"
            className="px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 text-lg font-semibold bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Register
          </Link>
        </motion.div>
      )}

      {/* Features Section */}
      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {[
          {
            title: "AI-Powered Writing",
            description: "Generate blog content with AI assistance.",
            icon: "📝",
          },
          {
            title: "Instant Publishing",
            description: "Publish blogs instantly to a global audience.",
            icon: "🚀",
          },
          {
            title: "Engage & Grow",
            description: "Interact with readers and build your audience.",
            icon: "📈",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-5xl">{feature.icon}</div>
            <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
