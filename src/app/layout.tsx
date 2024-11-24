import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import RecoilContextProvider from "@/providers/RecoilRootProvider";
import Web3ContextProvider from "@/providers/web3ReactProvider";
import { Toaster } from "@/components/ui/toaster";
import "bootstrap-icons/font/bootstrap-icons.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Footer from "@/components/Footer";
import NavBar from "@/components/navbar";

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
      <body className={`${montserrat.className} bg-gray-950 text-white antialiased`}>
        <div className="flex absolute top-0 left-0 start-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-50">
          <span className="bg-gradient-to-tl blur-3xl w-[55vw] h-[60vh] rounded-full origin-top-right -rotate-12 from-lime-900/70 via-indigo-900/70 to-blue-900/70 -z-10"></span>
        </div>

        <RecoilContextProvider>
          <Web3ContextProvider>
            <NavBar />

            {children}

            <Footer />
            <Toaster />
            <ToastContainer
              position="bottom-left"
            />
          </Web3ContextProvider>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
