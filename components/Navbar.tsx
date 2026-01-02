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
      // Close menu first for better UX on mobile
      setIsOpen(false)
      // Small delay to allow menu to start closing before scroll
      setTimeout(() => {
        // Use scrollIntoView which respects scroll-margin-top CSS property
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 50)
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

  // Prevent body scroll when menu is open on mobile and set data attribute for contact button
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.setAttribute("data-navbar-open", "true")
    } else {
      document.body.style.overflow = ""
      document.documentElement.removeAttribute("data-navbar-open")
    }
    return () => {
      document.body.style.overflow = ""
      document.documentElement.removeAttribute("data-navbar-open")
    }
  }, [isOpen])

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
        
        <div className="relative flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5">
          {/* Left side - Theme Button */}
          <button
            onClick={toggleTheme}
            className="relative z-50 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center active:scale-95 transition-all duration-300 touch-manipulation"
            style={{
              backgroundColor: theme === "dark" ? "rgba(26, 26, 26, 0.6)" : "rgba(245, 245, 245, 0.6)",
              borderColor: theme === "dark" ? "rgba(245, 245, 240, 0.1)" : "rgba(10, 10, 10, 0.1)",
              color: theme === "dark" ? "#F5F5F0" : "#0A0A0A",
            }}
            aria-label="Toggle theme"
          >
            <span className="text-base sm:text-lg md:text-xl">{theme === "dark" ? "☀️" : "🌙"}</span>
          </button>

          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="text-lg sm:text-xl md:text-2xl font-display font-bold tracking-tight text-secondary active:scale-95 transition-transform duration-200 touch-manipulation"
          >
            ANUJ<span className="text-accent">.</span>
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-50 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300 active:scale-95 touch-manipulation ${
              isOpen ? "bg-accent text-primary" : "bg-muted/50 text-secondary backdrop-blur-sm"
            }`}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" /> : <FiMenu size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />}
          </button>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => {
          // Close menu when clicking on overlay background
          if (e.target === e.currentTarget) {
            setIsOpen(false)
          }
        }}
      >
        {/* Background - Full Screen */}
        <div className="absolute inset-0 bg-primary transition-opacity duration-500" />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col lg:flex-row overflow-hidden">
          {/* Left Side - Navigation */}
          <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-24 pt-20 sm:pt-24 md:pt-28 lg:pt-0 pb-8 sm:pb-12 md:pb-16 overflow-y-auto overscroll-contain hide-scrollbar">
            <nav className="space-y-0.5 sm:space-y-1 md:space-y-2">
              {menuItems.map((item, index) => {
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group flex items-center justify-between w-full text-left transition-all duration-500 py-2 sm:py-2.5 md:py-3 active:scale-95 touch-manipulation ${
                      isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: isOpen ? `${index * 60 + 150}ms` : "0ms" }}
                  >
                    {/* Label */}
                    <span
                      className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold transition-all duration-300 leading-tight ${
                        activeSection === item.id ? "text-accent" : "text-secondary group-active:text-accent"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Arrow */}
                    <FiArrowUpRight
                      className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 transition-all duration-300 flex-shrink-0 ml-2 ${
                        activeSection === item.id
                          ? "text-accent opacity-100 rotate-0"
                          : "text-secondary/30 group-active:text-accent group-active:rotate-45"
                      }`}
                    />
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Right Side - Info */}
          <div
            className={`w-full lg:w-96 flex flex-col justify-end p-6 sm:p-8 md:p-12 lg:p-16 transition-all duration-500 delay-300 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-6 sm:space-y-8">
              <div>
                <p className="text-secondary/40 text-[10px] sm:text-xs uppercase tracking-widest mb-2">Get in touch</p>
                <a
                  href="mailto:anujagrawal1410@gmail.com"
                  className="text-secondary hover:text-accent active:text-accent transition-colors text-sm sm:text-base md:text-lg font-medium break-all touch-manipulation"
                >
                  anujagrawal1410@gmail.com
                </a>
              </div>

              <div>
                <p className="text-secondary/40 text-[10px] sm:text-xs uppercase tracking-widest mb-2">Based in</p>
                <p className="text-secondary text-sm sm:text-base md:text-lg font-medium">Nagpur, India</p>
              </div>

              <div>
                <p className="text-secondary/40 text-[10px] sm:text-xs uppercase tracking-widest mb-3">Follow</p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a
                    href="https://github.com/anuj-1410"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary/50 hover:text-accent active:text-accent transition-colors text-sm sm:text-base font-medium hover-underline touch-manipulation py-1"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/anuj1410"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary/50 hover:text-accent active:text-accent transition-colors text-sm sm:text-base font-medium hover-underline touch-manipulation py-1"
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
        
        /* Hide scrollbar for menu content on mobile */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}

export default Navbar
