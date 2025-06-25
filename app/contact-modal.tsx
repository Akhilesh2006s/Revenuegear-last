"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  dealership?: string
  address: string
  phone?: string
  message?: string
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    dealership: "",
    address: "",
    phone: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    const subject = `Demo Request from ${formData.name}`
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Dealership: ${formData.dealership || "Not provided"}
Address: ${formData.address}
Phone: ${formData.phone || "Not provided"}
Message: ${formData.message || "No message provided"}

This request was submitted via the RevenueGear contact form.
`.replace(/^\s+/gm, "")

    const encodedSubject = encodeURIComponent(subject)
    const encodedBody = encodeURIComponent(body)

    window.location.href = `mailto:anand@clickto.tech?subject=${encodedSubject}&body=${encodedBody}`

    toast({
      title: "Email Client Opened",
      description: "Please review and send the pre-filled email to contact us.",
    })

    // Reset form and close modal
    setFormData({
      name: "",
      email: "",
      dealership: "",
      address: "",
      phone: "",
      message: "",
    })
    onClose()
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 rounded-3xl shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Form Content */}
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-gray-300">Join leading dealerships already protecting millions in revenue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="Enter your full name"
                    />
                  </motion.div>
                </div>

                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number "
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label htmlFor="dealership" className="block text-sm font-medium text-gray-300 mb-2">
                    Dealership Name
                  </label>
                  <input
                    type="text"
                    id="dealership"
                    name="dealership"
                    value={formData.dealership}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your dealership name "
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your needs"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(245, 158, 11, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  SEND
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
