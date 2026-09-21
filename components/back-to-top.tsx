'use client'

import * as React from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

/** Scroll offset past which the control is worth showing. */
const VISIBLE_AFTER = 400

export function BackToTop() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > VISIBLE_AFTER)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Content or a resize can move the threshold past the current position
    // without any scrolling, so re-check on resize too.
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    // The in-app switch needs no check here: app/globals.css sets
    // `scroll-behavior: auto !important` under [data-reduce-motion='true'],
    // which overrides the 'smooth' passed below.
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: 0,
      behavior: isReduced ? 'auto' : 'smooth',
    })
  }

  if (!visible) return null

  return (
    <Button
      variant="secondary"
      size="icon-lg"
      className="fixed bottom-6 right-6 z-50 rounded-full border border-border/50 shadow-lg"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp aria-hidden="true" />
    </Button>
  )
}

