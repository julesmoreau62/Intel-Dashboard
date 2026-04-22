import { Archivo, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const archivo = Archivo({ 
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  title: 'TELEGRAM VEILLE // Briefing Quotidien',
  description: 'Briefing quotidien Business · Finance · Géopolitique — 10 infos sélectionnées par IA depuis Telegram',
}

export const viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="grid-mesh" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
