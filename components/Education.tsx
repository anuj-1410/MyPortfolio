"use client"

import { useState, useEffect, useRef } from "react"
import { FiAward, FiCalendar, FiMapPin, FiArrowDownRight, FiTrendingUp, FiStar } from "react-icons/fi"

const educationData = [
  {
    id: 1,
    degree: "B.Tech, Computer Science and Engineering (AI/ML)",
    institution: "Shri Ramdeobaba College of Engineering and Management",
    location: "Nagpur, India",
    year: "August 2023 - Present",
    gpa: "9.61 CGPA",
    achievements: [
      "Merit Scholarship for Top Position",
      "AlgoUniversity Technology Fellowship (Top 4,000 of 20,000+ applicants)",
    ],
  },
  {
    id: 2,
    degree: "HSC & SSC",
    institution: "Khalsa Public School (CBSE)",
    location: "Dongargarh, India",
    year: "June 2020 - March 2023",
    gpa: "HSC: 88% | SSC: 82%",
    achievements: ["Science Stream", "Computer Science Excellence"],
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
    <section ref={sectionRef} id="education" className="relative py-16 sm:py-20 md:py-24 lg:pt-14 lg:pb-28 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 dark:bg-accent/5 [data-theme='light']:bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 dark:bg-accent/5 [data-theme='light']:bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Label */}
        <span
          className={`inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-secondary/40 dark:text-secondary/40 [data-theme='light']:text-secondary/60 tracking-[0.2em] uppercase mb-4 sm:mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="w-6 sm:w-8 h-px bg-accent" />
          Education
        </span>

        {/* Section Title */}
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-secondary mb-8 sm:mb-12 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Academic <span className="text-accent">Journey</span>
        </h2>

        {/* Education Timeline - Advanced Design */}
        <div className="relative">
          {/* Animated Vertical Timeline Line */}
          <div className="hidden md:block absolute left-10 top-0 bottom-0 w-0.5">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-accent/40 to-transparent" />
            <div 
              className="absolute top-0 w-full bg-gradient-to-b from-accent via-accent/80 to-transparent transition-all duration-1000"
              style={{
                height: isVisible ? "100%" : "0%",
                transitionDelay: "300ms"
              }}
            />
          </div>

          <div className={`space-y-6 sm:space-y-8 md:space-y-10 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {educationData.map((edu, index) => (
              <div
                key={edu.id}
                onMouseEnter={() => setActiveIndex(index)}
                className="group relative md:pl-20"
                style={{
                  animation: isVisible ? `slideInFromLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 200}ms forwards` : "none",
                  opacity: 0,
                }}
              >
                {/* Animated Timeline Node */}
                <div className="hidden md:flex absolute left-0 top-5 items-center justify-center z-20">
                  <div className="relative">
                    {/* Outer Glow Ring */}
                    <div className="absolute inset-0 w-6 h-6 rounded-full bg-accent/20 dark:bg-accent/20 [data-theme='light']:bg-accent/30 blur-lg group-hover:blur-xl group-hover:bg-accent/40 transition-all duration-500" />
                    
                    {/* Pulsing Ring */}
                    <div className={`absolute inset-0 w-5 h-5 rounded-full border-2 border-accent/30 dark:border-accent/30 [data-theme='light']:border-accent/40 transition-all duration-500 ${
                      activeIndex === index ? "scale-125 opacity-0" : "scale-100 opacity-100"
                    }`} />
                    
                    {/* Main Dot */}
                    <div className={`relative w-5 h-5 rounded-full transition-all duration-500 ${
                      activeIndex === index
                        ? "bg-accent scale-110 shadow-lg shadow-accent/50 dark:shadow-accent/50 [data-theme='light']:shadow-accent/60"
                        : "bg-background dark:bg-background [data-theme='light']:bg-background border-2 border-accent/50 dark:border-accent/50 [data-theme='light']:border-accent/60 scale-100"
                    }`}>
                      {/* Inner Glow */}
                      <div className="absolute inset-0.5 rounded-full bg-accent/20 dark:bg-accent/20 [data-theme='light']:bg-accent/30 blur-sm" />
                    </div>
                  </div>
                </div>

                {/* Main Card - 3D Transform Effect */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl transform transition-all duration-700 group-hover:-translate-y-1 group-hover:scale-[1.01] shadow-lg dark:shadow-lg [data-theme='light']:shadow-xl [data-theme='light']:shadow-black/5">
                  {/* Animated Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/40 dark:from-muted/40 [data-theme='light']:from-muted/50 via-muted/25 dark:via-muted/25 [data-theme='light']:via-muted/35 to-muted/15 dark:to-muted/15 [data-theme='light']:to-muted/25 backdrop-blur-2xl" />
                  
                  {/* Animated Accent Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 dark:via-white/5 [data-theme='light']:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Content Container */}
                  <div className="relative p-5 sm:p-6 md:p-8">
                    {/* Top Section with Floating Elements */}
                    <div className="mb-5 sm:mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                        <div className="flex-1 space-y-2">
                          {/* Degree Title with Animation */}
                          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-secondary group-hover:text-accent transition-all duration-500 leading-tight">
                            {edu.degree}
                          </h3>
                          
                          {/* Institution with Icon */}
                          <div className="flex items-center gap-2 text-sm sm:text-base text-accent/90 dark:text-accent/90 [data-theme='light']:text-accent font-medium">
                            <div className="relative">
                              <FiAward className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                              <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-accent/20 dark:bg-accent/20 [data-theme='light']:bg-accent/30 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                            </div>
                            <span className="leading-tight">{edu.institution}</span>
                          </div>
                        </div>
                        
                        {/* Floating GPA Badge with Animation */}
                        <div className="flex-shrink-0">
                          <div className="relative group/badge">
                            <div className="absolute inset-0 bg-accent/30 dark:bg-accent/30 [data-theme='light']:bg-accent/40 rounded-xl blur-lg group-hover/badge:blur-xl transition-all duration-500" />
                            <div className="relative inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-br from-accent/25 dark:from-accent/25 [data-theme='light']:from-accent/30 to-accent/15 dark:to-accent/15 [data-theme='light']:to-accent/20 backdrop-blur-md border border-accent/30 dark:border-accent/30 [data-theme='light']:border-accent/40 shadow-lg shadow-accent/20 dark:shadow-accent/20 [data-theme='light']:shadow-accent/30 group-hover/badge:scale-105 group-hover/badge:shadow-accent/40 dark:group-hover/badge:shadow-accent/40 [data-theme='light']:group-hover/badge:shadow-accent/50 transition-all duration-500">
                              <FiTrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent animate-bounce" style={{ animationDuration: "2s" }} />
                              <span className="text-xs sm:text-sm font-bold text-accent">{edu.gpa}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Location and Duration with Icons */}
                      <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-xs sm:text-sm text-secondary/70 dark:text-secondary/70 [data-theme='light']:text-secondary/80">
                        <div className="flex items-center gap-2 group/location">
                          <div className="relative">
                            <FiMapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent relative z-10 group-hover/location:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-accent/20 dark:bg-accent/20 [data-theme='light']:bg-accent/30 rounded-full blur-sm" />
                          </div>
                          <span className="font-medium">{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-2 group/calendar">
                          <div className="relative">
                            <FiCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent relative z-10 group-hover/calendar:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-accent/20 dark:bg-accent/20 [data-theme='light']:bg-accent/30 rounded-full blur-sm" />
                          </div>
                          <span className="font-medium">{edu.year}</span>
                        </div>
                      </div>
                    </div>

                    {/* Achievements Section with Staggered Animation */}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="pt-5 sm:pt-6 border-t border-secondary/10 dark:border-secondary/10 [data-theme='light']:border-secondary/15">
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {edu.achievements.map((achievement, idx) => (
                            <span
                              key={idx}
                              className="group/achievement relative inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-secondary/80 dark:text-secondary/80 [data-theme='light']:text-secondary/90 bg-gradient-to-br from-secondary/10 dark:from-secondary/10 [data-theme='light']:from-secondary/15 to-secondary/5 dark:to-secondary/5 [data-theme='light']:to-secondary/10 rounded-lg backdrop-blur-sm border border-secondary/10 dark:border-secondary/10 [data-theme='light']:border-secondary/15 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-accent/30 dark:hover:border-accent/30 [data-theme='light']:hover:border-accent/40 hover:text-accent shadow-sm dark:shadow-sm [data-theme='light']:shadow-md [data-theme='light']:shadow-black/5"
                              style={{
                                animation: activeIndex === index ? `slideInScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 100}ms forwards` : "none",
                              }}
                            >
                              {/* Background Glow on Hover */}
                              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover/achievement:opacity-100 transition-opacity duration-500" />
                              
                              {/* Star Icon */}
                              <FiStar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent/60 dark:text-accent/60 [data-theme='light']:text-accent/70 group-hover/achievement:text-accent group-hover/achievement:rotate-12 transition-all duration-300 relative z-10" />
                              
                              {/* Text */}
                              <span className="relative z-10">{achievement}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Animated Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Corner Accent Dots */}
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-accent/40 dark:bg-accent/40 [data-theme='light']:bg-accent/50 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-accent/40 dark:bg-accent/40 [data-theme='light']:bg-accent/50 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" style={{ transitionDelay: "100ms" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Section Button */}
        <div className="hidden md:flex absolute right-8 items-center gap-4">
          <span className="text-xs md:text-sm uppercase tracking-wider text-secondary/60 dark:text-secondary/60 [data-theme='light']:text-secondary/70">NEXT SECTION</span>
          <button
            onClick={scrollToNextSection}
            className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-background dark:text-background [data-theme='light']:text-background hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-accent/50 dark:hover:shadow-accent/50 [data-theme='light']:hover:shadow-accent/60"
            aria-label="Next section"
          >
            <FiArrowDownRight className="w-5 h-5" />
          </button>
        </div>

        <style jsx>{`
          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-50px) translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0) translateY(0);
            }
          }

          @keyframes slideInScale {
            from {
              opacity: 0;
              transform: scale(0.8) translateY(10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  )
}

export default Education
