import './globals.css';
import { Inter } from 'next/font/google';
import Providers from "@/components/Providers";
import { Nav } from "@/components/Nav";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lens Brain',
  description: 'Build your second brains use lens',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* PWA config */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" /> 
      <meta name="apple-mobile-web-app-title" content="Lens Brain" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/icons/lensbrain-512x512.png" />
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <body className={inter.className}>
        <Providers>
          <Nav></Nav>
          <main className="flex flex-col min-h-screen pt-14 px-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
