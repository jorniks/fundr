"use client"
import NavBar from "@/components/navbar";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch";


export default function Home() {
  const [activeTab, setActiveTab] = useState('mint')

  return (
    <main className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <NavBar />

      <div className="py-8 space-y-4 px-4 sm:px-8">
        <Tabs defaultValue="mint" className="w-full max-w-xl mx-auto space-y-4">
          <TabsList className="grid grid-cols-12 shadow rounded-md divide-x bg-white overflow-hidden">
            <TabsTrigger className="col-span-4" value="mint">Mint</TabsTrigger>
            <TabsTrigger className="col-span-4" value="burn">Burn</TabsTrigger>
            <TabsTrigger className="col-span-4" value="transfer">Transfer</TabsTrigger>
          </TabsList>

          <TabsContent className="container overflow-y-auto no-scrollbar bg-white w-full max-w-xl shadow rounded py-10 space-y-6" value="mint">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold leading-none">
                  Blacklist Wallet
                </p>
                <p className="text-sm text-gray-600">
                  Your wallet will not be able to mint LIRIO
                </p>
              </div>
              <Switch />
            </div>

            <div className="">
              Mint token here.
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">
                    <span className="mr-2 font-normal text-zinc-500">Mintable Bal</span> 1000 LIR
                  </div>
                  
                  <div className="">
                    <button className="text-spray-800 hover:underline text-sm">Mint Max</button>
                  </div>
                </div>
                
                <input type="text" placeholder="Amount to mint" className="w-full rounded p-3 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-gray-500 outline-none" />
              </div>

              <div className="flex items-center justify-between">
                <button className="btn spray rounded py-3 w-full sm:w-2/5">Mint</button>
              </div>
            </div>
          </TabsContent>

          <TabsContent className="container overflow-y-auto no-scrollbar bg-white w-full max-w-xl shadow rounded py-10 space-y-6" value="burn">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold leading-none">
                  Blacklist Wallet
                </p>
                <p className="text-sm text-gray-600">
                  Your wallet will not be able to burn LIRIO
                </p>
              </div>
              <Switch />
            </div>

            <div className="">
              Burn token here.
            </div>

            <div className="space-y-6">
              <div className="">
                <input type="text" placeholder="Amount to mint" className="w-full rounded p-3 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-gray-500 outline-none"/>
              </div>

              <button className="btn spray rounded py-2.5 px-8">Mint</button>
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
