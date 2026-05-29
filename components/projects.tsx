'use client'

import { useState } from 'react'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    title: 'Nairobi Emergency Dashboard (NED)',
    description: 'A real-time, AI-powered emergency command center built for NADEMA that aggregates crowdsourced field updates and automates crisis summaries, accelerating disaster deployment and reducing response times across Nairobi County.',
    tech: ['Streamlit', 'Python', 'Google Sheets API', 'Google Apps Script', 'Plotly Mapbox'],
    category: 'Data Visualization',
    gradient: 'from-orange-500/20 via-red-500/10 to-transparent',
    featured: true,
    image: '/images/nairobi-dashboard.png',
    demoUrl: '#', // Add your live demo URL here
    githubUrl: '#', // Add your GitHub URL here
  },
  {
    id: 2,
    title: 'MAYA Tech',
    description: 'An innovative technology agency specializing in custom business automation, data-driven dashboards, and predictive intelligence solutions for scaling enterprises.',
    tech: ['Python', 'Google Apps Script', 'n8n', 'Make', 'Looker Studio', 'Gemini/GPT APIs'],
    category: 'Business Automation',
    gradient: 'from-primary/20 via-cyan-500/10 to-transparent',
    featured: true,
    image: '/images/maya-tech.png',
    demoUrl: '#', // Add your live demo URL here
  },
  {
    id: 3,
    title: 'CleanWater AI',
    description: 'Developed an end-to-end machine learning system integrating WPDx, GEMS, and Google Earth Engine satellite data to monitor water quality and predict contamination risks across 22,000+ water points in Kenya.',
    tech: ['Python', 'XGBoost', 'NLP', 'Streamlit', 'Google Earth Engine API', 'Docker'],
    category: 'ML & Remote Sensing',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    featured: true,
    image: '/images/cleanwater-ai.png',
    demoUrl: '#', // Add your live demo URL here
    githubUrl: '#', // Add your GitHub URL here
  },
  {
    id: 4,
    title: 'Crop Disease Classification with CNN',
    description: 'Built and deployed a custom convolutional neural network using TensorFlow/Keras to classify 15 types of healthy and diseased crop leaves from the PlantVillage dataset with data augmentation and Streamlit web deployment.',
    tech: ['Python', 'TensorFlow/Keras', 'CNN', 'Computer Vision', 'Streamlit', 'Scikit-learn'],
    category: 'Deep Learning',
    gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
    featured: true,
    stats: '94% Accuracy',
    image: '/images/crop-disease.png',
    githubUrl: '#', // Add your GitHub URL here
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
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                {project.stats && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-sm font-bold">
                    {project.stats}
                  </div>
                )}
              </div>

              {/* Gradient overlay */}
              <div className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
                project.gradient
              )} />

              <div className="relative z-10 p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {project.category}
                    </Badge>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono bg-secondary/80 rounded-full text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
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
