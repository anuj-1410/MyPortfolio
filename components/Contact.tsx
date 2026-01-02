"use client"

import { useState, useEffect, useRef } from "react"
import { FiMail, FiPhone, FiMapPin, FiArrowUpRight } from "react-icons/fi"

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section ref={sectionRef} id="contact" className="relative py-16 sm:py-20 md:py-24 lg:pt-14 lg:pb-28">
      <div className="container-custom">
        {/* Label */}
        <span
          className={`inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-secondary/40 dark:text-secondary/40 [data-theme='light']:text-secondary/60 tracking-[0.2em] uppercase mb-8 sm:mb-10 md:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="w-6 sm:w-8 h-px bg-accent" />
          Get in Touch
        </span>

        {/* Main Content */}
        <div
          className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary leading-tight max-w-4xl mb-12 sm:mb-14 md:mb-16">
            Have a project or collaboration in mind?
            <span className="text-accent"> Let&apos;s build something intelligent together.</span>
          </h2>

          {/* Contact Options */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl">
            {/* Email */}
            <a
              href="mailto:anujagrawal1410@gmail.com"
              className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-secondary/10 dark:border-secondary/10 [data-theme='light']:border-secondary/20 hover:border-accent/30 dark:hover:border-accent/30 [data-theme='light']:hover:border-accent/40 transition-all duration-300"
            >
              <FiMail className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-secondary/40 dark:text-secondary/40 [data-theme='light']:text-secondary/60 mb-1">Email</p>
                <p className="text-xs sm:text-sm md:text-base text-secondary dark:text-secondary [data-theme='light']:text-secondary group-hover:text-accent transition-colors break-all">
                  anujagrawal1410@gmail.com
                </p>
              </div>
              <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-secondary/20 dark:text-secondary/20 [data-theme='light']:text-secondary/30 group-hover:text-accent transition-colors flex-shrink-0" />
            </a>

            {/* Phone */}
            <a
              href="tel:+917223061410"
              className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-secondary/10 dark:border-secondary/10 [data-theme='light']:border-secondary/20 hover:border-accent/30 dark:hover:border-accent/30 [data-theme='light']:hover:border-accent/40 transition-all duration-300"
            >
              <FiPhone className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-secondary/40 dark:text-secondary/40 [data-theme='light']:text-secondary/60 mb-1">Phone</p>
                <p className="text-xs sm:text-sm md:text-base text-secondary dark:text-secondary [data-theme='light']:text-secondary group-hover:text-accent transition-colors">
                  +91 7223061410
                </p>
              </div>
              <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-secondary/20 dark:text-secondary/20 [data-theme='light']:text-secondary/30 group-hover:text-accent transition-colors flex-shrink-0" />
            </a>

            {/* Location */}
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-secondary/10 dark:border-secondary/10 [data-theme='light']:border-secondary/20 sm:col-span-2 md:col-span-1">
              <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-secondary/40 dark:text-secondary/40 [data-theme='light']:text-secondary/60 mb-1">Location</p>
                <p className="text-xs sm:text-sm md:text-base text-secondary dark:text-secondary [data-theme='light']:text-secondary">Nagpur, India</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12 sm:mt-14 md:mt-16 pt-12 sm:pt-14 md:pt-16 border-t border-secondary/10 dark:border-secondary/10 [data-theme='light']:border-secondary/20">
            <p className="text-xs sm:text-sm text-secondary/40 dark:text-secondary/40 [data-theme='light']:text-secondary/60 mb-4 sm:mb-6">Connect on</p>
            <div className="flex gap-4 sm:gap-6 flex-wrap">
              {[
                { name: "GitHub", url: "https://github.com/anuj1410" },
                { name: "LinkedIn", url: "https://www.linkedin.com/in/anuj-1410" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/60 dark:text-secondary/60 [data-theme='light']:text-secondary/70 hover:text-accent transition-colors text-base sm:text-lg font-medium flex items-center gap-2"
                >
                  {social.name}
                  <FiArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
