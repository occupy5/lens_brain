"use client";
import { ThemeProvider } from "next-themes";
import { LensProvider, LensConfig, production } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { PublisherContextProvider } from "@/context/ProfileContext";
import { WalletProviders } from './WalletProvider'


const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
      <LensProvider config={lensConfig}>
        <PublisherContextProvider>
          <WalletProviders>
            <ThemeProvider attribute="class" enableSystem={true}>{children}</ThemeProvider>
          </WalletProviders>
        </PublisherContextProvider>
      </LensProvider>
  );
};

export default Providers;
