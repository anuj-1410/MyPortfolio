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
    <section ref={sectionRef} id="contact" className="relative py-32">
      <div className="container-custom">
        {/* Label */}
        <span
          className={`inline-flex items-center gap-3 text-sm font-medium text-secondary/40 tracking-[0.2em] uppercase mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="w-8 h-px bg-accent" />
          Get in Touch
        </span>

        {/* Main Content */}
        <div
          className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-secondary leading-tight max-w-4xl mb-16">
            Have a project or collaboration in mind?
            <span className="text-accent"> Let&apos;s build something intelligent together.</span>
          </h2>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl">
            {/* Email */}
            <a
              href="mailto:anujagrawal1410@gmail.com"
              className="group flex items-start gap-4 p-6 rounded-2xl border border-secondary/10 hover:border-accent/30 transition-all duration-300"
            >
              <FiMail className="w-5 h-5 text-accent mt-1" />
              <div className="flex-1">
                <p className="text-sm text-secondary/40 mb-1">Email</p>
                <p className="text-sm md:text-base text-secondary group-hover:text-accent transition-colors break-all">
                  anujagrawal1410@gmail.com
                </p>
              </div>
              <FiArrowUpRight className="w-5 h-5 text-secondary/20 group-hover:text-accent transition-colors flex-shrink-0" />
            </a>

            {/* Phone */}
            <a
              href="tel:+917223061410"
              className="group flex items-start gap-4 p-6 rounded-2xl border border-secondary/10 hover:border-accent/30 transition-all duration-300"
            >
              <FiPhone className="w-5 h-5 text-accent mt-1" />
              <div className="flex-1">
                <p className="text-sm text-secondary/40 mb-1">Phone</p>
                <p className="text-sm md:text-base text-secondary group-hover:text-accent transition-colors">
                  +91 7223061410
                </p>
              </div>
              <FiArrowUpRight className="w-5 h-5 text-secondary/20 group-hover:text-accent transition-colors flex-shrink-0" />
            </a>

            {/* Location */}
            <div className="flex items-start gap-4 p-6 rounded-2xl border border-secondary/10">
              <FiMapPin className="w-5 h-5 text-accent mt-1" />
              <div>
                <p className="text-sm text-secondary/40 mb-1">Location</p>
                <p className="text-sm md:text-base text-secondary">Nagpur, India</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-16 pt-16 border-t border-secondary/10">
            <p className="text-sm text-secondary/40 mb-6">Connect on</p>
            <div className="flex gap-6 flex-wrap">
              {[
                { name: "GitHub", url: "https://github.com/anuj1410" },
                { name: "LinkedIn", url: "https://www.linkedin.com/in/anuj-1410" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/60 hover:text-accent transition-colors text-lg font-medium flex items-center gap-2"
                >
                  {social.name}
                  <FiArrowUpRight className="w-4 h-4" />
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
