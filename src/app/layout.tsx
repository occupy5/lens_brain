'use client'

import './globals.css';
import { Inter } from 'next/font/google';
import Logo from "@/components/ui/logo";
import { Button } from '@/components/ui/button'
import { ThemeButton } from '@/components/ui/ThemeButton';
import Providers from "@/components/Providers";
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useDisconnect } from 'wagmi';

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Lens Brain',
//   description: 'Build your second brains use lens',
// }

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

function Nav() {
  const { open } = useWeb3Modal()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <nav className='border-b flex flex-row items-center justify-between px-4 py-4'>
      <div>
        <Logo />
      </div>
      <div>
        {
          !address && (
            <Button onClick={open}>
              Sign In
            </Button>
          )
        }
        {
          address && (
            <Button onClick={() => disconnect()}>
              Sign Out
            </Button>
          )
        }
      </div>
    </nav>
  )
}