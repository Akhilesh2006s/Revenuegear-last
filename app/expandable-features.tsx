"use client"

import type React from "react"
import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle, Wrench, Briefcase, BarChart3, Frown, AlertTriangle, Search, Globe, X } from "lucide-react"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

// Hook for detecting clicks outside component
function useOutsideClick(ref: React.RefObject<HTMLDivElement>, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, callback])
}

const CloseIcon = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.05 } }}>
      <X className="h-4 w-4 text-black" />
    </motion.div>
  )
}

interface Capability {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
  ctaText: string
  ctaLink: string
}

const capabilities: Capability[] = [
  {
    icon: CheckCircle,
    title: "21 points checklist",
    description: "Every call goes through a 21-point checklist uncovering both service and sales insights.",
    ctaText: "View More",
    ctaLink: "#",
  },
  {
    icon: Wrench,
    title: "Service Insights",
    description:
      "Identify at-risk customers, repeat complaints, poor service quality, and unresolved issues. Get a daily hotlist to prevent churn and improve NPS score.",
    ctaText: "View More",
    ctaLink: "#",
  },
  {
    icon: Briefcase,
    title: "Sales Intelligence",
    description:
      "Understand customer budget, urgency to buy, test drive feedback, comparisons with competitors—So your team is focusing on the right leads.",
    ctaText: "View More",
    ctaLink: "#",
  },
  {
    icon: BarChart3,
    title: "Voice of Customer Dashboard",
    description:
      "Track positive and negative feedback, top complaint categories, sentiment trends, and team performance—all in one powerful view.",
    ctaText: "View More",
    ctaLink: "#",
  },
  {
    icon: Frown,
    title: "Customer Sentiment Score in Each Call",
    description: "Automatically detect tone and emotion to score every customer call.",
    ctaText: "View More",
    ctaLink: "#",
  },
  {
    icon: AlertTriangle,
    title: "Automatic Revenue Leak Classification",
    description: "AI Agent tags every call where focus is needed— 0% manual effort needed.",
    ctaText: "View More",
    ctaLink: "#",
  },
  {
    icon: Search,
    title: "100% Visibility & Analysis ",
    description: "Every single call is analyzed—outbound, inbound, Maintenance Reminders, PSFU—nothing is missed.",
    ctaText: "View More",
    ctaLink: "#",
  },
  {
    icon: Globe,
    title: "Indian & International Languages",
    description: "English, Hindi, Tamil, Marathi, Malayalam, Kannada, Telugu and beyond.",
    ctaText: "View More",
    ctaLink: "#",
  },
]

export default function ExpandableFeatures() {
  const [active, setActive] = useState<Capability | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null)
      }
    }

    if (active) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  return (
    <section id="capabilities" className="py-20 bg-transparent">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ${poppins.className}`}>
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Capabilities
            </span>
          </h2>
        </motion.div>

        {/* Overlay */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-50"
            />
          )}
        </AnimatePresence>

        {/* Expanded Card Modal */}
        <AnimatePresence>
          {active ? (
            <div className="fixed inset-0 grid place-items-center z-[100]">
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-1 right-4 items-center justify-center bg-white rounded-full h-8 w-8 z-[110] shadow-lg hover:bg-gray-50 transition-colors"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white sm:rounded-3xl overflow-hidden shadow-2xl mx-4"
              >
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      layoutId={`icon-${active.title}-${id}`}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                    >
                      <active.icon size={24} className="text-orange-500" />
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3 layoutId={`title-${active.title}-${id}`} className="font-bold text-white text-xl">
                        {active.title}
                      </motion.h3>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-600 text-base leading-relaxed"
                  >
                    {active.description}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        {/* Capability Cards List */}
        <div className="max-w-2xl mx-auto">
          {capabilities.map((capability, index) => (
            <motion.div
              layoutId={`card-${capability.title}-${id}`}
              key={`card-${capability.title}-${id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActive(capability)}
              className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent hover:border-orange-200 mb-4 group"
            >
              <div className="flex gap-4 flex-col md:flex-row flex-1">
                <motion.div
                  layoutId={`icon-${capability.title}-${id}`}
                  className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 flex-shrink-0"
                >
                  <capability.icon size={24} className="text-white" />
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    layoutId={`title-${capability.title}-${id}`}
                    className={`font-bold text-gray-900 text-lg mb-10 items-center justify-center group-hover:text-orange-700 transition-colors ${poppins.className}`}
                  >
                    {capability.title}
                  </motion.h3>
                </div>
              </div>
              <motion.button
                layoutId={`button-${capability.title}-${id}`}
                className="px-6 py-1 text-sm rounded-full font-bold bg-gray-100 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white text-gray-700 mt-2 md:mt-0 transition-all duration-200 flex-shrink-0"
                onClick={() => setActive(capability)}
              >
                {capability.ctaText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
