"use client"
import NavBar from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch";
import useTokenRead from "@/hooks/read-hooks/useTokenRead";
import { useCallback, useEffect, useState } from "react";
import useTokenWrite from "@/hooks/write-hooks/useTokenWrite";
import { Button } from "@/components/button";
import { useWeb3React } from "@web3-react/core";
import WalletButton from "@/components/WalletButtons";
import { CHAIN_INFO } from "@/lib/services/chain-config";
import { useRecoilValue } from "recoil";
import { blacklistStatusState, tokenBalanceState, tokenTotalSupplyState } from "./state/atoms/atom";


const burnPercentages = [ 10, 25, 50, 75, 100 ]


export default function Home() {
  const { account, chainId } = useWeb3React()
  const incorrectNetwork = (chainId && CHAIN_INFO.hasOwnProperty(chainId?.toString())) ? true : false
  const [mintableBalance, setMintableBalance] = useState<number | undefined>(0)
  const [inputValue, setInputValue] = useState<string>('')
  const { tokenSymbol, getMintableBalance, getBlacklistStatus, getWalletBalance, getTokenTotalSupply } = useTokenRead()
  const { mintSpecificAmount, mintMaxAmount, burnToken, toggleWalletBlacklist } = useTokenWrite()
  const walletBalance = useRecoilValue(tokenBalanceState)
  const blacklistStatus = useRecoilValue(blacklistStatusState)
  const tokenTotalSupply = useRecoilValue(tokenTotalSupplyState)

  const loadContractInfo = useCallback(
    () => {
      getMintableBalance().then(setMintableBalance)
      getBlacklistStatus()
      getWalletBalance()
      getTokenTotalSupply()
    }, [getBlacklistStatus, getMintableBalance, getTokenTotalSupply, getWalletBalance],
  )

  useEffect(() => {
    loadContractInfo()
  }, [loadContractInfo])
  

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
              <Switch checked={blacklistStatus} onClick={() => toggleWalletBlacklist().then(() => loadContractInfo())} className={`${(!account || !incorrectNetwork) && 'pointer-events-none opacity-60'}`} />
            </div>

            <div className="">
              Total Supply {(tokenTotalSupply || 0)?.toLocaleString()} {tokenSymbol}
            </div>
            
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">
                    <span className="mr-2 font-normal">Mintable Bal</span> {(mintableBalance || 0)?.toLocaleString()} {tokenSymbol}
                  </div>
                  
                  <div className="">
                    <Button className={`text-spray-300 underline-offset-2 hover:underline text-sm ${(!account || !incorrectNetwork) && 'pointer-events-none opacity-60'}`}
                      onClick={() => mintMaxAmount().then(() => loadContractInfo())}
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

              {!account ?
                <WalletButton />
              :
                <Button
                  className={`btn spray rounded py-3 text-base w-full sm:w-2/5 ${(!account || !incorrectNetwork) && 'pointer-events-none opacity-80'}`}
                  onClick={() => mintSpecificAmount(inputValue).then(() => {
                    setInputValue('')
                    loadContractInfo()
                  })}
                >Mint</Button>
              }
            </div>

            <div className="space-y-3 pt-8">
              <div className="">
                <p className="font-semibold text-lg">Burn minted token</p>
              </div>

              <div className="flex items-center justify-between gap-x-2 sm:gap-x-8 font-medium">
                {burnPercentages.map((burnPercentage, index) => (
                  <Button
                    key={index}
                    className={`btn chestnut transition-all duration-300 w-1/5 py-3 ${(!account || !incorrectNetwork) && 'pointer-events-none opacity-80'}`}
                    onClick={() => burnToken((burnPercentage / 100)).then(() => loadContractInfo())}
                  >{burnPercentage}%</Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent className="container overflow-y-auto no-scrollbar bg-white/20 backdrop-blur-lg w-full max-w-xl shadow rounded py-10 space-y-6" value="transfer">
            <div className="space-y-1">
              <div className="font-semibold">
                <span className="mr-1.5 font-normal">Wallet balance</span> {(walletBalance || 0)?.toLocaleString()} {tokenSymbol}
              </div>

              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Reciever Wallet"
                  className="w-full rounded p-3 shadow-sm ring-1 ring-gray-400 focus:ring-gray-300 outline-none bg-transparent"
                  value={inputValue}
                  onChange={(e) => {
                    if (Number(e.target.value) > -1 || e.target.value === '') {
                      setInputValue(e.target.value)
                    }
                  }}
                />

                <input
                  type="text"
                  placeholder="Amount to mint"
                  className="w-full rounded p-3 shadow-sm ring-1 ring-gray-400 focus:ring-gray-300 outline-none bg-transparent"
                  value={inputValue}
                  onChange={(e) => {
                    if (Number(e.target.value) > -1 || e.target.value === '') {
                      setInputValue(e.target.value)
                    }
                  }}
                />

                <Button className={`btn spray rounded py-3 text-base w-full sm:w-2/5 ${(!account || !incorrectNetwork) && 'pointer-events-none opacity-80'}`}>Transfer</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
