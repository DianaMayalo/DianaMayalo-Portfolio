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

/**
 * The query gsap.matchMedia() listens on: animate when motion is welcome.
 *
 * The second clause is the whole trick. `prefers-reduced-motion` alone only
 * knows the OS setting, so a visitor who switches "Reduce Motion" on in the
 * accessibility panel would still see every GSAP reveal. `--reduce-motion` is a
 * registered `<number>` custom property defined in app/globals.css that folds
 * both signals into one value:
 *
 *   0 — motion welcome (default, and what the OS reports by default)
 *   1 — suppress motion, set by `[data-reduce-motion='true']` or by the
 *       `prefers-reduced-motion: reduce` block
 *
 * Reading it as a media feature means GSAP's matchMedia reacts to the in-app
 * switch too, and reverts timelines that are already running. Note this works
 * because `--reduce-motion` is *not* defined in terms of prefers-reduced-motion;
 * a query cannot depend on the condition it is embedded in.
 *
 * Keep this string in sync with the `@property` block in app/globals.css.
 */
export const MOTION_OK = '(prefers-reduced-motion: no-preference) and (--reduce-motion: 0)'

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

/**
 * True when motion should be suppressed right now: either the OS preference or
 * the in-app "Reduce Motion" switch. Read at call time, not at module load, so
 * `gsap.matchMedia()` re-evaluates it after the attribute changes.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  if (document.documentElement.getAttribute('data-reduce-motion') === 'true') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Neutralise every in-flight GSAP tween and reset ScrollTrigger.
 *
 * Called when the a11y panel turns "Reduce Motion" on mid-session: GSAP's
 * `matchMedia` reverts animations it created, but this also catches anything
 * already running and guarantees elements are left in their final, visible
 * state rather than frozen mid-fade (WCAG 2.3.3 — no content trapped invisible).
 */
export function killMotion() {
  if (typeof window === 'undefined') return
  gsap.globalTimeline.getChildren(true, true, true).forEach((tween) => tween.progress(1))
  ScrollTrigger.refresh()
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
