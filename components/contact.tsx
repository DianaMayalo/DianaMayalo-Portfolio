'use client'

import { useState } from 'react'
import { Mail, Linkedin, Github, Phone, MapPin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Reveal } from '@/components/motion/reveal'
import { site } from '@/lib/site'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Opens the visitor's email client with the message pre-filled.
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  const channelClass =
    'group flex items-center gap-4 rounded-xl border border-border/50 bg-card/40 p-4 transition-colors hover:border-primary/40 hover:bg-card'

  return (
    <section id="contact" aria-labelledby="contact-heading" className="px-6 py-section">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <h2 id="contact-heading" data-reveal className="mb-4 text-3xl font-bold md:text-4xl">
            {"Let's Work Together"}
          </h2>
          <p data-reveal className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {"I'm always interested in hearing about new opportunities, collaborations, and interesting data science projects."}
          </p>
        </Reveal>

        <Reveal className="grid gap-8 md:grid-cols-5 lg:gap-12">
          {/* Left: direct channels */}
          <div data-reveal className="space-y-8 md:col-span-2">
            <div>
              <h3 className="mb-3 text-xl font-semibold">Contact Information</h3>
              <p className="text-muted-foreground">
                {"Fill out the form or reach out directly through the following channels:"}
              </p>
            </div>

            <ul className="space-y-3" aria-label="Contact channels">
              <li>
                <a href={`mailto:${site.email}`} className={channelClass}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Mail aria-hidden="true" className="h-5 w-5 text-primary" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">Email</span>
                    <span className="block font-medium break-all transition-colors group-hover:text-primary">
                      {site.email}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className={channelClass}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Phone aria-hidden="true" className="h-5 w-5 text-primary" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">Phone</span>
                    <span className="block font-medium transition-colors group-hover:text-primary">{site.phone}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 rounded-xl p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MapPin aria-hidden="true" className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block text-sm text-muted-foreground">Location</span>
                  <span className="block font-medium">{site.location}</span>
                </span>
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="icon-lg" className="rounded-full" aria-label="GitHub">
                <a href={site.github} target="_blank" rel="noopener noreferrer">
                  <Github aria-hidden="true" className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="icon-lg" className="rounded-full" aria-label="LinkedIn">
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin aria-hidden="true" className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right: form */}
          <Card data-reveal className="border-border/50 bg-card/50 p-6 backdrop-blur-sm md:col-span-3 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="h-12 px-4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    className="h-12 px-4"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message"
                  required
                  rows={6}
                  className="min-h-40 resize-none px-4 py-3"
                />
              </div>

              <div className="space-y-3">
                <Button type="submit" size="lg" className="w-full">
                  <Send aria-hidden="true" />
                  Send Message
                </Button>
                <p className="text-center text-xs text-muted-foreground" aria-live="polite">
                  Opens your email app with the message pre-filled.
                </p>
              </div>
            </form>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
