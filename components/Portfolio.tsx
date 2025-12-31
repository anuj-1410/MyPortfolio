"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { FiArrowRight } from "react-icons/fi"

interface Project {
  id: number
  title: string
  category: string
  image: string
  description: string
  tools: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "AutoShield: AI-Powered Web3 Security",
    category: "AI/Blockchain",
    image: "/ai-powered-security-platform-for-web3-blockchain.jpg",
    description:
      "Comprehensive security platform leveraging AI to protect Web3 ecosystems from vulnerabilities and threats.",
    tools: ["Machine Learning", "Blockchain", "Python", "Solidity"],
  },
  {
    id: 2,
    title: "Cryptocurrency Analytics Dashboard",
    category: "Data Science",
    image: "/cryptocurrency-trading-analytics-dashboard-with-ch.jpg",
    description:
      "Advanced analytics platform providing real-time market insights and predictive forecasting for traders.",
    tools: ["TensorFlow", "React", "PostgreSQL", "Time Series"],
  },
  {
    id: 3,
    title: "Dynamic AI Chatbot System",
    category: "NLP/ML",
    image: "/conversational-ai-chatbot-interface-modern-design.jpg",
    description: "Intelligent conversational AI with natural language understanding and context-aware responses.",
    tools: ["OpenAI", "NLP", "Node.js", "MongoDB"],
  },
  {
    id: 4,
    title: "Multi-Agent Autonomous System",
    category: "AI Agents",
    image: "/multi-agent-system-autonomous-decision-making.jpg",
    description: "Sophisticated system of autonomous agents that coordinate to solve complex problems independently.",
    tools: ["Python", "Multi-Agent", "Reinforcement", "APIs"],
  },
  {
    id: 5,
    title: "Fraud Detection Platform",
    category: "Machine Learning",
    image: "/fraud-detection-system-security-monitoring.jpg",
    description: "ML-based fraud detection system that identifies suspicious activities and prevents financial crimes.",
    tools: ["XGBoost", "Python", "Kafka", "Redis"],
  },
]

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
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
    <section ref={sectionRef} id="portfolio" className="relative py-20 md:py-32 overflow-hidden">
      <div className="container-custom">
        {/* Section Header - Bold Minimalist */}
        <div
          className={`mb-20 md:mb-28 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-secondary leading-tight mb-6">
            Featured <br />
            <span className="text-accent">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-secondary/60 font-light max-w-2xl leading-relaxed">
            Innovative solutions across AI, blockchain, and data science. Each project demonstrates cutting-edge
            technology and creative problem-solving.
          </p>
        </div>

        {/* Projects Grid - Modern Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative transition-all duration-700 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: isVisible ? `${index * 60}ms` : "0ms",
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedId(selectedId === project.id ? null : project.id)}
            >
              <div className="relative h-full flex flex-col">
                {/* Image Container */}
                <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-5 bg-secondary/5 border border-secondary/10 transition-all duration-500">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-700"
                    style={{
                      filter: hoveredId === project.id ? "brightness(1.1)" : "brightness(1)",
                    }}
                  />

                  <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500"
                    style={{
                      opacity: hoveredId === project.id ? 1 : 0,
                    }}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 transition-all duration-500">
                    <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold text-secondary bg-accent/90 backdrop-blur-md transition-all duration-500">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Arrow Indicator */}
                  <div
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all duration-500"
                    style={{
                      opacity: hoveredId === project.id ? 1 : 0,
                      transform: hoveredId === project.id ? "translateX(0)" : "translateX(-8px)",
                    }}
                  >
                    <FiArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-secondary mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-accent">
                    {project.title}
                  </h3>

                  <p className="text-secondary/60 text-sm md:text-base font-light leading-relaxed mb-5 line-clamp-2 transition-colors duration-300 group-hover:text-secondary/80">
                    {project.description}
                  </p>

                  {/* Tech Stack - Smooth Animation */}
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={tool}
                        className="px-3 py-1 text-xs font-medium text-secondary/70 bg-secondary/8 rounded-lg border border-secondary/15 transition-all duration-300 group-hover:text-accent group-hover:bg-accent/8 group-hover:border-accent/30"
                        style={{
                          transitionDelay: hoveredId === project.id ? `${idx * 25}ms` : "0ms",
                          opacity: hoveredId === project.id ? 1 : 0.7,
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Border Accent - Smooth Fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mt-5 transition-opacity duration-500"
                  style={{
                    opacity: hoveredId === project.id ? 1 : 0,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`mt-20 md:mt-28 pt-16 md:pt-20 border-t border-secondary/10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-3">Interested?</h3>
              <p className="text-secondary/60 font-light text-lg">
                Let's collaborate and bring your vision to life with cutting-edge technology.
              </p>
            </div>
            <a
              href="#contact"
              className="group/btn w-fit px-8 py-4 rounded-full bg-accent text-secondary font-semibold text-base transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 flex items-center gap-3 whitespace-nowrap"
            >
              Start a Project
              <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
