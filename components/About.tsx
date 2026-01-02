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
    <section ref={sectionRef} id="about" className="relative py-16 sm:py-20 md:py-24 lg:pt-16 lg:pb-20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[6fr_4fr] gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="order-2 lg:order-1">
            {/* Label */}
            <span
              className={`inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-secondary/40 dark:text-secondary/40 [data-theme='light']:text-secondary/60 tracking-[0.2em] uppercase mb-4 sm:mb-6 md:mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <span className="w-6 sm:w-8 h-px bg-accent" />
              About
            </span>

            {/* Main Text */}
            <p
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-medium text-secondary leading-snug transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              I&apos;m <span className="text-accent">Anuj Agrawal</span>, a Computer Science student at RCOEM. I build
              <span className="text-accent"> autonomous AI systems</span> and
              <span className="text-accent"> full-stack applications</span>, combining intelligent models with scalable backends to create 
              <span className="text-accent"> end-to-end</span>, <span className="text-accent"> data-driven</span> solutions.
            </p>

            {/* Tools */}
            <div
              className={`mt-8 sm:mt-12 md:mt-16 pt-8 sm:pt-12 md:pt-16 border-t border-secondary/10 dark:border-secondary/10 [data-theme='light']:border-secondary/20 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <span className="text-xs sm:text-sm text-secondary/40 dark:text-secondary/40 [data-theme='light']:text-secondary/60 tracking-[0.15em] uppercase">Technologies I Use</span>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-secondary/60 dark:text-secondary/60 [data-theme='light']:text-secondary/70">
                Python • JavaScript • React • Next.js • FastAPI • Flask • TensorFlow • Keras • Docker
              </p>
            </div>
          </div>

          {/* Right Side - Circular Profile Image */}
          <div className="flex justify-center order-1 lg:order-2 mb-6 sm:mb-8 lg:mb-0">
            <div
              className={`relative transition-all duration-700 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              {/* Circular Frame with Gradient Border */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full p-1 bg-gradient-to-br from-accent via-accent/80 to-accent/60 shadow-2xl shadow-accent/20 dark:shadow-accent/20 [data-theme='light']:shadow-accent/30">
                <div className="w-full h-full rounded-full overflow-hidden bg-secondary/5 dark:bg-secondary/5 [data-theme='light']:bg-secondary/10 backdrop-blur-sm border-4 border-secondary/10 dark:border-secondary/10 [data-theme='light']:border-secondary/20">
                  <img
                    src="/anuj.jpg"
                    alt="Anuj Agrawal"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-accent/10 dark:bg-accent/10 [data-theme='light']:bg-accent/15 blur-2xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-accent/5 dark:bg-accent/5 [data-theme='light']:bg-accent/10 blur-3xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 right-8 items-center gap-4">
        <span className="text-xs md:text-sm uppercase tracking-wider text-secondary/60 dark:text-secondary/60 [data-theme='light']:text-secondary/70">NEXT SECTION</span>
        <button
          onClick={scrollToNextSection}
          className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-background dark:text-background [data-theme='light']:text-background hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-accent/50 dark:hover:shadow-accent/50 [data-theme='light']:hover:shadow-accent/60"
          aria-label="Next section"
        >
          <FiArrowDownRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}

export default About
