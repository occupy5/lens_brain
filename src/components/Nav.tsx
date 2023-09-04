"use client"
import { useAccount, useDisconnect } from 'wagmi';
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Nav() {

  return (
    <nav className='border-b flex flex-row items-center justify-between px-4 py-4'>
      <div>
        <Logo />
      </div>
      <div>
        <ConnectButton.Custom>
          {({ account, chain, openAccountModal, openConnectModal, openChainModal, mounted }) => {
            const connected = mounted && account && chain;
            return (
              <>
                {(() => {
                  if (!connected) {
                    return (
                      <Button onClick={openConnectModal}>
                        Sign in
                      </Button>
                    );
                  }

                  return (
                    <div className="px-2 flex justify-end items-center">
                      <div className="flex justify-center items-center border-1 rounded-lg">
                        <div className="flex flex-col items-center">
                          {/* <span className="text-xs">
                            {chain.name}
                          </span> */}
                        </div>
                        <Button
                          onClick={openAccountModal}
                        >
                          <span className="ml-2 mr-1">{account.displayName}</span>
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </>
            )
          }}
        </ConnectButton.Custom>
      </div>
    </nav>
  )
}