"use client"
import NavBar from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch";
import useTokenRead from "@/hooks/read-hooks/useTokenRead";
import { useEffect, useState } from "react";


export default function Home() {
  const [mintableBalance, setMintableBalance] = useState(0)
  const [isWalletBlacklisted, setIsWalletBlacklisted] = useState(true)
  const { tokenSymbol, walletBalance, getMintableBalance, getBlacklistStatus } = useTokenRead()

  
  useEffect(() => {
    getMintableBalance().then(setMintableBalance)
    getBlacklistStatus().then(setIsWalletBlacklisted)
  }, [getBlacklistStatus, getMintableBalance])
  

  return (
    <main className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <NavBar />

      <div className="py-8 space-y-4 px-4 sm:px-8">
        <Tabs defaultValue="mint" className="w-full max-w-xl mx-auto space-y-4">
          <TabsList className="grid grid-cols-12 shadow rounded-md divide-x bg-white overflow-hidden">
            <TabsTrigger className="col-span-6" value="mint">Mint</TabsTrigger>
            <TabsTrigger className="col-span-6" value="transfer">Transfer</TabsTrigger>
          </TabsList>

          <TabsContent className="container overflow-y-auto no-scrollbar bg-white w-full max-w-xl shadow rounded py-10 space-y-6" value="mint">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold leading-none">
                  Blacklist Wallet
                </p>
                <p className="text-sm text-gray-600">
                  Your wallet will not be able to mint/burn LIRIO
                </p>
              </div>
              <Switch checked={isWalletBlacklisted} />
            </div>

            <div className="">
              Minted token balance {walletBalance}
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">
                    <span className="mr-2 font-normal text-zinc-500">Mintable Bal</span> {mintableBalance?.toLocaleString()} {tokenSymbol}
                  </div>
                  
                  <div className="">
                    <button className="text-spray-800 hover:underline text-sm">Mint Max</button>
                  </div>
                </div>
                
                <input type="text" placeholder="Amount to mint" className="w-full rounded p-3 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-gray-500 outline-none" />
              </div>

              <button className="btn spray rounded py-3 text-base w-full sm:w-2/5">Mint</button>
            </div>

            <div className="space-y-3 pt-8">
              <div className="">
                <p className="font-semibold text-lg">Burn minted token</p>
              </div>

              <div className="flex items-center justify-between gap-x-2 sm:gap-x-8 font-medium">
                <div className="ring-1 ring-zinc-500 cursor-pointer hover:chestnut transition-all duration-300 hover:text-white w-1/5 text-center py-2 rounded-sm">10%</div>
                <div className="ring-1 ring-zinc-500 cursor-pointer hover:chestnut transition-all duration-300 hover:text-white w-1/5 text-center py-2 rounded-sm">25%</div>
                <div className="ring-1 ring-zinc-500 cursor-pointer hover:chestnut transition-all duration-300 hover:text-white w-1/5 text-center py-2 rounded-sm">50%</div>
                <div className="ring-1 ring-zinc-500 cursor-pointer hover:chestnut transition-all duration-300 hover:text-white w-1/5 text-center py-2 rounded-sm">75%</div>
                <div className="ring-1 ring-zinc-500 cursor-pointer hover:chestnut transition-all duration-300 hover:text-white w-1/5 text-center py-2 rounded-sm">100%</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent className="container overflow-y-auto no-scrollbar bg-white w-full max-w-xl shadow rounded py-10 space-y-6" value="transfer">
            <div className="">
              Transfer token here.
            </div>

            <div className="space-y-6">
              <div className="">
                <input type="text" placeholder="Amount to mint" className="w-full rounded p-3 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-gray-500 outline-none"/>
              </div>

              <button className="btn spray rounded py-2.5 px-8">Mint</button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
