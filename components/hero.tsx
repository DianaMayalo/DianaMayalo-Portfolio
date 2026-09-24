'use client'

import { useRef } from 'react'
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { site } from '@/lib/site'
import { gsap, useGSAP, registerGsap, revealFrom, MOTION_OK } from '@/lib/motion'

export function Hero() {
  // HTMLElement, not HTMLDivElement: this ref lands on a <section>.
  const scope = useRef<HTMLElement | null>(null)

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
    <section
      ref={scope}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-var(--header-height))] items-center px-6 py-section"
    >
      {/* Background gradient effect */}
      <div data-hero-bg aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow: availability status */}
          <div data-hero className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary animate-glow" />
            <span className="font-mono text-xs uppercase tracking-wider text-primary">Available for work</span>
          </div>

          {/* Name, then role, then bio: three clear type sizes */}
          <h1 id="hero-heading" data-hero className="text-5xl font-bold tracking-tight text-balance sm:text-6xl md:text-7xl">
            Diana Mayalo
          </h1>
          <p data-hero className="text-xl font-medium text-primary md:text-2xl">
            Junior Data Scientist &amp; AI Automation Engineer
          </p>
          <p data-hero className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            I build intelligent systems and data-driven solutions. Specializing in machine learning,
            predictive analytics, and automation that transforms complex data into actionable insights.
          </p>

          {/* Primary action first, then secondary */}
          <div data-hero className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" className="group" asChild>
              <a href="#projects">
                View Projects
                <ArrowDown aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={site.cvHref} download>
                <Download aria-hidden="true" />
                Download CV
              </a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          {/* Social links */}
          <div data-hero className="flex items-center gap-5 pt-4">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" aria-hidden="true" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
