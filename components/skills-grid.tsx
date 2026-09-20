'use client'

import { Brain, Database, Code2, Cloud, BarChart3, Sparkles, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/motion/reveal'

type SkillCategory = {
  icon: LucideIcon
  title: string
  accent: string
  border: string
  size: string
  skills: { name: string; items: string[] }[]
}

const skillCategories: SkillCategory[] = [
  {
    icon: Brain,
    title: 'Machine Learning & Advanced AI',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30 hover:border-cyan-500/60',
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
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30 hover:border-emerald-500/60',
    size: 'md:col-span-2',
    skills: [
      { name: 'Languages', items: ['Python (Advanced)', 'SQL', 'PostgreSQL', 'MySQL'] },
      { name: 'Tools', items: ['Pandas', 'NumPy', 'ETL Pipelines', 'Data Wrangling'] },
    ],
  },
  {
    icon: Cloud,
    title: 'MLOps, Cloud & DevOps',
    accent: 'text-blue-400',
    border: 'border-blue-500/30 hover:border-blue-500/60',
    size: 'md:col-span-2',
    skills: [
      { name: 'Cloud', items: ['AWS (EC2, S3, Lambda)', 'Google Earth Engine', 'Vercel', 'Streamlit Cloud'] },
      { name: 'DevOps', items: ['Docker', 'GitHub Actions', 'CI/CD', 'Linux', 'Bash'] },
    ],
  },
  {
    icon: BarChart3,
    title: 'Business Intelligence & Analytics',
    accent: 'text-amber-400',
    border: 'border-amber-500/30 hover:border-amber-500/60',
    size: 'md:col-span-2',
    skills: [
      { name: 'BI Tools', items: ['Power BI', 'Tableau', 'Advanced Excel', 'SPSS'] },
      { name: 'Visualization', items: ['Matplotlib', 'Seaborn', 'Plotly', 'Dashboard Design'] },
    ],
  },
  {
    icon: Code2,
    title: 'Software Engineering & Strategy',
    accent: 'text-rose-400',
    border: 'border-rose-500/30 hover:border-rose-500/60',
    size: 'md:col-span-2',
    skills: [
      { name: 'Engineering', items: ['OOP', 'Git/GitHub', 'API Design', 'FastAPI', 'Flask'] },
      { name: 'Strategy', items: ['AI Consultancy', 'Process Automation', 'System Thinking'] },
    ],
  },
]

export function SkillsGrid() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-6 py-section">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <div data-reveal>
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <Sparkles aria-hidden="true" className="mr-1 h-3 w-3" />
              Full-Stack Data Scientist &amp; AI Founder
            </Badge>
          </div>
          <h2 id="about-heading" data-reveal className="mb-4 text-3xl font-bold md:text-4xl">
            My Toolkit
          </h2>
          <p data-reveal className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A comprehensive arsenal for building intelligent, scalable, data-driven solutions.
          </p>
        </Reveal>

        {/* Bento: 4 columns, the ML card spans 2x2, the rest span 2x1 */}
        <Reveal as="ul" className="grid grid-cols-1 gap-4 md:grid-cols-4" role="list">
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <li
                key={category.title}
                data-reveal
                className={cn(
                  'group relative overflow-hidden rounded-2xl border bg-card/50 p-6 backdrop-blur-sm transition-colors',
                  category.border,
                  category.size,
                )}
              >
                {/* Ambient glow (decorative; non-interactive card, so no lift) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(0,204,168,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.08),transparent_25%)] opacity-70"
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="animate-float rounded-xl border border-border/50 bg-background/80 p-2.5 shadow-sm">
                      <Icon aria-hidden="true" className={cn('h-5 w-5', category.accent)} />
                    </div>
                    <h3 className="text-base font-semibold">{category.title}</h3>
                  </div>

                  <div className="flex-1 space-y-4">
                    {category.skills.map((group) => (
                      <div key={group.name}>
                        <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                          {group.name}
                        </p>
                        <ul className="flex flex-wrap gap-1.5" aria-label={group.name}>
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="rounded-md border border-border/40 bg-background/60 px-2 py-1 text-xs text-foreground/80"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
