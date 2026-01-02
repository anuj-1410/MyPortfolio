"use client"

import { useState, useEffect, useRef } from "react"
import { FiArrowDownRight } from "react-icons/fi"
import Image from "next/image"

interface SkillCategory {
  category: string
  description: string
  skills: Array<{
    name: string
    icon: string
    logo?: string
  }>
}

const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    description: "Core programming languages for building robust applications and systems",
    skills: [
      { name: "C++", icon: "⚙️", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Python", icon: "🐍", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", icon: "☕", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "JavaScript", icon: "⚡", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    ],
  },
  {
    category: "Frontend & Frameworks",
    description: "Modern UI frameworks and technologies for creating responsive interfaces",
    skills: [
      { name: "React Js", icon: "⚛️", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next Js", icon: "▲", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "HTML/CSS", icon: "🏗️", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "Streamlit", icon: "📊", logo: "https://streamlit.io/images/brand/streamlit-mark-color.svg" },
    ],
  },
  {
    category: "Backend & Databases",
    description: "Server-side technologies and database solutions for scalable applications",
    skills: [
      { name: "FastAPI", icon: "🚀", logo: "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" },
      { name: "Flask", icon: "🧪", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "SQL", icon: "🗄️", logo: "https://www.svgrepo.com/show/331760/sql-database-generic.svg" },
      { name: "Solidity", icon: "⛓️", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
    ],
  },
  {
    category: "AI/ML & Data Science",
    description: "Advanced machine learning and data analysis tools for intelligent systems",
    skills: [
      { name: "TensorFlow", icon: "🤖", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "Keras", icon: "🧠", logo: "https://keras.io/img/logo.png" },
      { name: "Scikit-learn", icon: "📈", logo: "https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png" },
      { name: "AutoGen", icon: "🤖", logo: "/ag-logo.png" },
      { name: "NLP", icon: "💬", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "CNN", icon: "👁️", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    ],
  },
  {
    category: "DevOps & Tools",
    description: "DevOps, version control, and development tools for efficient workflows",
    skills: [
      { name: "Docker", icon: "🐳", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Jenkins", icon: "⚙️", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
      { name: "Git", icon: "📝", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "VS Code", icon: "💻", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "JIRA", icon: "📋", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
    ],
  },
  {
    category: "Specializations",
    description: "Domain expertise in cutting-edge AI, data structures, and full-stack logic",
    skills: [
      { name: "DSA", icon: "🧱", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Agentic AI", icon: "🔬", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Data Analysis", icon: "📊", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "Fraud Detection", icon: "🛡️", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Forecasting", icon: "📉", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ],
  },
]

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const [exitingSkills, setExitingSkills] = useState<boolean>(false)
  const [radius, setRadius] = useState(200)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoRotateRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Track theme changes
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null
      if (currentTheme) {
        setTheme(currentTheme)
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        setTheme(prefersDark ? "dark" : "light")
      }
    }

    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    autoRotateRef.current = setInterval(() => {
      setExitingSkills(true)
      setTimeout(() => {
        setActiveCategory((prev) => (prev + 1) % skillCategories.length)
        setExitingSkills(false)
      }, 400)
    }, 3000)

    return () => clearInterval(autoRotateRef.current)
  }, [isVisible])

  // Responsive radius calculation
  useEffect(() => {
    const updateRadius = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        // Calculate radius as percentage of container width for responsiveness
        const newRadius = width < 320 ? width * 0.32  // Very small screens
          : width < 640 ? width * 0.35  // Mobile
          : width < 768 ? width * 0.38  // Small tablets
          : width < 1024 ? width * 0.40  // Tablets
          : width < 1280 ? width * 0.42  // Large tablets/small desktop
          : width * 0.45  // Desktop: larger radius
        setRadius(newRadius)
      } else {
        // Fallback for SSR
        if (typeof window !== 'undefined') {
          const width = window.innerWidth
          const newRadius = width < 640 ? 90
            : width < 768 ? 110
            : width < 1024 ? 140
            : width < 1280 ? 180
            : 200
          setRadius(newRadius)
        }
      }
    }

    updateRadius()
    window.addEventListener('resize', updateRadius)
    return () => window.removeEventListener('resize', updateRadius)
  }, [isVisible])

  const handleCategoryChange = (index: number) => {
    if (index !== activeCategory) {
      setExitingSkills(true)
      setTimeout(() => {
        setActiveCategory(index)
        setExitingSkills(false)
      }, 400)
    }
    if (autoRotateRef.current) clearInterval(autoRotateRef.current)
  }

  const getCirclePosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2
    // Use state-based radius for responsive positioning
    const x = Math.cos(angle - Math.PI / 2) * radius
    const y = Math.sin(angle - Math.PI / 2) * radius
    return { x, y }
  }

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("education")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const currentCategory = skillCategories[activeCategory]

  return (
    <section ref={sectionRef} id="skills" className="relative py-16 sm:py-20 md:py-28 lg:pt-14 lg:pb-28 overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div
          className={`mb-12 sm:mb-16 md:mb-20 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-secondary/40 dark:text-secondary/40 [data-theme='light']:text-secondary/60 tracking-[0.2em] uppercase mb-4 sm:mb-6">
            <span className="w-6 sm:w-8 h-px bg-accent" />
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-secondary leading-tight">
            Skills & <span className="text-accent">Expertise</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center justify-between">
          {/* Left: Circular Skills Showcase - Main Focus */}
          <div className="w-full lg:flex-1 flex justify-center">
            <div
              ref={containerRef}
              className={`relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square transition-all duration-700 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {/* Circular background rings - Increased size significantly */}
              {/* Outer circle - least visible (darkest) */}
              <div className="absolute inset-0 rounded-full border border-secondary/10 dark:border-secondary/10 [data-theme='light']:border-secondary/40 opacity-15 dark:opacity-15 [data-theme='light']:opacity-70" />
              {/* Middle circle - medium visibility */}
              <div className="absolute inset-4 sm:inset-6 md:inset-10 lg:inset-12 rounded-full border border-secondary/10 dark:border-secondary/10 [data-theme='light']:border-secondary/35 opacity-25 dark:opacity-25 [data-theme='light']:opacity-80" />
              {/* Inner circle - most visible (lightest) */}
              <div className="absolute inset-8 sm:inset-12 md:inset-20 lg:inset-24 rounded-full border border-accent/20 dark:border-accent/20 [data-theme='light']:border-accent/50 opacity-40 dark:opacity-40 [data-theme='light']:opacity-90" />

              {/* Center content - About selected category */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div 
                  key={activeCategory}
                  className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 dark:from-accent/20 dark:to-accent/5 [data-theme='light']:from-accent/15 [data-theme='light']:to-accent/5 backdrop-blur-sm border border-accent/30 dark:border-accent/30 [data-theme='light']:border-accent/40 flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 text-center animate-centerContentIn"
                >
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-accent mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 leading-tight">{currentCategory.category}</h3>
                  <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-secondary/60 dark:text-secondary/60 [data-theme='light']:text-secondary/70 leading-relaxed px-1 sm:px-1.5 md:px-2">{currentCategory.description}</p>
                </div>
              </div>

              <div className="absolute inset-0">
                {currentCategory.skills.map((skill, index) => {
                  const { x, y } = getCirclePosition(index, currentCategory.skills.length)
                  return (
                    <div
                      key={`${activeCategory}-${skill.name}`}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                    >
                      <div 
                        className="group w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-secondary/10 to-accent/10 dark:from-secondary/10 dark:to-accent/10 [data-theme='light']:from-secondary/15 [data-theme='light']:to-accent/15 backdrop-blur-md border border-accent/30 dark:border-accent/30 [data-theme='light']:border-accent/40 flex flex-col items-center justify-center cursor-default hover:bg-gradient-to-br hover:from-accent/20 hover:to-accent/10 dark:hover:from-accent/20 dark:hover:to-accent/10 [data-theme='light']:hover:from-accent/25 [data-theme='light']:hover:to-accent/15 hover:border-accent/60 dark:hover:border-accent/60 [data-theme='light']:hover:border-accent/70 transition-all duration-300 shadow-lg dark:shadow-lg [data-theme='light']:shadow-xl p-2 sm:p-2.5 md:p-3"
                        style={{
                          animationName: exitingSkills ? "skillExit" : "skillEnter",
                          animationDuration: exitingSkills ? "0.4s" : "0.5s",
                          animationTimingFunction: exitingSkills
                            ? "cubic-bezier(0.4, 0, 1, 1)"
                            : "cubic-bezier(0.34, 1.56, 0.64, 1)",
                          animationFillMode: "forwards",
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 relative mb-1 sm:mb-1.5 md:mb-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                          {skill.logo ? (
                            <Image
                              src={skill.logo}
                              alt={skill.name}
                              fill
                              className="object-contain"
                              style={{
                                filter: (skill.name === "Flask" || skill.name === "Solidity") && theme === "dark" 
                                  ? "invert(1)" 
                                  : "none"
                              }}
                              sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, 56px"
                            />
                          ) : (
                            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">{skill.icon}</span>
                          )}
                        </div>
                        <div className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-secondary/70 dark:text-secondary/70 [data-theme='light']:text-secondary/80 group-hover:text-accent transition-colors duration-300 text-center line-clamp-2 leading-tight px-0.5">
                          {skill.name}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-96 space-y-2 sm:space-y-2.5">
            {skillCategories.map((category, index) => (
              <button
                key={category.category}
                onClick={() => handleCategoryChange(index)}
                className={`group w-full text-left p-2.5 sm:p-3 md:p-4 rounded-lg border transition-all duration-300 text-xs sm:text-sm md:text-base ${
                  activeCategory === index
                    ? "border-accent bg-accent/5 dark:bg-accent/5 [data-theme='light']:bg-accent/10 shadow-lg shadow-accent/20 dark:shadow-accent/20 [data-theme='light']:shadow-accent/30"
                    : "border-secondary/10 dark:border-secondary/10 [data-theme='light']:border-secondary/20 bg-secondary/5 dark:bg-secondary/5 [data-theme='light']:bg-secondary/10 hover:border-accent/50 dark:hover:border-accent/50 [data-theme='light']:hover:border-accent/60 hover:bg-accent/5 dark:hover:bg-accent/5 [data-theme='light']:hover:bg-accent/10"
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center text-xs sm:text-sm md:text-base flex-shrink-0 transition-all duration-300 ${
                      activeCategory === index
                        ? "bg-accent text-background dark:text-background [data-theme='light']:text-background"
                        : "bg-secondary/10 dark:bg-secondary/10 [data-theme='light']:bg-secondary/20 text-secondary/60 dark:text-secondary/60 [data-theme='light']:text-secondary/70 group-hover:bg-accent/20 dark:group-hover:bg-accent/20 [data-theme='light']:group-hover:bg-accent/25 group-hover:text-accent"
                    }`}
                  >
                    {category.skills[0]?.icon || "📌"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold transition-colors duration-300 truncate ${
                        activeCategory === index ? "text-accent" : "text-secondary dark:text-secondary [data-theme='light']:text-secondary group-hover:text-accent"
                      }`}
                    >
                      {category.category}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-secondary/60 dark:text-secondary/60 [data-theme='light']:text-secondary/70 mt-0.5">{category.skills.length} skills</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Category indicator dots at bottom */}
        <div className="mt-12 sm:mt-16 md:mt-20 flex justify-center gap-2 sm:gap-3">
          {skillCategories.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveCategory(index)
                if (autoRotateRef.current) clearInterval(autoRotateRef.current)
              }}
              className={`transition-all duration-300 rounded-full ${
                activeCategory === index
                  ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-accent shadow-lg shadow-accent/50 dark:shadow-accent/50 [data-theme='light']:shadow-accent/60"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-secondary/30 dark:bg-secondary/30 [data-theme='light']:bg-secondary/40 hover:bg-secondary/60 dark:hover:bg-secondary/60 [data-theme='light']:hover:bg-secondary/70"
              }`}
              aria-label={`Go to ${skillCategories[index].category}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation button */}
      <div className="hidden md:flex absolute bottom-8 right-8 items-center gap-4">
        <span className="text-xs md:text-sm uppercase tracking-wider text-secondary/60 dark:text-secondary/60 [data-theme='light']:text-secondary/70">NEXT SECTION</span>
        <button
          onClick={scrollToNextSection}
          className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-background dark:text-background [data-theme='light']:text-background hover:shadow-lg hover:shadow-accent/50 dark:hover:shadow-accent/50 [data-theme='light']:hover:shadow-accent/60 transition-all duration-300 hover:translate-y-1"
          aria-label="Next section"
        >
          <FiArrowDownRight className="w-5 h-5" />
        </button>
      </div>

      <style jsx>{`
        /* Smooth entry animation for skills */
        @keyframes skillEnter {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-180deg);
            filter: blur(8px);
          }
          50% {
            opacity: 0.7;
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0);
          }
        }

        /* Smooth exit animation for skills */
        @keyframes skillExit {
          0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0);
          }
          50% {
            opacity: 0.5;
            filter: blur(4px);
          }
          100% {
            opacity: 0;
            transform: scale(0.3) rotate(180deg);
            filter: blur(8px);
          }
        }

        /* Center content smooth fade and scale animation */
        @keyframes centerContentIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-centerContentIn {
          animation: centerContentIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </section>
  )
}

export default Skills
