'use client'

import { Github, Linkedin, Mail, Phone, ArrowUpRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { site } from '@/lib/site'

const skills = [
  'Machine Learning',
  'Python',
  'TensorFlow',
  'Data Analysis',
  'Power BI',
  'SQL',
]

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/dianamayalo',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/dianamayalo',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:dianamayalo28@gmail.com',
    icon: Mail,
  },
  {
    name: 'Phone',
    href: 'tel:+254799249060',
    icon: Phone,
  },
]

export default function CardPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Card container */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl" />
          
          {/* Main card */}
          <div className="relative bg-card border border-border rounded-2xl p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Avatar placeholder */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">DM</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Diana Mayalo
              </h1>
              <p className="text-muted-foreground text-lg">
                Junior Data Scientist & AI Automation Engineer
              </p>
              
              {/* Availability badge */}
              <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-sm text-emerald-400">Available for opportunities</span>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-3 text-center">Core Skills</p>
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-muted rounded-full text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-3 mb-8">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.name !== 'Phone' ? '_blank' : undefined}
                  rel={social.name !== 'Phone' ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="space-y-3">
              <Button asChild className="w-full group" size="lg">
                <Link href="/">
                  View Full Portfolio
                  <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full" size="lg">
                <a href={site.cvHref} download>
                  <Download className="mr-2 w-4 h-4" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          Nairobi, Kenya
        </p>
      </div>
    </div>
  )
}
