"use client"

import { useState, useEffect, useRef } from "react"
import { FiArrowDownRight } from "react-icons/fi"

interface SkillCategory {
  category: string
  description: string
  skills: Array<{
    name: string
    icon: string
  }>
}

const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    description: "Core programming languages for building robust applications and systems",
    skills: [
      { name: "Python", icon: "🐍" },
      { name: "JavaScript", icon: "⚡" },
      { name: "Java", icon: "☕" },
      { name: "C++", icon: "⚙️" },
    ],
  },
  {
    category: "Frontend & Frameworks",
    description: "Modern UI frameworks and technologies for creating responsive interfaces",
    skills: [
      { name: "React.js", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "HTML/CSS", icon: "🏗️" },
      { name: "Streamlit", icon: "📊" },
    ],
  },
  {
    category: "Backend & Databases",
    description: "Server-side technologies and database solutions for scalable applications",
    skills: [
      { name: "FastAPI", icon: "🚀" },
      { name: "Node.js", icon: "🟢" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Flask", icon: "🧪" },
    ],
  },
  {
    category: "AI/ML & Data Science",
    description: "Advanced machine learning and data analysis tools for intelligent systems",
    skills: [
      { name: "TensorFlow", icon: "🤖" },
      { name: "Scikit-learn", icon: "📈" },
      { name: "Keras", icon: "🧠" },
      { name: "NLP", icon: "💬" },
      { name: "CNN", icon: "👁️" },
    ],
  },
  {
    category: "DevOps & Tools",
    description: "DevOps, version control, and development tools for efficient workflows",
    skills: [
      { name: "Docker", icon: "🐳" },
      { name: "Git", icon: "📝" },
      { name: "Jenkins", icon: "⚙️" },
      { name: "AWS", icon: "☁️" },
      { name: "VS Code", icon: "💻" },
    ],
  },
  {
    category: "Specializations",
    description: "Domain expertise in cutting-edge AI and data engineering applications",
    skills: [
      { name: "Machine Learning", icon: "🔬" },
      { name: "Deep Learning", icon: "🧬" },
      { name: "Data Analysis", icon: "📊" },
      { name: "Fraud Detection", icon: "🛡️" },
      { name: "Time Series", icon: "📉" },
    ],
  },
]

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const [exitingSkills, setExitingSkills] = useState<boolean>(false)
  const sectionRef = useRef<HTMLElement>(null)
  const autoRotateRef = useRef<NodeJS.Timeout>()

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
      setActiveCategory((prev) => (prev + 1) % skillCategories.length)
    }, 6000)

    return () => clearInterval(autoRotateRef.current)
  }, [isVisible])

  const handleCategoryChange = (index: number) => {
    if (index !== activeCategory) {
      setExitingSkills(true)
      setTimeout(() => {
        setActiveCategory(index)
        setExitingSkills(false)
      }, 300)
    }
    if (autoRotateRef.current) clearInterval(autoRotateRef.current)
  }

  const getCirclePosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2
    const radius = 140
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
    <section ref={sectionRef} id="skills" className="relative py-20 md:py-32 overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div
          className={`mb-16 md:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-medium text-secondary/40 tracking-[0.2em] uppercase mb-6">
            <span className="w-8 h-px bg-accent" />
            Technical Stack
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-secondary leading-tight">
            Skills & <span className="text-accent">Expertise</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between">
          {/* Left: Circular Skills Showcase - Main Focus */}
          <div className="w-full lg:flex-1 flex justify-center">
            <div
              className={`relative w-full max-w-md aspect-square transition-all duration-700 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {/* Circular background rings */}
              <div className="absolute inset-0 rounded-full border border-secondary/10 opacity-20" />
              <div className="absolute inset-8 rounded-full border border-secondary/10 opacity-10" />
              <div className="absolute inset-16 rounded-full border border-accent/20 opacity-30" />

              {/* Center content - About selected category */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 backdrop-blur-sm border border-accent/30 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-accent mb-2">{currentCategory.category}</h3>
                  <p className="text-xs md:text-sm text-secondary/60 line-clamp-3">{currentCategory.description}</p>
                </div>
              </div>

              <div className="absolute inset-0">
                {currentCategory.skills.map((skill, index) => {
                  const { x, y } = getCirclePosition(index, currentCategory.skills.length)
                  return (
                    <div
                      key={skill.name}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        animationName: exitingSkills ? "clockwiseExit" : "clockwiseEnter",
                        animationDuration: exitingSkills ? "0.5s" : "0.6s",
                        animationTimingFunction: exitingSkills
                          ? "cubic-bezier(0.4, 0, 0.2, 1)"
                          : "cubic-bezier(0.34, 1.56, 0.64, 1)",
                        animationFillMode: "forwards",
                        animationDelay: `${index * 80}ms`,
                      }}
                    >
                      <div className="group w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-secondary/10 to-accent/10 backdrop-blur-md border border-accent/30 flex items-center justify-center cursor-default hover:bg-gradient-to-br hover:from-accent/20 hover:to-accent/10 hover:border-accent/60 transition-all duration-300 shadow-lg">
                        <div className="text-center">
                          <div className="text-4xl md:text-5xl mb-1 group-hover:scale-125 transition-transform duration-300">
                            {skill.icon}
                          </div>
                          <div className="text-xs font-semibold text-secondary/70 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                            {skill.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-56 space-y-2">
            {skillCategories.map((category, index) => (
              <button
                key={category.category}
                onClick={() => handleCategoryChange(index)}
                className={`group w-full text-left p-3 md:p-4 rounded-lg border transition-all duration-300 text-sm md:text-base ${
                  activeCategory === index
                    ? "border-accent bg-accent/5 shadow-lg shadow-accent/20"
                    : "border-secondary/10 bg-secondary/5 hover:border-accent/50 hover:bg-accent/5"
                }`}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center text-sm md:text-base flex-shrink-0 transition-all duration-300 ${
                      activeCategory === index
                        ? "bg-accent text-secondary"
                        : "bg-secondary/10 text-secondary/60 group-hover:bg-accent/20 group-hover:text-accent"
                    }`}
                  >
                    {category.skills[0]?.icon || "📌"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold transition-colors duration-300 truncate ${
                        activeCategory === index ? "text-accent" : "text-secondary group-hover:text-accent"
                      }`}
                    >
                      {category.category}
                    </h3>
                    <p className="text-xs text-secondary/60 mt-0.5">{category.skills.length} skills</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Category indicator dots at bottom */}
        <div className="mt-16 md:mt-20 flex justify-center gap-3">
          {skillCategories.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveCategory(index)
                if (autoRotateRef.current) clearInterval(autoRotateRef.current)
              }}
              className={`transition-all duration-300 rounded-full ${
                activeCategory === index
                  ? "w-8 h-2 bg-accent shadow-lg shadow-accent/50"
                  : "w-2 h-2 bg-secondary/30 hover:bg-secondary/60"
              }`}
              aria-label={`Go to ${skillCategories[index].category}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation button */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4">
        <span className="text-xs md:text-sm uppercase tracking-wider text-secondary/60">NEXT SECTION</span>
        <button
          onClick={scrollToNextSection}
          className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 hover:translate-y-1"
          aria-label="Next section"
        >
          <FiArrowDownRight className="w-5 h-5" />
        </button>
      </div>

      <style jsx>{`
        /* Clockwise circular entry animation from angle based on position */
        @keyframes clockwiseEnter {
          from {
            opacity: 0;
            filter: blur(4px);
          }
          to {
            opacity: 1;
            filter: blur(0);
          }
        }

        /* Clockwise circular exit animation */
        @keyframes clockwiseExit {
          from {
            opacity: 1;
            filter: blur(0);
          }
          to {
            opacity: 0;
            filter: blur(4px);
          }
        }
      `}</style>
    </section>
  )
}

export default Skills
