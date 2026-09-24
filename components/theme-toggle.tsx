'use client'

import * as React from 'react'
import { Moon, Sun, Monitor, Check } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { ScrollTrigger } from '@/lib/motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/** Selectable modes, in cycle order: light → dark → system. */
const MODES = ['light', 'dark', 'system'] as const
type Mode = (typeof MODES)[number]

/** The icon reflects the stored *preference* (system shows a monitor). */
const MODE_ICON: Record<Mode, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
}

const MODE_LABEL: Record<Mode, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
}

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // A theme change only repaints — it moves nothing — so ScrollTrigger's cached
  // positions stay valid. Refresh once things have settled anyway, because the
  // swap can change font metrics and therefore trigger offsets.
  React.useEffect(() => {
    ScrollTrigger.refresh()
  }, [resolvedTheme])

  // Before hydration the stored theme is unknown. Render a placeholder of the
  // same size (no layout shift) — the pre-paint script in app/layout.tsx has
  // already applied the correct colours, so nothing flashes.
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" aria-label="Theme">
        <Sun aria-hidden="true" />
      </Button>
    )
  }

  const mode: Mode = (MODES as readonly string[]).includes(theme ?? '') ? (theme as Mode) : 'system'
  const Icon = MODE_ICON[mode]
  const nextMode = MODES[(MODES.indexOf(mode) + 1) % MODES.length]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={`Theme: ${MODE_LABEL[mode]} (currently ${resolvedTheme ?? 'dark'}). Activate to switch to ${MODE_LABEL[nextMode]}.`}
          onClick={(event) => {
            // Modifier-clicks and the keyboard menu key still open the list;
            // a plain click cycles the mode directly (light → dark → system).
            if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return
            event.preventDefault()
            setTheme(nextMode)
          }}
        >
          <Icon aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {MODES.map((value) => (
          <DropdownMenuItem
            key={value}
            role="menuitemradio"
            aria-checked={mode === value}
            onSelect={() => setTheme(value)}
          >
            <Check
              aria-hidden="true"
              className={mode === value ? 'opacity-100' : 'opacity-0'}
            />
            {MODE_LABEL[value]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

