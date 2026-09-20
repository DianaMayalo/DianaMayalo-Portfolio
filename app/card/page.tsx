import type { Metadata } from 'next'
import Link from 'next/link'
import { Github, Linkedin, Mail, Phone, ArrowLeft, ArrowUpRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: `Contact card | ${site.name}`,
  description: `Contact details and links for ${site.name}.`,
}

const skills = ['Machine Learning', 'Python', 'TensorFlow', 'Data Analysis', 'Power BI', 'SQL']

const socials = [
  { name: 'GitHub', href: site.github, icon: Github, external: true },
  { name: 'LinkedIn', href: site.linkedin, icon: Linkedin, external: true },
  { name: 'Email', href: `mailto:${site.email}`, icon: Mail, external: false },
  { name: 'Phone', href: site.phoneHref, icon: Phone, external: false },
]

/**
 * Standalone digital business card (QR / link-in-bio target). No site header
 * on purpose; the back button matches the one on project pages.
 */
export default function CardPage() {
  return (
    <main id="main" className="flex min-h-svh flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg">
        <Reveal stagger={false} className="mb-4">
          <Button variant="ghost" asChild className="-ml-3 w-fit text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft aria-hidden="true" />
              Back to portfolio
            </Link>
          </Button>
        </Reveal>

        <div className="relative">
          {/* Glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl"
          />

          <Reveal as="section" aria-labelledby="card-heading" className="relative rounded-2xl border border-border bg-card p-8 md:p-10">
            <div className="mb-8 text-center">
              <div
                data-reveal
                aria-hidden="true"
                className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5"
              >
                <span className="text-3xl font-bold text-primary">DM</span>
              </div>

              <h1 id="card-heading" data-reveal className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
                {site.name}
              </h1>
              <p data-reveal className="text-lg text-muted-foreground">
                Junior Data Scientist &amp; AI Automation Engineer
              </p>

              <div
                data-reveal
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5"
              >
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-primary">Available for opportunities</span>
              </div>
            </div>

            <div data-reveal className="mb-8">
              <p className="mb-3 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">Core Skills</p>
              <ul className="flex flex-wrap justify-center gap-2" aria-label="Core skills">
                {skills.map((skill) => (
                  <li key={skill} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <ul data-reveal className="mb-8 flex justify-center gap-3" aria-label="Contact links">
              {socials.map((social) => (
                <li key={social.name}>
                  <Button asChild variant="outline" size="icon-lg" className="rounded-full" aria-label={social.name}>
                    <a
                      href={social.href}
                      target={social.external ? '_blank' : undefined}
                      rel={social.external ? 'noopener noreferrer' : undefined}
                    >
                      <social.icon aria-hidden="true" className="h-5 w-5" />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>

            <div data-reveal className="space-y-3">
              <Button asChild className="group w-full" size="lg">
                <Link href="/">
                  View Full Portfolio
                  <ArrowUpRight
                    aria-hidden="true"
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full" size="lg">
                <a href={site.cvHref} download>
                  <Download aria-hidden="true" />
                  Download CV
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">{site.location}</p>
      </div>
    </main>
  )
}
