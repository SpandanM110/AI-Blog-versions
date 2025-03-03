"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            AI Blog
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {user && (
              <Link href="/posts" className="text-gray-700 hover:text-gray-900">
                Posts
              </Link>
            )}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Generate
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-red-500 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg p-4 space-y-4 absolute w-full left-0 top-16 z-40"
        >
          {user && (
            <Link href="/posts" className="block text-gray-700 hover:text-gray-900">
              Posts
            </Link>
          )}
          {user ? (
            <>
              <Link href="/dashboard" className="block text-gray-700 hover:text-gray-900">
                Generate 
              </Link>
              <button
                onClick={() => signOut()}
                className="block text-gray-700 hover:text-red-500 w-full text-left"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link
                href="/register"
                className="block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-center"
              >
                Register
              </Link>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
}
