import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { BackToTop } from '@/components/back-to-top'
import { ScrollProgress } from '@/components/scroll-progress'
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
      <body className="bg-background text-foreground font-sans antialiased">

        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var prefs = JSON.parse(localStorage.getItem('a11y-prefs') || '{}');
            if (prefs.textSize) document.documentElement.setAttribute('data-text-size', prefs.textSize);
            if (prefs.highContrast) document.documentElement.setAttribute('data-high-contrast', 'true');
            if (prefs.reduceMotion) document.documentElement.setAttribute('data-reduce-motion', 'true');
            if (prefs.focusIndicators) document.documentElement.setAttribute('data-strong-focus', 'true');
          } catch (e) {}
        `}} />

        {children}
        <BackToTop />
        <ScrollProgress />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
