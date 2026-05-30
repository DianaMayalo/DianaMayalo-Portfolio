'use client'

import { Briefcase, GraduationCap, Calendar, MapPin, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const experiences = [
  {
    type: 'work',
    title: 'Data Analyst (Freelance)',
    organization: 'Intelinkpro',
    location: 'Remote',
    period: 'Oct 2023 - Apr 2025',
    description: 'Delivered tailored data solutions and analytics services to improve client outcomes and streamline business operations.',
    achievements: [
      'Delivered tailored insights through advanced data analysis, improving client outcomes by up to 15%',
      'Automated Excel workflows, reducing reporting time by 30% and increasing accuracy',
      'Built interactive Power BI dashboards to visualize key metrics and support fast decision-making',
    ],
    skills: ['Excel', 'Power BI', 'Automation', 'Data Analysis'],
  },
  {
    type: 'work',
    title: 'Data Analyst Intern',
    organization: 'Future Interns',
    location: 'Bengaluru, India (Remote)',
    period: 'Sep 2024 - Nov 2024',
    description: 'Analyzed datasets and built machine learning models to support predictive analytics and data-driven decision making.',
    achievements: [
      'Analyzed the Titanic dataset to uncover survival patterns, supporting predictive model development',
      'Built a loan eligibility model in Python with 81.3% accuracy, showcasing strong ML proficiency',
      'Designed Power BI dashboards for IPL data, translating player metrics into actionable insights',
    ],
    skills: ['Python', 'Machine Learning', 'Power BI', 'Data Analysis'],
  },
]

const education = [
  {
    type: 'education',
    title: 'Data Science Bootcamp',
    organization: 'Moringa School',
    location: 'Nairobi, Kenya',
    period: 'Feb 2025 - Aug 2025',
    description: 'Intensive data science program covering machine learning, deep learning, NLP, and real-world project development.',
    achievements: [
      'Hands-on experience with Python, ML algorithms, and data pipelines',
      'Built end-to-end data science projects with industry mentorship',
      'Collaborative learning environment with peer code reviews',
    ],
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'NLP'],
  },
  {
    type: 'education',
    title: 'Bachelor of Science in Actuarial Science',
    organization: 'Jomo Kenyatta University of Agriculture and Technology',
    location: 'Nairobi, Kenya',
    period: 'Sep 2019 - June 2024',
    description: 'Specialized in statistical modeling, risk analysis, and financial mathematics with a strong foundation in probability theory and quantitative analysis.',
    achievements: [
      'Strong foundation in probability, statistics, and financial mathematics',
      'Coursework in statistical inference and risk modeling',
      'Developed analytical and quantitative problem-solving skills',
    ],
    skills: ['Statistics', 'Risk Analysis', 'Mathematics', 'Quantitative Analysis'],
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
                    <Badge variant="outline" className="shrink-0 text-xs">
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
