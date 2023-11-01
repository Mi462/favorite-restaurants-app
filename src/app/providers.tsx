"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
// import { AuthProvider } from "@/context/AuthContext";
// import Header from "./components/header/header";
import type { AppProps } from "next/app";

// export function Providers({ Component, pageProps }: AppProps) {
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <CacheProvider>
        <ChakraProvider>
          {/* <AuthProvider> */}
          {/* <Component {...pageProps} /> */}
          {children}
          {/* </AuthProvider> */}
        </ChakraProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}
