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
