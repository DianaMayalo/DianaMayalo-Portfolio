import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { BackToTop } from '@/components/back-to-top'
import { ScrollProgress } from '@/components/scroll-progress'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

/** Absolute base for Open Graph images. Vercel injects the production host; override with NEXT_PUBLIC_SITE_URL. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Diana Mayalo | Data Scientist & AI Engineer',
  description: 'Junior Data Scientist & AI Automation Engineer specializing in machine learning, data analytics, and intelligent automation solutions.',
  keywords: ['Data Science', 'AI', 'Machine Learning', 'Python', 'TensorFlow', 'Automation'],
  authors: [{ name: 'Diana Mayalo' }],
  openGraph: {
    title: 'Diana Mayalo | Data Scientist & AI Engineer',
    description: 'Junior Data Scientist & AI Automation Engineer specializing in machine learning, data analytics, and intelligent automation solutions.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      {/**
       * Runs before the first paint so accessibility preferences are already on
       * <html> when CSS resolves — no flash, no layout shift. Kept in sync with
       * the attribute names in app/globals.css and the keys used by
       * components/accessibility-panel.tsx.
       * `suppressHydrationWarning` on <html> covers the attributes this sets.
       */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var prefs = JSON.parse(localStorage.getItem('a11y-prefs') || '{}');
                var root = document.documentElement;
                if (prefs.textSize && prefs.textSize !== 'normal') root.setAttribute('data-text-size', prefs.textSize);
                if (prefs.highContrast) root.setAttribute('data-high-contrast', 'true');
                if (prefs.reduceMotion) root.setAttribute('data-reduce-motion', 'true');
                if (prefs.focusIndicators) root.setAttribute('data-strong-focus', 'true');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <ThemeProvider defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <BackToTop />
          <ScrollProgress />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
