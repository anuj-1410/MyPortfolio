"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { FiArrowDownRight, FiExternalLink, FiGithub } from "react-icons/fi"

interface Project {
  id: number
  title: string
  category: string
  image: string
  description: string
  tools: string[]
  githubUrl?: string
  demoUrl?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "AutoShield: AI-Powered Web3 Security",
    category: "AI/Blockchain",
    image: "/autoshield-ai-powered-web3-security.jpg",
    description:
      "A decentralized account verification platform using Random Forest ML models (97%+ accuracy) and Solidity smart contracts to detect fraud and protect Web3 ecosystems.",
    tools: ["Next.js 14", "FastAPI", "scikit-learn", "Solidity"],
    githubUrl: "https://github.com/anuj-1410/AutoShield-hackathon",
    demoUrl: "https://auto-shield-hackathon.vercel.app/",
  },
  {
    id: 2,
    title: "Cryptocurrency Analytics Dashboard",
    category: "Data Science",
    image: "/cryptocurrency-analytics-dashboard.jpg",
    description:
      "Real-time analytics and forecasting platform featuring Prophet and ARIMA models for price prediction, alongside advanced technical indicators like RSI and MACD.",
    tools: ["Python", "Streamlit", "Prophet", "Plotly"],
    githubUrl: "https://github.com/anuj-1410/Crypto-TimeSeries-Analysis",
    demoUrl: "https://crypto-timeseries-analysis.streamlit.app/",
  },
  {
    id: 3,
    title: "Agentic Data Analyst",
    category: "AI Agents",
    image: "/agentic-data-analyst.jpg",
    description:
      "An autonomous AI system designed for advanced data exploration and visualization, utilizing agentic workflows to generate insights from complex datasets.",
    tools: ["Next.js", "Python", "Plotly", "AI Agents"],
    githubUrl: "https://github.com/anuj-1410/Agentic-Data-Analyst",
  },
  {
    id: 4,
    title: "CodeMatrix: DSA Learning Platform",
    category: "Web Development",
    image: "/codematrix-dsa-learning-platform.jpg",
    description:
      "Interactive educational platform helping users master DSA through real-time animations of structures like Binary Trees, Stacks, and Sorting algorithms.",
    tools: ["React.js", "Lottie", "CSS Modules", "React Router"],
    githubUrl: "https://github.com/anuj-1410/DSA_teaching_website",
    demoUrl: "https://dsa-teaching-website.vercel.app/",
  },
  {
    id: 5,
    title: "KeepNotes App",
    category: "Mobile App",
    image: "/keepnotes-app.jpg",
    description:
      "A cross-platform React Native application for note management featuring image attachments, dark/light theme support, and persistent local storage.",
    tools: ["React Native", "Expo", "AsyncStorage", "Reanimated"],
    githubUrl: "https://github.com/anuj-1410/keepNotes-app",
  },
  {
    id: 6,
    title: "Indian Sign Language Detection",
    category: "Computer Vision",
    image: "/indian-sign-language-detection.jpg",
    description:
      "A real-time recognition system using Convolutional Neural Networks (CNN) and OpenCV to detect and translate ISL hand gestures into text via webcam.",
    tools: ["TensorFlow", "OpenCV", "Python", "Streamlit"],
    githubUrl: "https://github.com/anuj-1410/Indian_Sign_lang_model",
  },
]

// Helper function to get placeholder image based on project category
const getPlaceholderImage = (project: Project): string => {
  // If the image exists, use it; otherwise use a themed placeholder
  const placeholderMap: Record<string, string> = {
    "AI/Blockchain": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    "Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    "AI Agents": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    "Web Development": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    "Mobile App": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    "Computer Vision": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
  }
  
  return placeholderMap[project.category] || "/placeholder.svg"
}

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
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
    const nextSection = document.getElementById("skills")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-16 sm:py-20 md:py-24 lg:pt-14 lg:pb-28 overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <span
            className={`inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-secondary/40 dark:text-secondary/40 tracking-[0.2em] uppercase mb-4 sm:mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="w-6 sm:w-8 h-px bg-accent" />
            Portfolio
          </span>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold text-secondary transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Featured Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700"
              style={{
                animationName: isVisible ? "slideUp" : "none",
                animationDuration: isVisible ? "0.6s" : "0s",
                animationTimingFunction: "ease-out",
                animationFillMode: "forwards",
                animationDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />
              
              <div className="relative h-full flex flex-col bg-gradient-to-br from-muted/30 dark:from-muted/30 via-muted/20 dark:via-muted/20 to-muted/10 dark:to-muted/10 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl shadow-black/20 group-hover:shadow-accent/20 transition-all duration-700 group-hover:-translate-y-2">
                
                <div className="relative w-full aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent z-10" />
                  
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      target.src = getPlaceholderImage(project)
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-background/10 to-transparent z-10" />
                  <div className="absolute top-0 left-0 right-0 bottom-[-30%] bg-gradient-to-t from-background via-background/60 to-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                  <div className="absolute top-3 sm:top-4 md:top-5 left-3 sm:left-4 md:left-5 z-20">
                    <span className="inline-flex items-center px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold text-secondary bg-gradient-to-r from-accent to-accent/80 backdrop-blur-md shadow-lg shadow-accent/30 transition-all duration-500 group-hover:scale-110">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 right-3 sm:right-4 md:right-5 flex items-center gap-2 z-20">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-accent to-accent/80 backdrop-blur-md flex items-center justify-center shadow-xl shadow-accent/40 transition-all duration-700 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 hover:scale-110 hover:rotate-12"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <FiGithub className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-accent to-accent/80 backdrop-blur-md flex items-center justify-center shadow-xl shadow-accent/40 transition-all duration-700 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 hover:scale-110 hover:rotate-12"
                      >
                        <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                      </a>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10" />
                </div>

                <div className="relative p-4 sm:p-5 md:p-6 lg:p-7 flex-grow flex flex-col bg-gradient-to-b from-transparent to-muted/10">
                  <div className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-secondary mb-2 sm:mb-3 line-clamp-2 transition-colors duration-500 group-hover:text-accent">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-secondary/70 font-light leading-relaxed mb-4 sm:mb-5 line-clamp-3 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={tool}
                        className="px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-secondary/70 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg backdrop-blur-sm transition-all duration-500 group-hover:from-accent/20 group-hover:text-accent"
                        style={{
                          transitionDelay: hoveredId === project.id ? `${idx * 40}ms` : "0ms",
                          transform: hoveredId === project.id ? "translateY(-2px)" : "translateY(0)",
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

export default Portfolio