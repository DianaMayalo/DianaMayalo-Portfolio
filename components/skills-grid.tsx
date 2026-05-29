'use client'

import { 
  Brain, 
  Database, 
  LineChart, 
  Code2, 
  Cloud, 
  Workflow,
  Cpu,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

const skills = [
  {
    icon: Brain,
    title: 'Machine Learning',
    description: 'TensorFlow, Keras, scikit-learn, CNN architectures',
    gradient: 'from-primary/20 to-primary/5',
    size: 'col-span-2 row-span-2',
  },
  {
    icon: Code2,
    title: 'Python',
    description: 'Pandas, NumPy, Matplotlib',
    gradient: 'from-blue-500/20 to-blue-500/5',
    size: 'col-span-1 row-span-1',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'SQL, ETL pipelines',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    size: 'col-span-1 row-span-1',
  },
  {
    icon: Cloud,
    title: 'Cloud & GEE',
    description: 'Google Earth Engine, Streamlit deployment',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    size: 'col-span-1 row-span-2',
  },
  {
    icon: LineChart,
    title: 'Data Analytics',
    description: 'Statistical analysis, visualization, insights',
    gradient: 'from-amber-500/20 to-amber-500/5',
    size: 'col-span-1 row-span-1',
  },
  {
    icon: Workflow,
    title: 'Automation',
    description: 'Business process automation, workflow optimization',
    gradient: 'from-rose-500/20 to-rose-500/5',
    size: 'col-span-1 row-span-1',
  },
  {
    icon: Cpu,
    title: 'Deep Learning',
    description: 'Neural networks, image classification',
    gradient: 'from-indigo-500/20 to-indigo-500/5',
    size: 'col-span-1 row-span-1',
  },
  {
    icon: BarChart3,
    title: 'Visualization',
    description: 'Dashboards, interactive reports',
    gradient: 'from-violet-500/20 to-violet-500/5',
    size: 'col-span-1 row-span-1',
  },
]

export function SkillsGrid() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A comprehensive toolkit for building intelligent, data-driven solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[120px]">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.title}
                className={cn(
                  'group relative rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5',
                  skill.size
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient background */}
                <div className={cn(
                  'absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                  skill.gradient
                )} />
                
                <div className="relative z-10 h-full flex flex-col">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
