"use client"
import NavBar from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch";
import useTokenRead from "@/hooks/read-hooks/useTokenRead";
import { useEffect, useState } from "react";
import useTokenWrite from "@/hooks/write-hooks/useTokenWrite";
import { Button } from "@/components/button";


const burnPercentages = [ 10, 25, 50, 75, 100 ]


export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const { tokenSymbol, walletBalance, mintableBalance, blacklistStatus } = useTokenRead()
  const { mintSpecificAmount, mintMaxAmount, burnToken, toggleWalletBlacklist } = useTokenWrite()

  

  return (
    <main className="flex flex-col h-screen overflow-hidden bg-gradient-bg text-white">
      <NavBar />

      <div className="py-8 space-y-4 px-4 sm:px-8">
        <Tabs defaultValue="mint" className="w-full max-w-xl mx-auto space-y-4">
          <TabsList className="grid grid-cols-12 shadow rounded-md divide-x bg-white/20 backdrop-blur-lg overflow-hidden">
            <TabsTrigger className="col-span-6" value="mint">Mint</TabsTrigger>
            <TabsTrigger className="col-span-6" value="transfer">Transfer</TabsTrigger>
          </TabsList>

          <TabsContent className="container overflow-y-auto no-scrollbar bg-white/20 backdrop-blur-lg shadow-lg w-full max-w-xl rounded py-10 space-y-6" value="mint">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold leading-none">
                  {blacklistStatus ? 'Whitelist' : 'Blacklist'} Wallet
                </p>
                <p className="text-sm">
                  Your wallet will {!blacklistStatus && 'not'} be able to mint/burn LIRIO
                </p>
              </div>
              <Switch checked={blacklistStatus} onClick={() => toggleWalletBlacklist()} />
            </div>

            <div className="">
              Minted balance {(walletBalance || 0)?.toLocaleString()} {tokenSymbol}
            </div>
            
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">
                    <span className="mr-2 font-normal">Mintable Bal</span> {(mintableBalance || 0)?.toLocaleString()} {tokenSymbol}
                  </div>
                  
                  <div className="">
                    <Button className="text-spray-300 underline-offset-2 hover:underline text-sm"
                      onClick={() => mintMaxAmount()}
                    >Mint Max</Button>
                  </div>
                </div>
                
                <input
                  type="text"
                  placeholder="Amount to mint"
                  value={inputValue}
                  className="w-full rounded p-3 shadow-sm ring-1 ring-gray-400 focus:ring-gray-300 outline-none bg-transparent"
                  onChange={(e) => {
                    if (Number(e.target.value) > -1 || e.target.value === '') {
                      setInputValue(e.target.value)
                    }
                  }}
                />
              </div>

              <Button
                className="btn spray rounded py-3 text-base w-full sm:w-2/5"
                onClick={() => mintSpecificAmount(inputValue)}
              >Mint</Button>
            </div>

            <div className="space-y-3 pt-8">
              <div className="">
                <p className="font-semibold text-lg">Burn minted token</p>
              </div>

              <div className="flex items-center justify-between gap-x-2 sm:gap-x-8 font-medium">
                {burnPercentages.map((burnPercentage, index) => (
                  <Button
                    key={index}
                    className="btn chestnut transition-all duration-300 w-1/5 py-3"
                    onClick={() => burnToken((burnPercentage / 100))}
                  >{burnPercentage}%</Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent className="container overflow-y-auto no-scrollbar bg-white/20 backdrop-blur-lg w-full max-w-xl shadow rounded py-10 space-y-6" value="transfer">
            <div className="">
              Transfer token here.
            </div>

            <div className="space-y-6">
              <div className="">
                <input type="text" placeholder="Amount to mint" className="w-full rounded p-3 shadow-sm ring-1 ring-gray-400 focus:ring-gray-300 outline-none bg-transparent"/>
              </div>

              <Button className="btn spray rounded py-3 text-base w-full sm:w-2/5">Transfer</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
