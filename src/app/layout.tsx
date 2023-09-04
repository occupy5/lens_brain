import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeButton } from '@/components/ui/ThemeButton';
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
          <main className="flex flex-col min-h-screen pt-24 px-4">
            {children}
            <footer className="flex justify-end p-6">
              <ThemeButton />
            </footer>
          </main>
        </Providers>
      </body>
    </html>
  )
}
