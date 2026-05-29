import { Hero } from '@/components/hero'
import { SkillsGrid } from '@/components/skills-grid'
import { Projects } from '@/components/projects'
import { Experience } from '@/components/experience'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SkillsGrid />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
