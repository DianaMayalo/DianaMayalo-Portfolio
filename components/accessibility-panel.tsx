'use client'

import * as React from 'react'
import { Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type TextSize = 'small' | 'normal' | 'large' | 'xlarge'

export function AccessibilityPanel() {
  const [mounted, setMounted] = React.useState(false)
  const [textSize, setTextSize] = React.useState<TextSize>('normal')
  const [highContrast, setHighContrast] = React.useState(false)
  const [reduceMotion, setReduceMotion] = React.useState(false)
  const [focusIndicators, setFocusIndicators] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const prefs = JSON.parse(localStorage.getItem('a11y-prefs') || '{}')
    if (prefs.textSize) setTextSize(prefs.textSize as TextSize)
    if (prefs.highContrast) setHighContrast(prefs.highContrast)
    if (prefs.reduceMotion) setReduceMotion(prefs.reduceMotion)
    if (prefs.focusIndicators) setFocusIndicators(prefs.focusIndicators)
  }, [])

  const updatePrefs = (updates: any) => {
    const current = JSON.parse(localStorage.getItem('a11y-prefs') || '{}')
    const next = { ...current, ...updates }
    localStorage.setItem('a11y-prefs', JSON.stringify(next))
    
    if (next.textSize) document.documentElement.setAttribute('data-text-size', next.textSize)
    if (next.highContrast) document.documentElement.setAttribute('data-high-contrast', 'true')
    else document.documentElement.removeAttribute('data-high-contrast')
    
    if (next.reduceMotion) document.documentElement.setAttribute('data-reduce-motion', 'true')
    else document.documentElement.removeAttribute('data-reduce-motion')
    
    if (next.focusIndicators) document.documentElement.setAttribute('data-strong-focus', 'true')
    else document.documentElement.removeAttribute('data-strong-focus')
  }

  const handleTextSize = (size: TextSize) => {
    setTextSize(size)
    updatePrefs({ textSize: size })
  }

  const handleReset = () => {
    setTextSize('normal')
    setHighContrast(false)
    setReduceMotion(false)
    setFocusIndicators(false)
    localStorage.removeItem('a11y-prefs')
    document.documentElement.removeAttribute('data-text-size')
    document.documentElement.removeAttribute('data-high-contrast')
    document.documentElement.removeAttribute('data-reduce-motion')
    document.documentElement.removeAttribute('data-strong-focus')
  }

  if (!mounted) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="w-9 h-9" aria-label="Accessibility settings">
          <Settings2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Accessibility</h3>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Text Size</p>
            <div className="flex gap-2">
              <Button variant={textSize === 'small' ? 'default' : 'outline'} size="sm" onClick={() => handleTextSize('small')} aria-pressed={textSize === 'small'}>A-</Button>
              <Button variant={textSize === 'normal' ? 'default' : 'outline'} size="sm" onClick={() => handleTextSize('normal')} aria-pressed={textSize === 'normal'}>A</Button>
              <Button variant={textSize === 'large' ? 'default' : 'outline'} size="sm" onClick={() => handleTextSize('large')} aria-pressed={textSize === 'large'}>A+</Button>
              <Button variant={textSize === 'xlarge' ? 'default' : 'outline'} size="sm" onClick={() => handleTextSize('xlarge')} aria-pressed={textSize === 'xlarge'}>A++</Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="high-contrast" className="text-sm font-medium">High Contrast</label>
            <Switch id="high-contrast" checked={highContrast} onCheckedChange={(c) => { setHighContrast(c); updatePrefs({ highContrast: c }) }} aria-label="Toggle high contrast" />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="reduce-motion" className="text-sm font-medium">Reduce Motion</label>
            <Switch id="reduce-motion" checked={reduceMotion} onCheckedChange={(c) => { setReduceMotion(c); updatePrefs({ reduceMotion: c }) }} aria-label="Toggle reduce motion" />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="focus-indicators" className="text-sm font-medium">Focus Indicators</label>
            <Switch id="focus-indicators" checked={focusIndicators} onCheckedChange={(c) => { setFocusIndicators(c); updatePrefs({ focusIndicators: c }) }} aria-label="Toggle strong focus indicators" />
          </div>

          <Button variant="ghost" className="w-full mt-4" onClick={handleReset}>Reset to defaults</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
