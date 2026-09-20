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
      {/* tabIndex -1 lets the skip link move focus here; no ring on a landmark */}
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <SkillsGrid />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
