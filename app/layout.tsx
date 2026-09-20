import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
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
    <html lang="en" className={`dark bg-background ${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
