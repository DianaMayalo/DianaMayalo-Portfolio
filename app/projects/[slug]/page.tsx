import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getProjectBySlug } from '@/lib/projects'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <Button variant="ghost" asChild className="w-fit">
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to projects
          </Link>
        </Button>

        <article className="rounded-3xl border border-border/60 bg-card p-6 shadow-2xl shadow-primary/5 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-primary">{project.category}</p>
                <h1 className="mt-3 text-3xl font-bold md:text-5xl">{project.title}</h1>
              </div>

              <p className="max-w-2xl text-lg text-muted-foreground">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-secondary/80 px-3 py-1 text-xs font-mono text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {project.githubUrl && (
                  <Button asChild variant="outline">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                )}
                {project.demoUrl && (
                  <Button asChild variant="outline">
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Link>
                  </Button>
                )}
                <Button asChild>
                  <Link href="/#projects">
                    View all projects
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-border/60 bg-secondary/30">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              {project.stats && (
                <span className="absolute right-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-sm font-bold text-primary-foreground">
                  {project.stats}
                </span>
              )}
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}
