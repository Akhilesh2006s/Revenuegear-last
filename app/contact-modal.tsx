"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Phone, Mail, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setSuccess(false)

    const formData = new FormData(event.target as HTMLFormElement)
    formData.append("access_key", "4cc29184-bcfe-422c-8212-16b5ff4d4fbc")

    const object = Object.fromEntries(formData)
    const json = JSON.stringify(object)

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json())

      if (res.success) {
        setSuccess(true)
        event.currentTarget.reset()
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
        })
        onClose()
      }
    } catch (error) {
      console.error("Error submitting form", error)
      toast({
        title: "Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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
                <h2 className="text-3xl font-bold text-white mb-4">Request a Demo</h2>
                <p className="text-gray-300">
                  Join leading dealerships already protecting millions in revenue
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Enter your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Enter your Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    id="agree"
                    name="agree"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-amber-500 bg-white/10 border-white/20 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="agree" className="ml-2 block text-sm text-gray-300">
                    I agree to the Privacy Policy.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit"}
                  {!loading && (
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </button>

                {success && (
                  <div className="text-green-300 text-center p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ContactForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setSuccess(false)

    const formData = new FormData(event.target as HTMLFormElement)
    formData.append("access_key", "4cc29184-bcfe-422c-8212-16b5ff4d4fbc")

    const object = Object.fromEntries(formData)
    const json = JSON.stringify(object)

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json())

      if (res.success) {
        setSuccess(true)
        event.currentTarget.reset()
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
        })
      }
    } catch (error) {
      console.error("Error submitting form", error)
      toast({
        title: "Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white relative overflow-hidden min-h-screen">
        {/* Background dots */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23fbbf24' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Start Catching Revenue Leak Signals <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Before They Cost You
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join leading dealerships already protecting millions in revenue
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Request a Demo</h3>
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Enter your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Enter your Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    id="agree"
                    name="agree"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-amber-500 bg-white/10 border-white/20 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="agree" className="ml-2 block text-sm text-gray-300">
                    I agree to the Privacy Policy.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit"}
                  {!loading && (
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </button>

                {success && (
                  <div className="text-green-300 text-center p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
              </form>
            </div>

            {/* Right Column - Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
                <p className="text-gray-300 text-lg mb-8">
                  Ready to transform your customer service and protect your revenue? Our team is here to help you get
                  started.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <div className="text-orange-200">+91 9632213191</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email Us</div>
                    <div className="text-orange-200">anand@revlabs.tech</div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-transparent border-2 border-amber-500 text-amber-500 rounded-xl font-medium hover:bg-amber-500/10 transition-colors duration-300"
                  >
                    Open Contact Modal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border-t border-white/10 mt-20 py-8 text-center">
          <h1 className="font-bold text-lg mb-2">Based in Bengaluru | Built with ❤️ at RevLabs | © RevLabs 2025</h1>
        </div>
      </section>
    </>
  )
}
