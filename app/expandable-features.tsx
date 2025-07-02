"use client"

import type React from "react"
import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle, Wrench, Briefcase, BarChart3, Frown, AlertTriangle, Search, Globe } from "lucide-react"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

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
    title: "100% Visibility & Analysis",
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
    <section id="capabilities" className="py-12 md:py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-10 md:mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 ${poppins.className}`}>
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Capabilities
            </span>
          </h2>
        </motion.div>

        {/* Overlay with Blur */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm h-full w-full z-50"
            />
          )}
        </AnimatePresence>

        {/* Expanded Modal - Mobile Optimized */}
        <AnimatePresence>
          {active && (
            <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <motion.div
                      layoutId={`icon-${active.title}-${id}`}
                      className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center"
                    >
                      <active.icon size={20} className="text-white" />
                    </motion.div>
                    <motion.h3 layoutId={`title-${active.title}-${id}`} className="font-bold text-lg md:text-xl text-gray-800">
                      {active.title}
                    </motion.h3>
                  </div>
                  <motion.button
                    layout
                    onClick={() => setActive(null)}
                    className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 shadow-md"
                  >
                    <span className="text-xl font-bold text-gray-800">×</span>
                  </motion.button>
                </div>

                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-600 text-sm md:text-base leading-relaxed"
                >
                  {active.description}
                </motion.div>

               
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Cards Grid - Mobile Optimized */}
        <div className="max-w-2xl mx-auto">
          {capabilities.map((capability, index) => (
            <motion.div
              layoutId={`card-${capability.title}-${id}`}
              key={`card-${capability.title}-${id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActive(capability)}
              className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-300 border border-transparent hover:border-orange-200 mb-3 md:mb-4 group"
            >
              <div className="flex gap-3 md:gap-4 flex-col md:flex-row flex-1">
                <motion.div
                  layoutId={`icon-${capability.title}-${id}`}
                  className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 flex-shrink-0"
                >
                  <capability.icon size={20} className="text-white" />
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    layoutId={`title-${capability.title}-${id}`}
                    className={`font-bold text-gray-900 text-base md:text-lg group-hover:text-orange-700 transition-colors ${poppins.className}`}
                  >
                    {capability.title}
                  </motion.h3>
                </div>
              </div>
              <motion.button
                layoutId={`button-${capability.title}-${id}`}
                className="px-4 py-1 text-xs md:text-sm rounded-full font-bold bg-gray-100 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white text-gray-700 mt-2 md:mt-0 transition-all duration-200 flex-shrink-0"
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
