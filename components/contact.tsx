'use client'

import { Mail, Linkedin, Github, Twitter, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: Github,
    description: 'View my code',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
    description: 'Connect with me',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter,
    description: 'Follow updates',
  },
  {
    name: 'Email',
    href: 'mailto:diana@example.com',
    icon: Mail,
    description: 'Send a message',
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {"Let's Work Together"}
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          {"I'm always interested in hearing about new opportunities, collaborations, and interesting data science projects."}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-4 rounded-xl border border-border/50 bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="text-left">
                  <p className="font-medium group-hover:text-primary transition-colors">{link.name}</p>
                  <p className="text-xs text-muted-foreground">{link.description}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </a>
            )
          })}
        </div>

        <div className="pt-8 border-t border-border/50">
          <Button size="lg" asChild>
            <a href="mailto:diana@example.com">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
