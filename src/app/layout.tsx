import './globals.css'
import ClientWrapper from '../components/ClientWrapper'
  import { LanguageProvider } from '../context/LanguageContext'

export const metadata = {
  title: 'Nathan Roos | Full Stack Developer & Cloud Infrastructure Specialist',
  description: 'Portfolio of Nathan Roos - Full Stack Developer specializing in Next.js, Kubernetes, and Modern Cloud Infrastructure. Building scalable applications with cutting-edge technologies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
      <html lang="en">
        <body className="min-h-screen">
          <LanguageProvider>
            <ClientWrapper>
              {children}
            </ClientWrapper>
          </LanguageProvider>
        </body>
      </html>
    )
}
