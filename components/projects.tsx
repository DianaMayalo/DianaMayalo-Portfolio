import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { projects } from '@/lib/projects'
import { Reveal } from '@/components/motion/reveal'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-secondary/30 px-6 py-section">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14">
          <h2 id="projects-heading" data-reveal className="mb-4 text-3xl font-bold md:text-4xl">
            Featured Projects
          </h2>
          <p data-reveal className="max-w-2xl text-lg text-muted-foreground">
            A selection of data science and AI projects that demonstrate my approach to solving real-world problems.
          </p>
        </Reveal>

        <Reveal as="ul" className="grid gap-6 md:grid-cols-2" role="list">
          {projects.map((project) => {
            const caseStudyHref = `/projects/${project.slug}`
            return (
              <li key={project.id} data-reveal className="flex">
                {/*
                  The whole card is clickable via the stretched title link
                  (after:inset-0). Secondary links sit above it with z-10.
                */}
                <article className="group relative isolate flex w-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-[border-color,box-shadow,translate] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title} project`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    {project.stats && (
                      <div className="absolute right-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-sm font-bold text-primary-foreground">
                        {project.stats}
                      </div>
                    )}
                  </div>

                  {/* Hover tint sits behind everything in the card's own stacking context (isolate + -z-10) */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${project.gradient}`}
                  />

                  {/* Not positioned, so the title link's after:inset-0 stretches over the whole article */}
                  <div className="flex flex-1 flex-col p-6">
                    <Badge variant="secondary" className="mb-3 w-fit">
                      {project.category}
                    </Badge>
                    <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                      <Link
                        href={caseStudyHref}
                        className="after:absolute after:inset-0 after:z-0 after:rounded-2xl after:content-['']"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    <p className="mb-4 mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                    <ul className="mb-5 flex flex-wrap gap-2" aria-label="Technologies">
                      {project.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full bg-secondary/80 px-2 py-1 font-mono text-xs text-muted-foreground"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="relative z-10 mt-auto flex flex-wrap items-center gap-1">
                      {project.githubUrl && (
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github aria-hidden="true" />
                            Code
                            <span className="sr-only"> for {project.title} (opens in a new tab)</span>
                          </a>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" asChild>
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink aria-hidden="true" />
                            Demo
                            <span className="sr-only"> of {project.title} (opens in a new tab)</span>
                          </a>
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="ml-auto text-primary hover:text-primary" asChild>
                        <Link href={caseStudyHref}>
                          Case study
                          <ArrowUpRight
                            aria-hidden="true"
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                          <span className="sr-only">: {project.title}</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
