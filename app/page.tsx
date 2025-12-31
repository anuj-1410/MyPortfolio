import Hero from "../components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Portfolio from "@/components/Portfolio"
import Skills from "@/components/Skills"
import Education from "@/components/Education"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Portfolio />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}
