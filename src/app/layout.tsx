import './globals.css'
import ClientWrapper from '../components/ClientWrapper'
import { LanguageProvider } from '../context/LanguageContext'

export const metadata = {
  title: 'Nathan Roos | DevOps Engineer & Full Stack Developer',
  description: 'Portfolio of Nathan Roos - DevOps Engineer & Full Stack Developer specializing in Kubernetes, Docker, CI/CD, and modern cloud infrastructure.',
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
