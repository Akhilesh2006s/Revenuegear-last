"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Poppins } from "next/font/google"
import { ContactModal } from "./contact-modal"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export function Navigation() {
  const [contactModalOpen, setContactModalOpen] = useState(false)

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center px-4 py-2"
        style={{ backgroundColor: "white" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Contact Us Button - Right Aligned */}
        <motion.button
          onClick={() => setContactModalOpen(true)}
          className="text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-medium tracking-wide shadow-md text-xs md:text-sm transition-all text-left"
          style={{
            background: `linear-gradient(to right, #F9A01B, #F97316)`,
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 6px 12px rgba(249, 160, 27, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex flex-col items-start justify-start">
            <span>Hear Every Customer.</span>
            <span>Fix What Matters. Now!</span>
          </span>
        </motion.button>
      </motion.nav>

      {/* Contact Modal */}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  )
}
