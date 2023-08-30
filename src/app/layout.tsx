import './globals.css';
import { Inter } from 'next/font/google';
import Logo from "@/components/ui/logo";
import { ThemeButton } from '@/components/ui/ThemeButton';
import Providers from "@/components/Providers";

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
          <main className="flex flex-col min-h-screen pt-24 px-4">
            <header className="flex flex-row justify-center items-center h-24 w-full">
              <a href='/'>
                <Logo />
              </a>
            </header>
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
