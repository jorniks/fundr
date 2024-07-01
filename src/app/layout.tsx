import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import RecoilContextProvider from "@/providers/recoilContextProvider";
import Web3ContextProvider from "@/providers/web3ReactProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
  
export const metadata: Metadata = {
  title: "Lirio Token by jorniks",
  description: "Lirio token is a token created for the purpose of demonstration on smart contract interaction with wallets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <RecoilContextProvider>
          <Web3ContextProvider>
            {children}
          </Web3ContextProvider>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
