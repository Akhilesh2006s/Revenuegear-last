"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Phone, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  name: string
  email: string
  dealership?: string
  address: string
  phone?: string
  message?: string
}

export default function ContactForm() {
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
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section
      id="brain"
      className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white relative overflow-hidden min-h-screen"
    >
      {/* Background dots */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23fbbf24' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <motion.div
        className="container mx-auto px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h2 className="text-4xl lg:text-6xl font-bold mb-6" variants={itemVariants}>
            Start Catching Revenue Leak Signals <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Before They Cost You
            </span>
          </motion.h2>
          <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto" variants={itemVariants}>
            Join leading dealerships already protecting millions in revenue
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">Request a Demo</h3>
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
                  placeholder="Tell us about your specific needs or questions "
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
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
              <p className="text-gray-300 text-lg mb-8">
                Ready to transform your customer service and protect your revenue? Our team is here to help you get
                started.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div className="flex items-center gap-4" whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold">Call Us</div>
                  <div className="text-gray-300">+91 9632213191</div>
                </div>
              </motion.div>

              <motion.div className="flex items-center gap-4" whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold">Email Us</div>
                  <div className="text-gray-300">anand@revlabs.tech</div>
                </div>
              </motion.div>
            </div>

            {/* CTA Button */}
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}

      <motion.div
        className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border-t border-white/10 mt-20 py-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <h1 className="font-bold text-lg mb-2">Based in Bengaluru | Built with ❤️ at RevLabs | © RevLabs 2025</h1>
      </motion.div>
    </section>
  )
}
