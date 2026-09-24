'use client'

import * as React from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      const scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight
      // A page shorter than the viewport is fully "read" — avoid 0/0 = NaN.
      setProgress(scrollable > 0 ? Math.min(100, Math.max(0, (totalScroll / scrollable) * 100)) : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div
      // transition-[width] (not transition-all) so the bar never animates its own
      // colour when the theme flips, and the reduced-motion rule still wins.
      className="fixed top-0 left-0 z-50 h-1 w-full bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

