'use client'

import { useRef, type ComponentPropsWithoutRef, type ElementType } from 'react'
import { gsap, useGSAP, registerGsap, revealFrom, MOTION_OK, REVEAL_START } from '@/lib/motion'

type RevealProps<T extends ElementType> = {
  /** Element to render. Defaults to a div. */
  as?: T
  /**
   * When true (default) every descendant marked `data-reveal` is staggered.
   * When no descendant is marked, the wrapper itself fades in as one block.
   */
  stagger?: boolean
  /** ScrollTrigger start position. Defaults to REVEAL_START. */
  start?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as'>

/**
 * Scroll-triggered fade + 24px rise. Plays once when the wrapper enters the
 * viewport. Under prefers-reduced-motion nothing is animated and content is
 * simply rendered in its final state. Server-rendered HTML is fully visible,
 * so there is no dependency on JS for content to appear.
 */
export function Reveal<T extends ElementType = 'div'>({
  as,
  stagger = true,
  start = REVEAL_START,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      registerGsap()
      const root = ref.current
      if (!root) return

      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const marked = stagger ? root.querySelectorAll<HTMLElement>('[data-reveal]') : []
        const targets: Element[] | Element = marked.length ? Array.from(marked) : root
        gsap.from(
          targets,
          revealFrom({
            scrollTrigger: { trigger: root, start, once: true },
          }),
        )
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  )
}
