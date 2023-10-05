"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/context/AuthContext";
import Header from "./components/header/header";
import type { AppProps } from "next/app";
// import { RecoilRoot } from "recoil";

export function Providers({ Component, pageProps }: AppProps) {
  // export function Providers({ Component, pageProps }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <AuthProvider>
          <Header />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
