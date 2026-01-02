"use client"

import { useEffect, useState } from "react"
import { FiArrowDownRight } from "react-icons/fi"

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    setIsLoaded(true)
    const currentTheme = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null
    if (currentTheme) {
      setTheme(currentTheme)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  // Sync theme when document attribute changes (from Navbar component)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null
      if (currentTheme && currentTheme !== theme) {
        setTheme(currentTheme)
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => observer.disconnect()
  }, [theme])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const techBadges = [
    { name: "React", icon: "R", color: "#FF6B5B" },
    { name: "Next.js", icon: "N", color: "#FF6B5B" },
    { name: "Python", icon: "Py", color: "#FF6B5B" },
    { name: "FastAPI", icon: "F", color: "#FF6B5B" },
    { name: "TensorFlow", icon: "TF", color: "#FF6B5B" },
    { name: "Docker", icon: "D", color: "#FF6B5B" },
    { name: "JavaScript", icon: "JS", color: "#FF6B5B" },
    { name: "Node.js", icon: "N", color: "#FF6B5B" },
    { name: "PostgreSQL", icon: "PG", color: "#FF6B5B" },
    { name: "MongoDB", icon: "M", color: "#FF6B5B" },
    { name: "Scikit-learn", icon: "SK", color: "#FF6B5B" },
    { name: "Git", icon: "G", color: "#FF6B5B" },
    { name: "AWS", icon: "AWS", color: "#FF6B5B" },
    { name: "TypeScript", icon: "TS", color: "#FF6B5B" },
  ]

  // We have 14 unique badges: React, Next.js, Python, FastAPI, TensorFlow, Docker,
  // JavaScript, Node.js, PostgreSQL, MongoDB, Scikit-learn, Git, AWS, TypeScript
  const totalBadges = techBadges.length // 14 badges
  
  // For seamless infinite scroll, duplicate badges multiple times
  // With 2 duplicates (28 badges), we animate by 50% to move exactly one set (14 badges)
  // This creates a perfect seamless loop
  const techBadgesRepeated = [
    ...techBadges,
    ...techBadges,
    ...techBadges,
    ...techBadges,
  ]

  return (
    <section
      id="home"
      className="relative flex items-start lg:items-center overflow-hidden bg-primary transition-colors duration-300 pt-24 sm:pt-28 md:pt-32 lg:pt-20 pb-8 sm:pb-10 md:pb-12 lg:pb-20"
    >
      <div className="container-custom w-full px-4 sm:px-5 md:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-[1.3fr_1fr] gap-6 sm:gap-8 md:gap-10 lg:gap-16 xl:gap-24 items-start lg:items-center py-4 sm:py-6 md:py-8 lg:py-0 lg:min-h-[80vh]">
          {/* Left Side - Text Content */}
          <div
            className={`w-full space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-8 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Role & Location */}
            <div className="transition-all duration-1000 delay-200">
              <p
                className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wider font-medium leading-tight"
                style={{
                  color: theme === "dark" ? "rgba(245, 245, 240, 0.6)" : "rgba(10, 10, 10, 0.6)",
                }}
              >
                AI/ML ENGINEER & DATA SCIENTIST / INDIA
              </p>
            </div>

            {/* Name with Outline Effect */}
            <div className="transition-all duration-1000 delay-300">
              <h1 className="relative w-full">
                <span
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-display font-bold leading-[0.95] sm:leading-[0.9] md:leading-none break-words"
                  style={{
                    color: theme === "dark" ? "#F5F5F0" : "#0A0A0A",
                  }}
                >
                  ANUJ
                </span>
                <span
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-display font-bold leading-[0.95] sm:leading-[0.9] md:leading-none break-words"
                  style={{
                    color: theme === "dark" ? "#F5F5F0" : "#0A0A0A",
                  }}
                >
                  AGRAWAL
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <div className="transition-all duration-1000 delay-400 pt-2 sm:pt-3">
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-xl"
                style={{
                  color: theme === "dark" ? "rgba(245, 245, 240, 0.7)" : "rgba(10, 10, 10, 0.7)",
                }}
              >
                Building intelligent systems that transform data into insights. From AI models to production-ready
                solutions.
              </p>
            </div>
          </div>

          {/* Right Side - Code Editor */}
          <div
            className={`w-full transition-all duration-1000 delay-300 lg:max-w-[480px] mt-4 sm:mt-6 md:mt-8 lg:mt-0 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="relative w-full">
              {/* Code Editor Window */}
              <div 
                className="rounded-lg sm:rounded-xl border shadow-2xl overflow-hidden transition-colors duration-300 w-full"
                style={{
                  backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
                  borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.15)",
                  boxShadow: theme === "dark" ? "0 20px 60px rgba(0, 0, 0, 0.5)" : "0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                }}
              >
                {/* Window Header */}
                <div 
                  className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border-b transition-colors duration-300"
                  style={{
                    backgroundColor: theme === "dark" ? "#252526" : "#F8F8F8",
                    borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <span 
                    className="text-[10px] sm:text-xs font-mono transition-colors duration-300 truncate mx-2" 
                    style={{ 
                      color: theme === "dark" ? "#FFFFFF" : "#24292E",
                      opacity: 0.9 
                    }}
                  >
                    engineer.py
                  </span>
                  <div className="w-6 sm:w-8 md:w-12 flex-shrink-0" />
                </div>

                {/* Code Content */}
                <div 
                  className="p-3 sm:p-4 md:p-5 lg:p-6 font-mono text-[11px] sm:text-xs md:text-sm leading-relaxed transition-colors duration-300 overflow-x-auto"
                  style={{
                    backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
                  }}
                >
                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                      <span 
                        className="select-none w-4 sm:w-5 md:w-6 transition-colors duration-300 flex-shrink-0"
                        style={{
                          color: theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        1
                      </span>
                      <span className="flex-1 min-w-0">
                        <span style={{ color: theme === "dark" ? "#569CD6" : "#0066CC" }}>const</span>{" "}
                        <span style={{ color: theme === "dark" ? "#4EC9B0" : "#098658" }}>engineer</span>
                        <span 
                          className="transition-colors duration-300"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#24292E",
                          }}
                        >
                          {" "}= {"{"}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                      <span 
                        className="select-none w-4 sm:w-5 md:w-6 transition-colors duration-300 flex-shrink-0"
                        style={{
                          color: theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        2
                      </span>
                      <span className="flex-1 min-w-0 break-words">
                        <span 
                          className="transition-colors duration-300"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#24292E",
                          }}
                        >
                          {" "}name:{" "}
                        </span>
                        <span style={{ color: theme === "dark" ? "#CE9178" : "#A31515" }}>"Anuj Agrawal"</span>
                        <span 
                          className="transition-colors duration-300"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#24292E",
                          }}
                        >
                          ,
                        </span>
                      </span>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                      <span 
                        className="select-none w-4 sm:w-5 md:w-6 transition-colors duration-300 flex-shrink-0"
                        style={{
                          color: theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        3
                      </span>
                      <span className="flex-1 min-w-0 break-words">
                        <span 
                          className="transition-colors duration-300"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#24292E",
                          }}
                        >
                          {" "}focus:{" "}
                        </span>
                        <span style={{ color: theme === "dark" ? "#CE9178" : "#A31515" }}>"AI/ML & Data Science"</span>
                        <span 
                          className="transition-colors duration-300"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#24292E",
                          }}
                        >
                          ,
                        </span>
                      </span>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                      <span 
                        className="select-none w-4 sm:w-5 md:w-6 transition-colors duration-300 flex-shrink-0"
                        style={{
                          color: theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        4
                      </span>
                      <span className="flex-1 min-w-0 break-words">
                        <span 
                          className="transition-colors duration-300"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#24292E",
                          }}
                        >
                          {" "}expertise:{" "}
                        </span>
                        <span 
                          className="transition-colors duration-300"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#24292E",
                          }}
                        >
                          [
                        </span>
                        <span style={{ color: theme === "dark" ? "#CE9178" : "#A31515" }}>"TensorFlow"</span>
                        <span 
                          className="transition-colors duration-300"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#24292E",
                          }}
                        >
                          ,{" "}
                        </span>
                        <span style={{ color: theme === "dark" ? "#CE9178" : "#A31515" }}>"FastAPI"</span>
                        <span 
                          className="transition-colors duration-300"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#24292E",
                          }}
                        >
                          ,{" "}
                        </span>
                        <span style={{ color: theme === "dark" ? "#CE9178" : "#A31515" }}>"AutoGen"</span>
                        <span 
                          className="transition-colors duration-300"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#24292E",
                          }}
                        >
                          ]
                        </span>
                      </span>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                      <span 
                        className="select-none w-4 sm:w-5 md:w-6 transition-colors duration-300 flex-shrink-0"
                        style={{
                          color: theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        5
                      </span>
                      <span className="flex-1 min-w-0">
                        <span 
                          className="transition-colors duration-300"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#24292E",
                          }}
                        >
                          {"}"};
                        </span>
                        <span
                          className={`inline-block w-1.5 sm:w-2 h-3 sm:h-4 ml-1 transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
                          style={{
                            backgroundColor: theme === "dark" ? "#FF0000" : "#FF6B5B",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technology Badges Carousel */}
              <div className="mt-4 sm:mt-5 md:mt-6 overflow-hidden relative py-2 sm:py-3 md:py-4">
                <div
                  className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-r z-20 pointer-events-none transition-colors duration-1000"
                  style={{
                    background: `linear-gradient(to right, ${theme === "dark" ? "#0A0A0A" : "#FFFFFF"} 0%, ${theme === "dark" ? "#0A0A0A" : "#FFFFFF"} 10%, transparent 100%)`,
                    top: "-8px",
                    bottom: "-8px",
                  }}
                />
                <div
                  className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-l z-20 pointer-events-none transition-colors duration-1000"
                  style={{
                    background: `linear-gradient(to left, ${theme === "dark" ? "#0A0A0A" : "#FFFFFF"} 0%, ${theme === "dark" ? "#0A0A0A" : "#FFFFFF"} 10%, transparent 100%)`,
                    top: "-8px",
                    bottom: "-8px",
                  }}
                />
                <div className="flex animate-tech-scroll gap-2 sm:gap-2.5 md:gap-3" style={{ width: 'max-content' }}>
                  {techBadgesRepeated.map((tech, index) => (
                    <div
                      key={`${tech.name}-${index}`}
                      className="flex-shrink-0 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full border flex items-center gap-1.5 sm:gap-2 hover:border-accent/50 transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: theme === "dark" ? "#1A1A1A" : "#FFFFFF",
                        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 107, 91, 0.5)",
                        boxShadow: theme === "dark" ? "0 2px 8px rgba(255, 107, 91, 0.2)" : "0 4px 12px rgba(255, 107, 91, 0.35), 0 0 0 1px rgba(255, 107, 91, 0.2)",
                      }}
                    >
                      <span 
                        className="text-[10px] sm:text-xs font-bold transition-colors duration-300"
                        style={{ 
                          color: theme === "dark" ? tech.color : "#FF6B5B",
                        }}
                      >
                        {tech.icon}
                      </span>
                      <span 
                        className="text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-300"
                        style={{
                          color: theme === "dark" ? "#FFFFFF" : "#24292E",
                        }}
                      >
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right - About Button */}
        <div
          className={`hidden md:flex absolute bottom-8 right-8 items-center gap-4 transition-all duration-1000 delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span
            className="text-xs md:text-sm uppercase tracking-wider"
            style={{
              color: theme === "dark" ? "rgba(245, 245, 240, 0.6)" : "rgba(10, 10, 10, 0.6)",
            }}
          >
            ABOUT ME
          </span>
          <button
            onClick={() => scrollToSection("about")}
            className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-accent/50"
            aria-label="About me"
          >
            <FiArrowDownRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Theme Toggle Button - Hidden on mobile (shown in Navbar), visible on desktop */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="hidden lg:flex fixed top-8 right-8 z-50 w-12 h-12 rounded-full border flex items-center justify-center hover:border-accent transition-all duration-300"
        style={{
          backgroundColor: theme === "dark" ? "#1A1A1A" : "#F5F5F5",
          borderColor: theme === "dark" ? "rgba(245, 245, 240, 0.1)" : "rgba(10, 10, 10, 0.1)",
          color: theme === "dark" ? "#F5F5F0" : "#0A0A0A",
        }}
        aria-label="Toggle theme"
      >
        <span className="text-xl">{theme === "dark" ? "☀️" : "🌙"}</span>
      </button>

      <style jsx>{`
        @keyframes tech-scroll {
          0% { 
            transform: translateX(0); 
          }
          100% { 
            transform: translateX(-50%); 
          }
        }
        .animate-tech-scroll {
          animation: tech-scroll 80s linear infinite;
          will-change: transform;
        }
        .animate-tech-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default Hero
