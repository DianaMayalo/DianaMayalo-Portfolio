'use client'

import * as React from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scroll = `${(totalScroll / windowHeight) * 100}%`
      setProgress(totalScroll / windowHeight * 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-150 ease-out"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  )
}
