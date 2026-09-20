import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { SkillsGrid } from '@/components/skills-grid'
import { Projects } from '@/components/projects'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <SkillsGrid />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
