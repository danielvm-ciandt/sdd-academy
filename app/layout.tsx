import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: 'SDD Academy - Learn Spec-Driven Development',
  description: 'Master 9 specification-driven development methods through interactive learning and real-world projects',
  keywords: ['spec-driven development', 'SDD', 'development methodology', 'software engineering', 'specifications'],
  authors: [{ name: 'SDD Academy' }],
  creator: 'SDD Academy',
  generator: 'Next.js',
  openGraph: {
    title: 'SDD Academy - Spec-Driven Development',
    description: 'Master specification-driven development methods',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
