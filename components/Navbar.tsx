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
      const offset = 0
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
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
          SAEED<span className="text-accent">.</span>
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
        <div className="flex items-center justify-between px-6 py-5">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="text-xl font-display font-bold tracking-tight text-secondary"
          >
            SAEED<span className="text-accent">.</span>
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-50 w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${
              isOpen ? "bg-accent text-primary" : "bg-muted text-secondary"
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
                  href="mailto:hello@saeeddesigns.com"
                  className="text-secondary hover:text-accent transition-colors text-lg font-medium"
                >
                  hello@saeeddesigns.com
                </a>
              </div>

              <div>
                <p className="text-secondary/40 text-xs uppercase tracking-widest mb-2">Based in</p>
                <p className="text-secondary text-lg font-medium">Dubai, UAE</p>
              </div>

              <div>
                <p className="text-secondary/40 text-xs uppercase tracking-widest mb-3">Follow</p>
                <div className="flex gap-4">
                  {["Behance", "Dribbble", "LinkedIn"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-secondary/50 hover:text-accent transition-colors text-sm font-medium hover-underline"
                    >
                      {social}
                    </a>
                  ))}
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
