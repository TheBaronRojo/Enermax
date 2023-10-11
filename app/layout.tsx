import './globals.css'
import type { Metadata } from 'next'
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Enermax',
  description: 'Prueba técnica de InfoDesign',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
