'use client'

import { Briefcase, GraduationCap, Calendar, MapPin, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const experiences = [
  {
    type: 'work',
    title: 'Data Analyst Intern',
    organization: 'Company Name',
    location: 'Nairobi, Kenya',
    period: '2023 - Present',
    description: 'Analyzed large datasets to extract actionable business insights, built automated reporting systems, and collaborated with cross-functional teams to drive data-informed decisions.',
    achievements: [
      'Developed automated dashboards reducing reporting time by 60%',
      'Implemented predictive models for customer behavior analysis',
      'Created data pipelines processing 100K+ records daily',
    ],
    skills: ['Python', 'SQL', 'Power BI', 'Data Analysis'],
  },
]

const education = [
  {
    type: 'education',
    title: 'Bachelor of Science in Actuarial Science',
    organization: 'University Name',
    location: 'Nairobi, Kenya',
    period: '2019 - 2023',
    description: 'Specialized in statistical modeling, risk analysis, and financial mathematics. Strong foundation in probability theory and data analysis.',
    achievements: [
      'Completed coursework in statistical inference and machine learning',
      'Led data science study group and workshops',
      'Relevant coursework: Probability, Statistics, Financial Mathematics',
    ],
    skills: ['Statistics', 'Risk Analysis', 'Mathematics', 'R'],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Education</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            My professional journey and academic background in data science and analytics.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Work Experience</h3>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <article
                  key={index}
                  className="group relative rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {exp.title}
                      </h4>
                      <p className="text-muted-foreground">{exp.organization}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      <Calendar className="w-3 h-3 mr-1" />
                      {exp.period}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs font-mono bg-secondary rounded-md text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <article
                  key={index}
                  className="group relative rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {edu.title}
                      </h4>
                      <p className="text-muted-foreground">{edu.organization}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      <Calendar className="w-3 h-3 mr-1" />
                      {edu.period}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    {edu.location}
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {edu.description}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {edu.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs font-mono bg-secondary rounded-md text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
