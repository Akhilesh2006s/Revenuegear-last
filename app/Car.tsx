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
  isMobile: boolean
}

function RotatingModel({ scrollY, isMobile }: RotatingModelProps) {
  const modelRef = useRef<Group>(null)
  const { scene } = useGLTF("20.glb")

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = scrollY * 0.005
      modelRef.current.rotation.x = Math.sin(scrollY * 0.003) * 0.1
    }
  })

  return (
    <group 
      ref={modelRef} 
      scale={isMobile ? [0.8, 0.8, 0.8] : [1, 1, 1]} 
      position={isMobile ? [0, -1.5, 0] : [0, -1.8, 0]}
    >
      <primitive object={scene} />
    </group>
  )
}

interface SceneProps {
  scrollY: number
  isMobile: boolean
}

function Scene({ scrollY, isMobile }: SceneProps) {
  return (
    <>
      <PerspectiveCamera 
        makeDefault 
        position={isMobile ? [0, -0.3, 7] : [0, -0.3, 6]} 
        fov={isMobile ? 45 : 50}
      />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.6} />
      <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />
      <RotatingModel scrollY={scrollY} isMobile={isMobile} />
      <Environment preset="city" />

      {/* Warm transparent overlay */}
      <mesh position={isMobile ? [0, -0.44, 5.9] : [0, -0.44, 4.9]}>
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
          className="w-24 h-24 md:w-32 md:h-32 object-contain transition-all duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  )
}

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
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ${poppins.className}`}>
            Our Contributions To{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Your Business
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {contributions.map((contribution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white p-6 md:p-8 rounded-xl md:rounded-2xl border border-gray-100 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 cursor-pointer text-center"
              whileHover={{
                boxShadow: "0 20px 40px rgba(249, 160, 27, 0.3)",
                y: -8,
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div
                className={`w-14 h-14 md:w-16 md:h-16 ${contribution.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
              >
                <contribution.icon size={28} className={contribution.color} />
              </div>

              <h3
                className={`text-lg md:text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors mb-3 md:mb-4 ${poppins.className}`}
              >
                {contribution.title}
              </h3>

              <p className={`text-sm md:text-base text-gray-600 leading-relaxed ${poppins.className}`}>
                {contribution.description}
              </p>
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const modelOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  const [audioStarted, setAudioStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    let hasTriedAutoplay = false

    const tryPlayAudio = async () => {
      if (!audioRef.current || audioStarted) return

      try {
        audioRef.current.volume = 0.5
        await audioRef.current.play()
        setAudioStarted(true)
        return true
      } catch (error) {
        return false
      }
    }

    const attemptAutoplay = async () => {
      if (hasTriedAutoplay) return
      hasTriedAutoplay = true
      await tryPlayAudio()
    }

    const handleInteraction = async () => {
      await tryPlayAudio()
    }

    attemptAutoplay()

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

  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current
    audio.preload = "auto"
    audio.volume = 0.5
    audio.load()

    return () => {
      audio.pause()
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
      <audio ref={audioRef} preload="auto" style={{ display: "none" }}>
        <source src="1000.mp4" type="audio/mp4" />
        <source src="1000.mpeg" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Navigation />

      <motion.div
        className="fixed inset-0 w-full h-full"
        style={{
          opacity: modelOpacity,
        }}
      >
        <Canvas className="w-full h-full">
          <Scene scrollY={scrollY} isMobile={isMobile} />
        </Canvas>
      </motion.div>

      <div className="relative z-10">
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-10 leading-tight max-w-4xl mx-auto"
>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
    Your customers never forget a bad experience.
  </span>
  <br />
  <span className="text-gray-900">95% of car dealership calls go unreviewed —</span>
  <br />
  <span className="text-gray-900">That's when customers leave and revenue leaks.</span>
</motion.h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start max-w-7xl mx-auto">
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
                  className="text-lg sm:text-xl md:text-2xl text-gray-900 leading-relaxed"
                >
                  <span className="text-orange-500 font-bold">RevenueGear's</span>{' '}
                  <span className="font-bold">AI Agent reviews </span>
                  <span className="text-orange-500 font-bold">100%</span> of your calls to extract insights of customers with churn risks, poor service feedback, repeat issues, and sales & buying signals—across Indian & global languages.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg sm:text-xl md:text-2xl text-gray-900 leading-relaxed"
                >
                  Get a <span className="text-orange-500 font-bold">HOTLIST</span> of customers to save and leads to convert.
                </motion.p>

                <div className="flex justify-center md:justify-start items-center w-full mt-6 md:mt-4">
                  <motion.button
                    onClick={() =>
                      window.open(
                        "https://calendly.com/anand-clickto/get-your-at-risk-customers-list?month=2025-06",
                        "_blank"
                      )
                    }
                    className="text-white px-6 py-3 md:px-6 md:py-3 rounded-full font-medium tracking-wide shadow-md text-sm md:text-sm transition-all"
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative"
              >
                <div className="relative bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg md:shadow-xl border border-gray-100">
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Brain size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm md:text-base font-medium text-gray-900 mb-1 md:mb-2">Call Analysis</div>
                        <div className="flex items-center gap-1">
                          {[...Array(15)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-gradient-to-t from-amber-500 to-orange-500 rounded-full"
                              style={{ height: `${Math.random() * 10 + 10}px` }}
                              animate={{
                                height: [
                                  `${Math.random() * 8 + 5}px`,
                                  `${Math.random() * 12 + 5}px`,
                                  `${Math.random() * 8 + 5}px`,
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

                    <div className="space-y-2 md:space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        className="flex items-center gap-2 p-2 md:p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs md:text-sm text-red-700 font-medium">High churn risk detected</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        className="flex items-center gap-2 p-2 md:p-3 bg-amber-50 border border-amber-200 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        <span className="text-xs md:text-sm text-amber-700 font-medium">Customer frustration: High</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 }}
                        className="flex items-center gap-2 p-2 md:p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs md:text-sm text-green-700 font-medium">Can Save Customer: Yes</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div id="brands" className="relative z-10 py-2">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8 ${poppins.className}`}>
              Trusted by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Dealers{" "}
              </span>
              <span className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 ${poppins.className}`}>of</span>
            </h2>
          </div>

          <div className="relative space-y-6 md:space-y-8 py-6 md:py-8">
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-left">
                {[...brands, ...brands, ...brands].map((brand, index) => (
                  <BrandLogo key={`brand-${index}`} brand={brand} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <OurContributions />
        <ExpandableFeatures />
      </div>

      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
        
        @media (max-width: 768px) {
          .animate-scroll-left {
            animation-duration: 15s;
          }
        }
      `}</style>
    </div>
  )
}
