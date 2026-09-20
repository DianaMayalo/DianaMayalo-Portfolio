import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

/**
 * One reveal language for the whole site. Mirrors the CSS tokens in
 * app/globals.css (--reveal-duration, --reveal-distance, --reveal-stagger,
 * --ease-out-quad) so CSS transitions and GSAP tweens feel identical.
 */
export const REVEAL = {
  distance: 24,
  duration: 0.8,
  ease: 'power2.out',
  stagger: 0.08,
} as const

/** gsap.matchMedia() condition: animate only when the user has not asked for less motion. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

/** A wrapper starts revealing once its top is above this fraction of the viewport height. */
export const REVEAL_START_RATIO = 0.85

/**
 * ScrollTrigger start for wrappers below the fold. `clamp()` keeps the start
 * inside the scrollable range so elements near the page bottom (footer) still
 * trigger instead of being unreachable. Note: on a page with no scroll range a
 * clamped start never fires, so <Reveal> plays in-view wrappers directly.
 */
export const REVEAL_START = `clamp(top ${REVEAL_START_RATIO * 100}%)`

/** True when the element is already inside the reveal zone, or the page cannot scroll at all. */
export function isInRevealZone(el: Element): boolean {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  return maxScroll <= 0 || el.getBoundingClientRect().top < window.innerHeight * REVEAL_START_RATIO
}

let registered = false

/** Register GSAP plugins exactly once, on the client only. Safe to call repeatedly. */
export function registerGsap() {
  if (registered || typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger, useGSAP)
  registered = true

  // Web fonts can swap in after the `load` event and reflow the page, which
  // leaves trigger positions stale (the footer's could end up past max scroll).
  // Recompute once fonts settle.
  if ('fonts' in document) {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }
}

/**
 * Shared "from" vars for a fade + rise reveal. `clearProps` removes the inline
 * transform/opacity GSAP leaves behind so Tailwind hover transforms still apply.
 * Opacity (not autoAlpha) keeps unrevealed content in the accessibility tree.
 */
export function revealFrom(overrides: gsap.TweenVars = {}): gsap.TweenVars {
  return {
    opacity: 0,
    y: REVEAL.distance,
    duration: REVEAL.duration,
    ease: REVEAL.ease,
    stagger: REVEAL.stagger,
    clearProps: 'opacity,transform',
    ...overrides,
  }
}

export { gsap, ScrollTrigger, useGSAP }
