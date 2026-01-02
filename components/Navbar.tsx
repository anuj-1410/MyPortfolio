"use client"

import { useState, useEffect } from "react"
import {
  FiMenu,
  FiX,
  FiArrowUpRight,
  FiHome,
  FiUser,
  FiGrid,
  FiLayers,
  FiMail,
  FiBriefcase,
  FiAward,
} from "react-icons/fi"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  // Initialize theme from document or system preference
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null
    if (currentTheme) {
      setTheme(currentTheme)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const initialTheme = prefersDark ? "dark" : "light"
      setTheme(initialTheme)
      document.documentElement.setAttribute("data-theme", initialTheme)
    }
  }, [])

  // Sync theme when document attribute changes (from Hero component)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null
      if (currentTheme && currentTheme !== theme) {
        setTheme(currentTheme)
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => observer.disconnect()
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  const menuItems = [
    { id: "home", label: "Home", icon: FiHome },
    { id: "about", label: "About", icon: FiUser },
    { id: "experience", label: "Experience", icon: FiBriefcase },
    { id: "portfolio", label: "Work", icon: FiGrid },
    { id: "skills", label: "Skills", icon: FiLayers },
    { id: "education", label: "Education", icon: FiAward },
    { id: "contact", label: "Contact", icon: FiMail },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Use scrollIntoView which respects scroll-margin-top CSS property
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = element.offsetTop
          const elementBottom = elementTop + element.offsetHeight
          const scrollPos = window.scrollY + 200

          return {
            id: item.id,
            isActive: scrollPos >= elementTop && scrollPos < elementBottom,
          }
        }
        return { id: item.id, isActive: false }
      })

      const activeSection = sections.find((s) => s.isActive)
      if (activeSection) {
        setActiveSection(activeSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* Fixed Left Side Navigation - Desktop */}
      <nav className="fixed left-0 top-0 h-screen w-20 z-50 hidden lg:flex flex-col items-center justify-between py-8 border-r border-secondary/5">
        {/* Logo - Rotated */}
        <button
          onClick={() => scrollToSection("home")}
          className="text-lg font-display font-bold tracking-tight text-secondary hover:text-accent transition-colors duration-300"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          ANUJ<span className="text-accent">.</span>
        </button>

        {/* Navigation Items with Icons */}
        <div className="flex flex-col items-center gap-2">
          {menuItems.map((item) => {
            const iconMap: Record<string, any> = {
              home: FiHome,
              about: FiUser,
              experience: FiBriefcase,
              portfolio: FiGrid,
              skills: FiLayers,
              education: FiAward,
              contact: FiMail,
            }
            const Icon = iconMap[item.id] || item.icon

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`group relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-accent text-primary"
                    : "text-secondary/40 hover:text-secondary hover:bg-secondary/5"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeSection === item.id || hoveredItem === item.id ? "scale-110" : ""
                  }`}
                />

                {/* Tooltip */}
                <span
                  className={`absolute left-16 px-4 py-2 bg-muted text-secondary text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-300 border border-secondary/10 ${
                    hoveredItem === item.id
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4 pointer-events-none"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
          <span
            className="text-[10px] font-medium text-secondary/30 tracking-[0.2em]"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            SCROLL
          </span>
        </div>
      </nav>

      {/* Fixed Top Bar - Mobile & Tablet */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        {/* Glass effect background */}
        <div className="absolute inset-0 bg-background/80 dark:bg-background/80 [data-theme='light']:bg-background/90 backdrop-blur-xl border-b border-secondary/10 dark:border-secondary/10 [data-theme='light']:border-secondary/20" />
        
        <div className="relative flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5">
          {/* Left side - Theme Button */}
          <button
            onClick={toggleTheme}
            className="relative z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center hover:border-accent transition-all duration-300"
            style={{
              backgroundColor: theme === "dark" ? "rgba(26, 26, 26, 0.6)" : "rgba(245, 245, 245, 0.6)",
              borderColor: theme === "dark" ? "rgba(245, 245, 240, 0.1)" : "rgba(10, 10, 10, 0.1)",
              color: theme === "dark" ? "#F5F5F0" : "#0A0A0A",
            }}
            aria-label="Toggle theme"
          >
            <span className="text-lg sm:text-xl">{theme === "dark" ? "☀️" : "🌙"}</span>
          </button>

          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="text-xl font-display font-bold tracking-tight text-secondary"
          >
            ANUJ<span className="text-accent">.</span>
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-50 w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${
              isOpen ? "bg-accent text-primary" : "bg-muted/50 text-secondary backdrop-blur-sm"
            }`}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background - Full Screen Black */}
        <div className="absolute inset-0 bg-primary" />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col lg:flex-row">
          {/* Left Side - Navigation */}
          <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 pt-24 lg:pt-0 overflow-hidden">
            <nav className="space-y-1">
              {menuItems.map((item, index) => {
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group flex items-center justify-between w-full text-left transition-all duration-500 py-2 sm:py-3 ${
                      isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: isOpen ? `${index * 80 + 200}ms` : "0ms" }}
                  >
                    {/* Label */}
                    <span
                      className={`text-4xl sm:text-5xl md:text-7xl font-display font-bold transition-all duration-300 ${
                        activeSection === item.id ? "text-accent" : "text-secondary group-hover:text-accent"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Arrow */}
                    <FiArrowUpRight
                      className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 flex-shrink-0 ${
                        activeSection === item.id
                          ? "text-accent opacity-100 rotate-0"
                          : "text-secondary/30 group-hover:text-accent group-hover:rotate-45"
                      }`}
                    />
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Right Side - Info */}
          <div
            className={`lg:w-96 flex flex-col justify-end p-8 md:p-16 transition-all duration-700 delay-500 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-8">
              <div>
                <p className="text-secondary/40 text-xs uppercase tracking-widest mb-2">Get in touch</p>
                <a
                  href="mailto:anujagrawal1410@gmail.com"
                  className="text-secondary hover:text-accent transition-colors text-base sm:text-lg font-medium break-all"
                >
                  anujagrawal1410@gmail.com
                </a>
              </div>

              <div>
                <p className="text-secondary/40 text-xs uppercase tracking-widest mb-2">Based in</p>
                <p className="text-secondary text-base sm:text-lg font-medium">Nagpur, India</p>
              </div>

              <div>
                <p className="text-secondary/40 text-xs uppercase tracking-widest mb-3">Follow</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/anuj1410"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary/50 hover:text-accent transition-colors text-sm font-medium hover-underline"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/anuj-1410"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary/50 hover:text-accent transition-colors text-sm font-medium hover-underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content Offset for Desktop */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          main {
            margin-left: 80px;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar
