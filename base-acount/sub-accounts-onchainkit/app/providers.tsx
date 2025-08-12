// 👾 MiniKitProvider is the magic sauce that turns a regular Next.js app into a Farcaster Mini App.
// ✅ It wires in the Frames SDK context (user, client, launch location, etc.)
// ✅ Sets up wagmi + react-query under the hood so you don’t have to
// ✅ Applies client-safe insets to avoid overlap with Warpcast UI
// ✅ Handles theming and app appearance for Coinbase Wallet and beyond
"use client";

import { type ReactNode, useState } from "react";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { type State, WagmiProvider } from "wagmi";
import { getConfig } from "@/wagmi";
import { OnchainKitProvider } from "@coinbase/onchainkit";

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseSepolia}
        >
          {props.children}
        </MiniKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
