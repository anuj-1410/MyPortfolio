"use client"

import { useEffect, useState, useRef } from "react"
import { FiArrowDownRight } from "react-icons/fi"

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("experience")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} id="about" className="relative py-32">
      <div className="container-custom">
        <div className="max-w-4xl">
          {/* Label */}
          <span
            className={`inline-flex items-center gap-3 text-sm font-medium text-secondary/40 tracking-[0.2em] uppercase mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="w-8 h-px bg-accent" />
            About
          </span>

          {/* Main Text */}
          <p
            className={`text-3xl md:text-4xl lg:text-5xl font-display font-medium text-secondary leading-snug transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            I&apos;m <span className="text-accent">Anuj Agrawal</span>, an AI/ML engineer and data scientist passionate
            about building intelligent systems. I specialize in
            <span className="text-accent"> autonomous AI solutions</span> and
            <span className="text-accent"> data-driven applications</span>.
          </p>

          {/* Tools */}
          <div
            className={`mt-16 pt-16 border-t border-secondary/10 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="text-sm text-secondary/40 tracking-[0.15em] uppercase">Technologies I Use</span>
            <p className="mt-4 text-lg text-secondary/60">
              Python • JavaScript • React • Next.js • FastAPI • Flask • TensorFlow • Keras • Docker • Git • AWS
            </p>
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

export default About
