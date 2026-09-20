'use client'

import { useRef } from 'react'
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { site } from '@/lib/site'
import { gsap, useGSAP, registerGsap, revealFrom, MOTION_OK } from '@/lib/motion'

export function Hero() {
  const scope = useRef<HTMLElement>(null)

  // Load timeline: background glow fades up, then each block rises in order.
  // Under prefers-reduced-motion the section simply renders in its final state.
  useGSAP(
    () => {
      registerGsap()
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap
          .timeline()
          .from('[data-hero-bg]', { opacity: 0, duration: 1.2, ease: 'power2.out', clearProps: 'opacity' }, 0)
          .from('[data-hero]', revealFrom(), 0.1)
      })
      return () => mm.revert()
    },
    { scope },
  )

  return (
    <section ref={scope} className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Background gradient effect */}
      <div data-hero-bg className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Name and navigation */}
        <div data-hero className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
            <span className="text-sm text-muted-foreground font-mono">Available for work</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            <a href="#contact" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Contact</a>
          </nav>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <h1 data-hero className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Diana Mayalo
          </h1>
          <h2 data-hero className="text-2xl md:text-3xl text-primary font-medium">
            Junior Data Scientist & AI Automation Engineer
          </h2>
          <p data-hero className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            I build intelligent systems and data-driven solutions. Specializing in machine learning,
            predictive analytics, and automation that transforms complex data into actionable insights.
          </p>

          {/* Social links */}
          <div data-hero className="flex items-center gap-6 pt-4">
            <a
              href="https://github.com/dianamayalo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/dianamayalo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:dianamayalo28@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          {/* CTA buttons */}
          <div data-hero className="flex flex-wrap items-center gap-4 pt-4">
            <Button variant="outline" size="lg" asChild>
              <a href={site.cvHref} download>
                <Download className="mr-2 w-4 h-4" />
                Download CV
              </a>
            </Button>
            <Button size="lg" className="group" asChild>
              <a href="#projects">
                View Projects
                <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
