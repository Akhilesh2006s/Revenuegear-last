"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Poppins } from "next/font/google"
import { ContactModal } from "./contact-modal"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-1 sm:py-2"
        style={{ backgroundColor: "white" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Logo */}
        <motion.img
          src="321.png"
          alt="Revenue Gear Logo"
          className="w-[100px] sm:w-[120px] h-auto object-contain"
          initial={{ y: 0 }}
          animate={{ y: -2 }}
          whileHover={{
            scale: 1.05,
            y: -8,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-3">
          {[
            { href: "#hero", label: "Home" },
            { href: "#brands", label: "Trusted By" },
            { href: "#contributions", label: "Our Contributions" },
            { href: "#capabilities", label: "Capabilities" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-700 hover:text-amber-600 font-medium transition duration-200"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {item.label}
            </a>
          ))}

          <a
            href="https://revlabs.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-amber-600 font-medium transition duration-200"
          >
            Our Company
          </a>

          <Link
            href="/comic-book-reader"
            className="text-gray-700 hover:text-amber-600 font-medium relative group"
          >
            <span className="relative">
              Is It For Me?
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 hover:text-amber-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={() => setContactModalOpen(true)}
          className="text-white px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full font-medium text-[10px] sm:text-xs md:text-sm tracking-wide shadow-md transition-all text-center"
          style={{
            background: `linear-gradient(to right, #F9A01B, #F97316)`,
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 6px 12px rgba(249, 160, 27, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="leading-tight">
            <span>Hear Every Customer.</span>
            <span>Fix What Matters. Now!</span>
          </span>
        </motion.button>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 md:hidden"
          >
            <div className="flex flex-col space-y-3 p-3">
              {[
                { href: "#hero", label: "Home" },
                { href: "#brands", label: "Trusted By" },
                { href: "#contributions", label: "Our Contributions" },
                { href: "#capabilities", label: "Capabilities" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-amber-600 font-medium transition duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileMenuOpen(false)
                    document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://revlabs.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-amber-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Company
              </a>
              <Link
                href="/comic-book-reader"
                className="text-gray-700 hover:text-amber-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Is It For Me?
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  )
}
