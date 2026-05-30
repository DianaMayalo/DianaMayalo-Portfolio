import { Hero } from '@/components/hero'
import { SkillsGrid } from '@/components/skills-grid'
import { Projects } from '@/components/projects'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SkillsGrid />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
