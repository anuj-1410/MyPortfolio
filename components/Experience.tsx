"use client"

import { useEffect, useState, useRef } from "react"
import { FiBriefcase, FiMapPin, FiArrowRight, FiArrowDownRight } from "react-icons/fi"

interface Experience {
  id: number
  company: string
  role: string
  location: string
  duration: string
  description: string[]
  technologies: string[]
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "Amdox Technologies",
    role: "Data Science & Analytics Intern",
    location: "Remote",
    duration: "October 2024 - Present",
    description: [
      "Engineered multi-agent system using AutoGen and Gemini 1.5 Pro for autonomous data analysis lifecycle execution",
      "Developed self-healing Python execution engine in FastAPI with automated error diagnosis and resolution",
      "Significantly reduced insight lag for businesses through intelligent data processing automation",
    ],
    technologies: ["Python", "FastAPI", "AutoGen", "Gemini 1.5 Pro", "Data Analysis", "AI"],
  },
  {
    id: 2,
    company: "ACM Chapter RCOEM",
    role: "Member & Event Coordinator",
    location: "Nagpur, India",
    duration: "June 2024 - Present",
    description: [
      "Planned and executed 5+ technical events including workshops and hackathons for skill development",
      "Coordinated with 10+ team members to ensure smooth execution of all activities and participants engagement",
      "Engineered Cryptocurrency Analytics Dashboard using Streamlit and Facebook Prophet for forecasting",
    ],
    technologies: ["Streamlit", "Prophet", "Python", "Event Management", "Technical Training", "Data Science"],
  },
]

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

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

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("portfolio")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} id="experience" className="relative py-20 overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16">
          <span
            className={`inline-flex items-center gap-3 text-sm font-medium text-secondary/40 tracking-[0.2em] uppercase mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="w-8 h-px bg-accent" />
            Experience
          </span>

          <h2
            className={`text-4xl md:text-5xl font-display font-bold text-secondary transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Professional Journey
          </h2>
        </div>

        {/* Timeline Container */}
        <div
          className={`relative transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent"
            style={{ top: "50px", bottom: "0" }}
          />

          {/* Experience Cards */}
          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative" onMouseEnter={() => setActiveIndex(index)}>
                <div
                  className={`hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-3 transition-all duration-300 ${
                    activeIndex === index
                      ? "border-accent bg-accent scale-125"
                      : "border-accent/30 bg-background scale-100"
                  }`}
                  style={{ top: "30px" }}
                />

                {/* Card Content - Alternating Layout */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:ml-auto md:pl-12" : "md:pr-12"}`}>
                  <div
                    className={`group relative bg-muted/20 backdrop-blur-sm rounded-xl p-5 border border-secondary/5 hover:border-accent/30 transition-all duration-300 ${
                      activeIndex === index ? "border-accent/30 shadow-lg shadow-accent/10" : ""
                    }`}
                  >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-xs font-medium text-accent tracking-wider uppercase">{exp.duration}</span>
                    </div>

                    {/* Company & Role */}
                    <div className="mb-3">
                      <h3 className="text-lg md:text-xl font-display font-bold text-secondary mb-1.5 group-hover:text-accent transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-accent/80 font-medium text-xs mb-2">
                        <FiBriefcase className="w-3.5 h-3.5" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-xs text-secondary/60 mb-4">
                      <FiMapPin className="w-3 h-3" />
                      <span>{exp.location}</span>
                    </div>

                    {/* Description */}
                    <ul className="space-y-1.5 mb-4">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-secondary/70 leading-relaxed">
                          <span className="text-accent mt-1 font-bold">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="pt-4 border-t border-secondary/5">
                      <p className="text-xs text-secondary/50 font-medium uppercase tracking-wide mb-2">Tech Stack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs font-medium text-secondary/60 bg-accent/5 rounded-full hover:bg-accent/10 hover:text-accent transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FiArrowRight className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex items-center gap-4">
        <span className="text-xs md:text-sm uppercase tracking-wider text-secondary/60">NEXT SECTION</span>
        <button
          onClick={scrollToNextSection}
          className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-accent/50"
          aria-label="Next section"
        >
          <FiArrowDownRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}

export default Experience
