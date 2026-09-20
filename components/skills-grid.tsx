'use client'

import { 
  Brain, 
  Database, 
  LineChart, 
  Code2, 
  Cloud, 
  Server,
  Briefcase,
  GitBranch,
  Container,
  BarChart3,
  Layers,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/motion/reveal'

const skillCategories = [
  {
    icon: Brain,
    title: 'Machine Learning & Advanced AI',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30 hover:border-cyan-500/60',
    bgGlow: 'hover:shadow-cyan-500/10',
    size: 'md:col-span-2 md:row-span-2',
    skills: [
      { name: 'Deep Learning', items: ['CNN Architectures', 'Neural Networks', 'Image Classification'] },
      { name: 'NLP', items: ['Text Processing', 'Sentiment Analysis', 'NLP Pipelines'] },
      { name: 'Core ML', items: ['Regression', 'Classification', 'Clustering', 'Time Series'] },
      { name: 'Frameworks', items: ['TensorFlow', 'Keras', 'Scikit-learn'] },
    ],
  },
  {
    icon: Database,
    title: 'Data Engineering & Pipelines',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
    bgGlow: 'hover:shadow-emerald-500/10',
    size: 'md:col-span-2 md:row-span-1',
    skills: [
      { name: 'Languages', items: ['Python (Advanced)', 'SQL', 'PostgreSQL', 'MySQL'] },
      { name: 'Tools', items: ['Pandas', 'NumPy', 'ETL Pipelines', 'Data Wrangling'] },
    ],
  },
  {
    icon: Cloud,
    title: 'MLOps, Cloud & DevOps',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30 hover:border-blue-500/60',
    bgGlow: 'hover:shadow-blue-500/10',
    size: 'md:col-span-2 md:row-span-1',
    skills: [
      { name: 'Cloud', items: ['AWS (EC2, S3, Lambda)', 'Google Earth Engine', 'Vercel', 'Streamlit Cloud'] },
      { name: 'DevOps', items: ['Docker', 'GitHub Actions', 'CI/CD', 'Linux', 'Bash'] },
    ],
  },
  {
    icon: BarChart3,
    title: 'Business Intelligence & Analytics',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30 hover:border-amber-500/60',
    bgGlow: 'hover:shadow-amber-500/10',
    size: 'md:col-span-2 md:row-span-1',
    skills: [
      { name: 'BI Tools', items: ['Power BI', 'Tableau', 'Advanced Excel', 'SPSS'] },
      { name: 'Visualization', items: ['Matplotlib', 'Seaborn', 'Plotly', 'Dashboard Design'] },
    ],
  },
  {
    icon: Code2,
    title: 'Software Engineering & Strategy',
    color: 'text-rose-400',
    borderColor: 'border-rose-500/30 hover:border-rose-500/60',
    bgGlow: 'hover:shadow-rose-500/10',
    size: 'md:col-span-2 md:row-span-1',
    skills: [
      { name: 'Engineering', items: ['OOP', 'Git/GitHub', 'API Design', 'FastAPI', 'Flask'] },
      { name: 'Strategy', items: ['AI Consultancy', 'Process Automation', 'System Thinking'] },
    ],
  },
]

export function SkillsGrid() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-16 text-center">
          <div data-reveal>
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <Sparkles className="w-3 h-3 mr-1" />
              Full-Stack Data Scientist & AI Founder
            </Badge>
          </div>
          <h2 data-reveal className="text-3xl md:text-4xl font-bold mb-4">My Toolkit</h2>
          <p data-reveal className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive arsenal for building intelligent, scalable, data-driven solutions.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <div
                key={category.title}
                data-reveal
                className={cn(
                  'group relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl',
                  category.borderColor,
                  category.bgGlow,
                  category.size
                )}
              >
                {/* Ambient glow and shimmer */}
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.08),transparent_25%)] opacity-70" />
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                      'animate-float p-2.5 rounded-xl bg-background/80 border border-border/50 shadow-sm',
                      'group-hover:scale-110 transition-transform duration-300'
                    )}>
                      <Icon className={cn('w-5 h-5', category.color)} />
                    </div>
                    <h3 className="font-semibold text-base">{category.title}</h3>
                  </div>
                  
                  {/* Skills */}
                  <div className="flex-1 space-y-3">
                    {category.skills.map((skillGroup) => (
                      <div key={skillGroup.name}>
                        <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                          {skillGroup.name}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {skillGroup.items.map((item) => (
                            <span
                              key={item}
                              className="text-xs px-2 py-1 rounded-md bg-background/60 border border-border/40 text-foreground/80"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
