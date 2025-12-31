"use client"

import { useState, useEffect, useRef } from "react"
import { FiAward, FiCalendar, FiMapPin, FiArrowDownRight } from "react-icons/fi"

const educationData = [
  {
    id: 1,
    degree: "B.Tech - Computer Science and Engineering (AI/ML Specialization)",
    institution: "Shri Ramdeobaba College of Engineering and Management",
    location: "Nagpur, India",
    year: "August 2023 - Present",
    gpa: "9.61 CGPA",
    highlights: [
      "Merit Scholarship for Top Position (CGPA 9.26)",
      "Stage 2 AlgoUniversity Technology Fellowship (Top 4,000 of 20,000+ applicants)",
      "Strong Academic Performance",
    ],
  },
  {
    id: 2,
    degree: "HSC - Khalsa Public School (CBSE)",
    institution: "Khalsa Public School",
    location: "Dongargarh, India",
    year: "June 2020 - March 2023",
    gpa: "88%",
    highlights: ["Strong Foundation", "Science Stream", "Computer Science Excellence"],
  },
]

const Education = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

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
    const nextSection = document.getElementById("contact")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} id="education" className="relative py-20">
      <div className="container-custom">
        {/* Label */}
        <span
          className={`inline-flex items-center gap-3 text-sm font-medium text-secondary/40 tracking-[0.2em] uppercase mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="w-8 h-px bg-accent" />
          Education
        </span>

        {/* Section Title */}
        <h2
          className={`text-4xl md:text-5xl font-display font-bold text-secondary mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Academic Background
        </h2>

        {/* Education Cards */}
        <div
          className={`space-y-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {educationData.map((edu, index) => (
            <div
              key={edu.id}
              onMouseEnter={() => setActiveIndex(index)}
              className="group relative bg-muted/20 backdrop-blur-sm rounded-xl p-6 border border-secondary/5 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 cursor-pointer animate-edu-card"
              style={{
                animationName: isVisible ? "slideUp" : "none",
                animationDuration: "0.6s",
                animationTimingFunction: "ease",
                animationFillMode: "forwards",
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Degree and Institution */}
              <div className="mb-4">
                <h3 className="text-lg md:text-xl font-display font-bold text-secondary mb-2 group-hover:text-accent transition-colors duration-300">
                  {edu.degree}
                </h3>
                <p className="text-sm font-medium text-accent/80 flex items-center gap-2">
                  <FiAward className="w-4 h-4" />
                  {edu.institution}
                </p>
              </div>

              {/* Location and Duration */}
              <div className="grid md:grid-cols-2 gap-4 mb-5 text-xs text-secondary/60">
                <div className="flex items-center gap-2">
                  <FiMapPin className="w-3.5 h-3.5 text-accent" />
                  {edu.location}
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-3.5 h-3.5 text-accent" />
                  {edu.year}
                </div>
              </div>

              {/* GPA/Grade */}
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 bg-accent/10 rounded-full">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-medium text-accent">{edu.gpa}</span>
              </div>

              {/* Highlights */}
              <div className="pt-4 border-t border-secondary/5">
                <p className="text-xs text-secondary/50 font-medium uppercase tracking-wide mb-3">Highlights</p>
                <div className="flex flex-wrap gap-2">
                  {edu.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium text-secondary/60 bg-secondary/5 rounded-full group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
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

        <style jsx>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  )
}

export default Education
