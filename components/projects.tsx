'use client'

import { useState } from 'react'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const projects = [
  {
    id: 1,
    title: 'Nairobi Emergency Dashboard',
    description: 'Real-time emergency response visualization system for Nairobi, enabling rapid situational awareness and resource allocation during critical incidents.',
    longDescription: 'Built an interactive dashboard that aggregates emergency data sources, visualizes incident hotspots, and provides predictive analytics for emergency resource deployment.',
    tech: ['Streamlit', 'Python', 'Pandas', 'Plotly', 'GeoPandas'],
    category: 'Data Visualization',
    gradient: 'from-orange-500/20 via-red-500/10 to-transparent',
    featured: true,
  },
  {
    id: 2,
    title: 'MAYA Tech',
    description: 'Business automation agency delivering intelligent workflow solutions that streamline operations and enhance productivity for small to medium enterprises.',
    longDescription: 'Founded and developed automation solutions including CRM integrations, automated reporting systems, and AI-powered customer service tools.',
    tech: ['Python', 'Automation', 'APIs', 'No-Code Tools', 'AI Integration'],
    category: 'Business Automation',
    gradient: 'from-primary/20 via-cyan-500/10 to-transparent',
    featured: true,
  },
  {
    id: 3,
    title: 'Clean Water AI',
    description: 'Machine learning system leveraging satellite imagery to identify and monitor clean water sources across underserved regions.',
    longDescription: 'Developed a comprehensive ML pipeline using Google Earth Engine to analyze satellite data, detect water bodies, and assess water quality indicators for humanitarian applications.',
    tech: ['Google Earth Engine', 'Python', 'Machine Learning', 'Remote Sensing', 'TensorFlow'],
    category: 'ML & Remote Sensing',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    featured: true,
  },
  {
    id: 4,
    title: 'Crop Disease Classification',
    description: 'Deep learning model achieving 94% accuracy in identifying plant diseases from leaf images, enabling early intervention for farmers.',
    longDescription: 'Implemented a Convolutional Neural Network trained on thousands of crop images to classify various plant diseases, deployed as an accessible tool for agricultural communities.',
    tech: ['TensorFlow', 'Keras', 'CNN', 'Python', 'Image Classification'],
    category: 'Deep Learning',
    gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
    featured: true,
    stats: '94% Accuracy',
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="projects" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A selection of data science and AI projects that demonstrate my approach to solving real-world problems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className={cn(
                'group relative rounded-2xl border border-border/50 bg-card overflow-hidden transition-all duration-500',
                hoveredId === project.id ? 'scale-[1.02] shadow-2xl shadow-primary/10' : 'hover:shadow-lg'
              )}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Gradient overlay */}
              <div className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                project.gradient
              )} />

              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant="secondary" className="mb-3">
                      {project.category}
                    </Badge>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  {project.stats && (
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">{project.stats}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono bg-secondary/80 rounded-full text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                  <div className="ml-auto">
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
