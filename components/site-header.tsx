'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Download, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { site, navItems, sectionIds } from '@/lib/site'
import { ThemeToggle } from '@/components/theme-toggle'
import { AccessibilityPanel } from '@/components/accessibility-panel'

/**
 * Which home-page section currently covers the viewport centre. Returns null
 * when none does (e.g. while the hero is on screen) or when not on the home page.
 */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return
    }
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const state = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) state.set(entry.target.id, entry.isIntersecting)
        setActive(sectionIds.find((id) => state.get(id)) ?? null)
      },
      // A thin band around the viewport centre: exactly one section can cross it.
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [enabled])

  return active
}

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const active = useActiveSection(isHome)
  const [open, setOpen] = useState(false)
  /** Section chosen from the drawer; focus moves there instead of back to the menu button. */
  const pendingSection = useRef<string | null>(null)

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Radix returns focus to the trigger on close, and the browser scrolls the
  // focused button into view, which would undo the anchor jump. When the drawer
  // closed because a section link was chosen, send focus to that section instead.
  const handleCloseAutoFocus = (event: Event) => {
    const id = pendingSection.current
    if (!id) return
    pendingSection.current = null
    event.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
  }

  return (
    <header className="sticky top-0 z-40 h-header border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold" aria-label={`${site.name}, home`}>
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
          <span>{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = isHome && active === item.id
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'text-sm transition-colors hover:text-foreground',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <AccessibilityPanel />
          <Button asChild size="sm" variant="outline">
            <a href={site.cvHref} download>
              <Download aria-hidden="true" />
              CV
            </a>
          </Button>
          <Button asChild size="sm">
            <Link href="/#contact">Get in touch</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(20rem,85vw)] border-border/60" onCloseAutoFocus={handleCloseAutoFocus}>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
                {site.name}
              </SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
            </SheetHeader>

            <nav aria-label="Mobile" className="flex flex-col px-4">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      pendingSection.current = item.id
                    }}
                    className="rounded-md px-2 py-3 text-lg text-foreground/90 transition-colors hover:bg-secondary/60 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 p-4">
              <SheetClose asChild>
                <Button asChild size="lg">
                  <Link
                    href="/#contact"
                    onClick={() => {
                      pendingSection.current = 'contact'
                    }}
                  >
                    Get in touch
                  </Link>
                </Button>
              </SheetClose>
              <Button asChild size="lg" variant="outline">
                <a href={site.cvHref} download>
                  <Download aria-hidden="true" />
                  Download CV
                </a>
              </Button>
              <div className="flex items-center gap-2 pt-2">
                <ThemeToggle />
                <AccessibilityPanel />
                <Button asChild variant="ghost" size="icon" aria-label="GitHub">
                  <a href={site.github} target="_blank" rel="noopener noreferrer">
                    <Github aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="Email">
                  <a href={`mailto:${site.email}`}>
                    <Mail aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
