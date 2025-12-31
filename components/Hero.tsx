"use client"

import { useEffect, useState } from "react"
import { FiArrowDownRight } from "react-icons/fi"

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    setIsLoaded(true)
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setTheme(prefersDark ? "dark" : "light")
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
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
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const techBadges = [
    { name: "React", icon: "R", color: "#FF6B5B" },
    { name: "Next.js", icon: "N", color: "#FF6B5B" },
    { name: "Python", icon: "Py", color: "#FF6B5B" },
    { name: "FastAPI", icon: "F", color: "#FF6B5B" },
    { name: "TensorFlow", icon: "TF", color: "#FF6B5B" },
    { name: "Docker", icon: "D", color: "#FF6B5B" },
  ]

  const techBadgesRepeated = [...techBadges, ...techBadges, ...techBadges, ...techBadges]

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-primary transition-colors duration-300 pt-20 lg:pt-0"
    >
      <div className="container-custom w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          {/* Left Side - Text Content */}
          <div
            className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Role & Location */}
            <div className="transition-all duration-1000 delay-200">
              <p
                className="text-xs md:text-sm uppercase tracking-wider font-medium"
                style={{
                  color: theme === "dark" ? "rgba(245, 245, 240, 0.6)" : "rgba(10, 10, 10, 0.6)",
                }}
              >
                AI/ML ENGINEER & DATA SCIENTIST / INDIA
              </p>
            </div>

            {/* Name with Outline Effect */}
            <div className="transition-all duration-1000 delay-300">
              <h1 className="relative inline-block">
                <span
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold leading-none"
                  style={{
                    color: theme === "dark" ? "#F5F5F0" : "#0A0A0A",
                  }}
                >
                  ANUJ
                </span>
                <br />
                <span
                  className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold leading-none inline-block"
                  style={{
                    WebkitTextStroke: theme === "dark" ? "2px rgba(245, 245, 240, 0.15)" : "2px rgba(10, 10, 10, 0.15)",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AGRAWAL
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <div className="transition-all duration-1000 delay-400 pt-2">
              <p
                className="text-base md:text-lg lg:text-xl leading-relaxed max-w-xl"
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
            className={`transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="relative">
              {/* Code Editor Window */}
              <div className="bg-[#1E1E1E] rounded-lg border border-white/10 shadow-2xl overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className="text-xs text-white font-mono" style={{ opacity: 0.9 }}>
                    engineer.py
                  </span>
                  <div className="w-12" />
                </div>

                {/* Code Content */}
                <div className="p-6 font-mono text-sm leading-relaxed bg-[#1E1E1E]">
                  <div className="space-y-1">
                    <div className="flex items-start gap-4">
                      <span className="text-white/30 select-none w-6">1</span>
                      <span className="flex-1">
                        <span style={{ color: "#569CD6" }}>const</span>{" "}
                        <span style={{ color: "#4EC9B0" }}>engineer</span>
                        <span className="text-white"> = </span>
                        <span className="text-white">{"{"}</span>
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="text-white/30 select-none w-6">2</span>
                      <span className="flex-1">
                        <span className="text-white"> name: </span>
                        <span style={{ color: "#CE9178" }}>"Anuj Agrawal"</span>
                        <span className="text-white">,</span>
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="text-white/30 select-none w-6">3</span>
                      <span className="flex-1">
                        <span className="text-white"> focus: </span>
                        <span style={{ color: "#CE9178" }}>"AI/ML & Data Science"</span>
                        <span className="text-white">,</span>
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="text-white/30 select-none w-6">4</span>
                      <span className="flex-1">
                        <span className="text-white"> expertise: </span>
                        <span className="text-white">[</span>
                        <span style={{ color: "#CE9178" }}>"TensorFlow"</span>
                        <span className="text-white">, </span>
                        <span style={{ color: "#CE9178" }}>"FastAPI"</span>
                        <span className="text-white">, </span>
                        <span style={{ color: "#CE9178" }}>"AutoGen"</span>
                        <span className="text-white">]</span>
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="text-white/30 select-none w-6">5</span>
                      <span className="flex-1">
                        <span className="text-white">{"}"}</span>
                        <span className="text-white">;</span>
                        <span
                          className={`inline-block w-2 h-4 ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}
                          style={{
                            backgroundColor: "#FF0000",
                            transition: "opacity 0.1s",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technology Badges Carousel */}
              <div className="mt-6 overflow-hidden relative">
                <div
                  className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r to-transparent z-10 pointer-events-none"
                  style={{
                    background: `linear-gradient(to right, ${theme === "dark" ? "#0A0A0A" : "#FFFFFF"}, transparent)`,
                  }}
                />
                <div
                  className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l to-transparent z-10 pointer-events-none"
                  style={{
                    background: `linear-gradient(to left, ${theme === "dark" ? "#0A0A0A" : "#FFFFFF"}, transparent)`,
                  }}
                />
                <div className="flex animate-tech-scroll gap-3">
                  {techBadgesRepeated.map((tech, index) => (
                    <div
                      key={`${tech.name}-${index}`}
                      className="flex-shrink-0 px-4 py-2 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center gap-2 hover:border-accent/50 transition-all duration-300"
                    >
                      <span className="text-xs font-bold" style={{ color: tech.color }}>
                        {tech.icon}
                      </span>
                      <span className="text-sm text-white font-medium whitespace-nowrap">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right - About Button */}
        <div
          className={`absolute bottom-8 right-8 flex items-center gap-4 transition-all duration-1000 delay-700 ${
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

      {/* Theme Toggle Button */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-8 right-8 z-50 w-12 h-12 rounded-full border flex items-center justify-center hover:border-accent transition-all duration-300"
        style={{
          backgroundColor: theme === "dark" ? "#1A1A1A" : "#F5F5F5",
          borderColor: theme === "dark" ? "rgba(245, 245, 240, 0.1)" : "rgba(10, 10, 10, 0.1)",
          color: theme === "dark" ? "#F5F5F0" : "#0A0A0A",
        }}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <style jsx>{`
        @keyframes tech-scroll {
          0% { 
            transform: translateX(0); 
          }
          100% { 
            transform: translateX(-25%); 
          }
        }
        .animate-tech-scroll {
          animation: tech-scroll 15s linear infinite;
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
