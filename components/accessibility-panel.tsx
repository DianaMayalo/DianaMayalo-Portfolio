'use client'

import * as React from 'react'
import { Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { killMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'a11y-prefs'

const TEXT_SIZES = ['small', 'normal', 'large', 'xlarge'] as const
type TextSize = (typeof TEXT_SIZES)[number]

/** Labels double as the accessible name; the visual "A" marks are decorative. */
const TEXT_SIZE_LABELS: Record<TextSize, string> = {
  small: 'Small text',
  normal: 'Default text size',
  large: 'Large text',
  xlarge: 'Extra large text',
}

/** Icon-only affordance: the glyph scales, the label carries the meaning. */
const TEXT_SIZE_MARKS: Record<TextSize, string> = {
  small: 'A-',
  normal: 'A',
  large: 'A+',
  xlarge: 'A++',
}

type Prefs = {
  textSize: TextSize
  highContrast: boolean
  reduceMotion: boolean
  focusIndicators: boolean
}

const DEFAULTS: Prefs = {
  textSize: 'normal',
  highContrast: false,
  reduceMotion: false,
  focusIndicators: false,
}

function readPrefs(): Prefs {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return {
      textSize: (TEXT_SIZES as readonly string[]).includes(raw.textSize)
        ? (raw.textSize as TextSize)
        : DEFAULTS.textSize,
      highContrast: Boolean(raw.highContrast),
      reduceMotion: Boolean(raw.reduceMotion),
      focusIndicators: Boolean(raw.focusIndicators),
    }
  } catch {
    // Corrupt or unavailable storage should never break the page.
    return DEFAULTS
  }
}

/**
 * Write a preference to storage and mirror it onto <html> as a data attribute.
 *
 * The attribute is the single source of truth for CSS (app/globals.css) and for
 * GSAP (the reduce-motion flag feeds the `motion-ok` query in lib/motion.ts).
 * Absent means "default", so flags are only ever set when true and explicitly
 * removed when false — writing `data-high-contrast="false"` would not match a
 * `[data-high-contrast="true"]` selector and would silently do nothing.
 */
function applyPrefs(prefs: Prefs) {
  const root = document.documentElement
  if (prefs.textSize === 'normal') root.removeAttribute('data-text-size')
  else root.setAttribute('data-text-size', prefs.textSize)

  if (prefs.highContrast) root.setAttribute('data-high-contrast', 'true')
  else root.removeAttribute('data-high-contrast')

  if (prefs.reduceMotion) root.setAttribute('data-reduce-motion', 'true')
  else root.removeAttribute('data-reduce-motion')

  if (prefs.focusIndicators) root.setAttribute('data-strong-focus', 'true')
  else root.removeAttribute('data-strong-focus')
}

function persistPrefs(prefs: Prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    // Private mode / storage disabled: the attribute still applies this session.
  }
}

export function AccessibilityPanel() {
  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [prefs, setPrefs] = React.useState<Prefs>(DEFAULTS)

  React.useEffect(() => {
    // The pre-paint script in app/layout.tsx has already applied these to <html>;
    // this only syncs the React state that drives the controls' appearance.
    setPrefs(readPrefs())
    setMounted(true)
  }, [])

  const update = (patch: Partial<Prefs>) => {
    setPrefs((current) => {
      const next = { ...current, ...patch }
      applyPrefs(next)
      persistPrefs(next)
      // Turning motion back on mid-session must not strand elements mid-fade.
      if (next.reduceMotion) killMotion()
      return next
    })
  }

  const handleReset = () => {
    applyPrefs(DEFAULTS)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Nothing to clear.
    }
    setPrefs(DEFAULTS)
  }

  const isDefault =
    prefs.textSize === DEFAULTS.textSize &&
    !prefs.highContrast &&
    !prefs.reduceMotion &&
    !prefs.focusIndicators
  // Placeholder keeps the header from shifting when the real control mounts.
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" aria-label="Accessibility settings">
        <Settings2 aria-hidden="true" />
      </Button>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Accessibility settings">
          <Settings2 aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end" aria-label="Accessibility settings">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Accessibility</h3>

          {/* radiogroup: exactly one size is active, so radios are the honest role */}
          <div className="space-y-2" role="radiogroup" aria-labelledby="a11y-text-size-label">
            <p id="a11y-text-size-label" className="text-sm font-medium">
              Text Size
            </p>
            <div className="flex gap-2">
              {TEXT_SIZES.map((size) => {
                const selected = prefs.textSize === size
                return (
                  <Button
                    key={size}
                    variant={selected ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1"
                    role="radio"
                    aria-checked={selected}
                    aria-label={TEXT_SIZE_LABELS[size]}
                    onClick={() => update({ textSize: size })}
                  >
                    <span aria-hidden="true">{TEXT_SIZE_MARKS[size]}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <label htmlFor="a11y-high-contrast" className="text-sm font-medium">
              High Contrast
            </label>
            <Switch
              id="a11y-high-contrast"
              checked={prefs.highContrast}
              onCheckedChange={(checked) => update({ highContrast: checked })}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <label htmlFor="a11y-reduce-motion" className="text-sm font-medium">
              Reduce Motion
            </label>
            <Switch
              id="a11y-reduce-motion"
              checked={prefs.reduceMotion}
              onCheckedChange={(checked) => update({ reduceMotion: checked })}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <label htmlFor="a11y-focus-indicators" className="text-sm font-medium">
              Focus Indicators
            </label>
            <Switch
              id="a11y-focus-indicators"
              checked={prefs.focusIndicators}
              onCheckedChange={(checked) => update({ focusIndicators: checked })}
            />
          </div>

          <Button
            variant="ghost"
            className={cn('mt-4 w-full', isDefault && 'text-muted-foreground')}
            onClick={handleReset}
            disabled={isDefault}
          >
            Reset to defaults
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

