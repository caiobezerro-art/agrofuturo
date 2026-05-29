import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: 'Agrinho 2026 | Agro Forte, Futuro Sustentável',
  description: 'Plataforma educativa e tecnológica demonstrando como a tecnologia pode ajudar o agronegócio sustentável no Paraná. Tema: Equilíbrio entre produção e meio ambiente.',
  keywords: ['Agrinho', 'agricultura sustentável', 'tecnologia agrícola', 'Paraná', 'meio ambiente', 'agronegócio'],
  authors: [{ name: 'Agrinho 2026' }],
  openGraph: {
    title: 'Agrinho 2026 | Agro Forte, Futuro Sustentável',
    description: 'Plataforma educativa demonstrando tecnologia para agronegócio sustentável no Paraná',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#22c55e' },
    { media: '(prefers-color-scheme: dark)', color: '#16a34a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
