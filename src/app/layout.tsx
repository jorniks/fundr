import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import RecoilContextProvider from "@/providers/RecoilRootProvider";
import Web3ContextProvider from "@/providers/web3ReactProvider";
import { Toaster } from "@/components/ui/toaster";
import "bootstrap-icons/font/bootstrap-icons.css"
import { ToastContainer } from 'react-toastify'
import Footer from "@/components/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });
  
export const metadata: Metadata = {
  title: "FUNDR",
  description: "The decentralized crowd funding platform you can trust",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-gray-950 text-white`}>
        <RecoilContextProvider>
          <Web3ContextProvider>
            {children}

            <Footer />
            <Toaster />
            <ToastContainer />
          </Web3ContextProvider>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
