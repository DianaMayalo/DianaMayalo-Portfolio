import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { site, navItems } from '@/lib/site'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 px-6 py-8">
      <Reveal
        stagger={false}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row md:gap-4"
      >
        <Link href="/" className="flex items-center gap-2 font-semibold" aria-label={`${site.name}, home`}>
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
          <span>{site.name}</span>
        </Link>

        <nav aria-label="Footer" className="flex items-center gap-6 text-sm text-muted-foreground">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-primary">
            <Github aria-hidden="true" className="h-5 w-5" />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-primary">
            <Linkedin aria-hidden="true" className="h-5 w-5" />
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email" className="transition-colors hover:text-primary">
            <Mail aria-hidden="true" className="h-5 w-5" />
          </a>
        </div>

        <p className="text-sm text-muted-foreground">
          © {currentYear} {site.name}. All rights reserved.
        </p>
      </Reveal>
    </footer>
  )
}
