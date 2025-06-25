"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, PerspectiveCamera } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import type { Group } from "three"
import { Poppins, Inter } from "next/font/google"
import { Brain, Users, TrendingUp, Shield, Clock, FileText, BarChart3 } from "lucide-react"
import { Navigation } from "./Navbar"
import ExpandableFeatures from "./expandable-features"
import { ContactModal } from "./contact-modal"


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

interface Brand {
  logo: string
}

const brands: Brand[] = [
  {
    logo: "brand1.png",
  },
  {
    logo: "brand-2.png",
  },
  {
    logo: "brand-3.png",
  },
  {
    logo: "brand4.png",
  },
  {
    logo: "brand-4.png",
  },
  {
    logo: "brand-6.png",
  },
  {
    logo: "brand7.png",
  },
  {
    logo: "brand-8.png",
  },
  {
    logo: "brand-9.png",
  },
  {
    logo: "brand-10.png",
  },
]

interface RotatingModelProps {
  scrollY: number
}

function RotatingModel({ scrollY }: RotatingModelProps) {
  const modelRef = useRef<Group>(null)
  const { scene } = useGLTF("20.glb")

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = scrollY * 0.005
      modelRef.current.rotation.x = Math.sin(scrollY * 0.003) * 0.1
    }
  })

  return (
    <group ref={modelRef} scale={[1, 1, 1]} position={[0, -1.8, 0]}>
      <primitive object={scene} />
    </group>
  )
}

interface SceneProps {
  scrollY: number
}

function Scene({ scrollY }: SceneProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, -0.3, 6]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.6} />
      <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />
      <RotatingModel scrollY={scrollY} />
      <Environment preset="city" />

      {/* Warm transparent overlay */}
      <mesh position={[0, -0.44, 4.9]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#FEF3C7" transparent={true} opacity={0.7} />
      </mesh>
    </>
  )
}

function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div className="flex-shrink-0 mx-6 group cursor-pointer">
      <div className="relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
        <img
          src={brand.logo || "/placeholder.svg?height=128&width=128"}
          alt="Brand Logo"
          className="w-32 h-32 object-contain transition-all duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  )
}

// Our Contributions Component
const OurContributions: React.FC = () => {
  const contributions = [
    {
      icon: Users,
      title: "Daily Customer Hotlist",
      description: "Know who to save or convert.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      title: "Upto 25% Customer Retention",
      description: "Save at-risk customers with timely action.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: BarChart3,
      title: "40% More Insights",
      description: "Compared to manual data analysis.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Shield,
      title: "100% Customer Voice Visibility",
      description: "Analyze every call, every sentiment.",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: Clock,
      title: "Faster Issue Resolution",
      description: "Spot service gaps. Fix fast.",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: FileText,
      title: "Simple English Reports",
      description: "Just ask for reports in simple English.",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
  ]

  return (
    <section id="contributions" className="py-1 bg-transparent">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ${poppins.className}`}>
            Our Contributions To{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Your Business
            </span>
          </h2>
        </motion.div>

        {/* Contributions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contributions.map((contribution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer text-center"
              whileHover={{
                boxShadow: "0 20px 40px rgba(249, 160, 27, 0.3)",
                y: -8,
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div
                className={`w-16 h-16 ${contribution.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
              >
                <contribution.icon size={32} className={contribution.color} />
              </div>

              <h3
                className={`text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors mb-4 ${poppins.className}`}
              >
                {contribution.title}
              </h3>

              <p className={`text-gray-600 leading-relaxed ${poppins.className}`}>{contribution.description}</p>

              <div className="mt-6 flex items-center justify-center text-amber-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function RevenueGearLanding() {
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()
  const [scrollDirection, setScrollDirection] = useState("up")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [contactModalOpen, setContactModalOpen] = useState(false)


  // Model opacity and scale - keep fixed size and position
  const modelOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  const [audioStarted, setAudioStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Audio handling - more aggressive autoplay detection
  useEffect(() => {
    let hasTriedAutoplay = false

    const tryPlayAudio = async () => {
      if (!audioRef.current || audioStarted) return

      try {
        audioRef.current.volume = 0.5
        await audioRef.current.play()
        setAudioStarted(true)
        console.log("Audio started successfully")
        return true
      } catch (error) {
        console.log("Audio play attempt failed:", error)
        return false
      }
    }

    // Try to play immediately on component mount
    const attemptAutoplay = async () => {
      if (hasTriedAutoplay) return
      hasTriedAutoplay = true

      const success = await tryPlayAudio()
      if (success) {
        // Remove all listeners if successful
        document.removeEventListener("click", handleInteraction)
        document.removeEventListener("scroll", handleInteraction)
        document.removeEventListener("touchstart", handleInteraction)
        document.removeEventListener("keydown", handleInteraction)
        document.removeEventListener("mousemove", handleInteraction)
        window.removeEventListener("focus", handleInteraction)
      }
    }

    const handleInteraction = async () => {
      const success = await tryPlayAudio()
      if (success) {
        // Remove all listeners after successful start
        document.removeEventListener("click", handleInteraction)
        document.removeEventListener("scroll", handleInteraction)
        document.removeEventListener("touchstart", handleInteraction)
        document.removeEventListener("keydown", handleInteraction)
        document.removeEventListener("mousemove", handleInteraction)
        window.removeEventListener("focus", handleInteraction)
      }
    }

    // Try autoplay first
    attemptAutoplay()

    // Add multiple event listeners for user interaction
    document.addEventListener("click", handleInteraction, { passive: true })
    document.addEventListener("scroll", handleInteraction, { passive: true })
    document.addEventListener("touchstart", handleInteraction, { passive: true })
    document.addEventListener("keydown", handleInteraction, { passive: true })
    document.addEventListener("mousemove", handleInteraction, { passive: true })
    window.addEventListener("focus", handleInteraction, { passive: true })

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("scroll", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
      document.removeEventListener("mousemove", handleInteraction)
      window.removeEventListener("focus", handleInteraction)
    }
  }, [audioStarted])

  // Additional audio setup and retry mechanism
  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    // Set up audio properties
    audio.preload = "auto"
    audio.volume = 0.5

    // Try to load the audio
    const handleCanPlay = () => {
      console.log("Audio can play")
    }

    const handleLoadedData = () => {
      console.log("Audio loaded")
    }

    const handleError = (e: Event) => {
      console.log("Audio error:", e)
    }

    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("loadeddata", handleLoadedData)
    audio.addEventListener("error", handleError)

    // Force load
    audio.load()

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("loadeddata", handleLoadedData)
      audio.removeEventListener("error", handleError)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }

      setLastScrollY(currentScrollY)
      setScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div className={`relative min-h-screen ${poppins.className}`} style={{ backgroundColor: "#F0F0E6" }}>
      {/* Audio Element - plays once until it ends */}
      <audio ref={audioRef} preload="auto" style={{ display: "none" }}>
        <source src="1000.mp4" type="audio/mp4" />
        <source src="1000.mpeg" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Navigation Component */}
      <Navigation />

      {/* 3D Model Section */}
      <motion.div
        className="fixed inset-0 w-full h-full"
        style={{
          opacity: modelOpacity,
        }}
      >
        <Canvas className="w-full h-full">
          <Scene scrollY={scrollY} />
        </Canvas>
      </motion.div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            {/* Main Headline - Centered */}
            <div className="text-center mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-4xl font-bold text-gray-900 mb-10 leading-tight max-w-5xl mx-auto"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                  Your customers never forget a bad experience.
                </span>
                <br />
                <span className="text-gray-900">95% of car dealership calls go unreviewed —</span>
                <br></br>
                <span className="text-gray-900">That's when customers leave and revenue leaks.</span>
              </motion.h1>
            </div>

            {/* Content Grid - Two columns below headline */}
            <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
              {/* Left Content - Descriptive Text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                className="text-4xl lg:text-xl font text-gray-900 mb-10 leading-tight max-w-5xl mx-auto"
                >
                  <span className="text-orange-500 font-bold">RevenueGear's</span> <span                 className="text-xl lg:text-xl font-bold text-gray-900 mb-10 leading-tight max-w-5xl mx-auto"
>AI Agent reviews{" "}</span> 
                  <span className="text-orange-500 font-bold">100%</span> of your calls to extract insights of customers with churn risks, poor service feedback, repeat issues, and sales & buying signals—across Indian & global languages.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                className="text-4xl lg:text-xl font text-gray-900 mb-10 leading-tight max-w-5xl mx-auto"
                >
                  Get a <span className="text-orange-500 font-bold">HOTLIST</span> of customers to save and leads to convert.
                </motion.p>
<div className="flex justify-center items-center w-full mt-4">
  <motion.button
    onClick={() =>
      window.open(
        "https://calendly.com/anand-clickto/get-your-at-risk-customers-list?month=2025-06",
        "_blank"
      )
    }
    className="text-white px-6 py-4 md:px-6 md:py-3 rounded-full font-medium tracking-wide shadow-md text-xs md:text-sm transition-all"
    style={{
      background: `linear-gradient(to right, #F9A01B, #F97316)`,
    }}
    whileHover={{
      scale: 1.05,
      boxShadow: "0 6px 12px rgba(249, 160, 27, 0.4)",
    }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="flex flex-col items-center justify-center">
      <span>Get Your HOTLIST</span>
    </span>
  </motion.button>
</div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200"
                ></motion.div>
              </motion.div>

              {/* Right Content - Call Analysis Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="space-y-6">
                    {/* Waveform Animation - Smoother version */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Brain size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 mb-2">Call Analysis</div>
                        <div className="flex items-center gap-1">
                          {[...Array(15)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-gradient-to-t from-amber-500 to-orange-500 rounded-full"
                              style={{ height: `${Math.random() * 20 + 15}px` }}
                              animate={{
                                height: [
                                  `${Math.random() * 10 + 5}px`,
                                  `${Math.random() * 15 + 5}px`,
                                  `${Math.random() * 10 + 5}px`,
                                ],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.15,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Insights */}
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-red-700 font-medium">High churn risk detected</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-amber-700 font-medium">Customer frustration: High</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 }}
                        className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-700 font-medium">Can Save Customer: Yes</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trusted Brands Section */}
        <div id="brands" className="relative z-10 py-2">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-8 ${poppins.className}`}>
              Trusted by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Dealers{" "}
              </span>
              <span className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-8 ${poppins.className}`}>of</span>
            </h2>
          </div>

          {/* Single Line Brand Animation */}
          <div className="relative space-y-8 py-8">
            <div className="relative overflow-hidden">
              {/* Gradient Fade Effects */}
              <div className="absolute left-0 top-0 w-32 h-full bg-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-32 h-full bg-transparent z-10"></div>

              <div className="flex animate-scroll-left">
                {[...brands, ...brands, ...brands].map((brand, index) => (
                  <BrandLogo key={`brand-${index}`} brand={brand} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Our Contributions Section */}
        <OurContributions />

        {/* Expandable Features Section */}
        <ExpandableFeatures />
      </div>

      {/* Custom CSS for horizontal animations */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }
        
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
