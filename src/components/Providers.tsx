"use client";
import { ThemeProvider } from "next-themes";
import { LensProvider, LensConfig, production } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { PublisherContextProvider } from "@/context/ProfileContext";
import { WalletProvider } from './WalletProvider'


const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
      <LensProvider config={lensConfig}>
        <PublisherContextProvider>
          <WalletProvider>
            <ThemeProvider attribute="class" enableSystem={true}>{children}</ThemeProvider>
          </WalletProvider>
        </PublisherContextProvider>
      </LensProvider>
  );
};

export default Providers;
