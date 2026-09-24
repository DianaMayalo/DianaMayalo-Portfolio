import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header'
import { Footer } from '@/components/footer'
import { Reveal } from '@/components/motion/reveal'
import { projects, getProjectBySlug } from '@/lib/projects'
import { site } from '@/lib/site'

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} | ${site.name}`,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${site.name}`,
      description: project.description,
      type: 'article',
      images: [{ url: project.image }],
    },
  }
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const index = projects.findIndex((p) => p.slug === project.slug)
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="px-6 py-section-sm outline-none">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
          {/* Back navigation: same ghost button pattern as /card */}
          <Reveal stagger={false}>
            <Button variant="ghost" asChild className="-ml-3 w-fit text-muted-foreground hover:text-foreground">
              <Link href="/#projects">
                <ArrowLeft aria-hidden="true" />
                Back to projects
              </Link>
            </Button>
          </Reveal>

          <Reveal
            as="article"
            aria-labelledby="project-heading"
            className="rounded-3xl border border-border/60 bg-card p-6 shadow-2xl shadow-primary/5 md:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div data-reveal>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{project.category}</p>
                  <h1 id="project-heading" className="mt-3 text-3xl font-bold text-balance md:text-5xl">
                    {project.title}
                  </h1>
                </div>

                <p data-reveal className="max-w-2xl text-lg text-muted-foreground">
                  {project.description}
                </p>

                <ul data-reveal className="flex flex-wrap gap-2" aria-label="Technologies">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-secondary/80 px-3 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div data-reveal className="flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <Button asChild variant="outline">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github aria-hidden="true" />
                        GitHub
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button asChild variant="outline">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink aria-hidden="true" />
                        Live demo
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </Button>
                  )}
                  <Button asChild>
                    <Link href="/#contact">
                      Discuss a project like this
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div
                data-reveal
                className="relative min-h-[280px] overflow-hidden rounded-3xl border border-border/60 bg-secondary/30"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
                />
                {project.stats && (
                  <span className="absolute right-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-sm font-bold text-primary-foreground">
                    {project.stats}
                  </span>
                )}
              </div>
            </div>
          </Reveal>

          {/* Previous / next case study */}
          <Reveal as="nav" aria-label="Other projects" className="grid gap-4 sm:grid-cols-2">
            <Link
              data-reveal
              href={`/projects/${previous.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card/50 p-5 transition-colors hover:border-primary/40 hover:bg-card"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5" />
              <span className="min-w-0">
                <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">Previous</span>
                <span className="block truncate font-medium transition-colors group-hover:text-primary">{previous.title}</span>
              </span>
            </Link>
            <Link
              data-reveal
              href={`/projects/${next.slug}`}
              className="group flex items-center justify-end gap-3 rounded-2xl border border-border/60 bg-card/50 p-5 text-right transition-colors hover:border-primary/40 hover:bg-card"
            >
              <span className="min-w-0">
                <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">Next</span>
                <span className="block truncate font-medium transition-colors group-hover:text-primary">{next.title}</span>
              </span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  )
}
