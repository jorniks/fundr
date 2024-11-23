'use client'
import { useWeb3React } from '@web3-react/core'
import React from 'react'
import NotConnectedWalletButton from './NotConnected'
import ConnectedWalletButton from './Connected'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NETWORK_LABEL } from '@/lib/network-list'
import { switchNetwork } from '@/lib/wallet/connector'
import { formatNumberScale } from '@/functions/format'
import { CHAIN_INFO } from '@/lib/services/chain-config'
import { useRecoilValue } from 'recoil'
import { tokenBalanceState } from '@/app/state/atoms/atom'

const WalletButton = () => {
  const { account, chainId } = useWeb3React()
  const nativeCurrency = chainId && CHAIN_INFO[chainId]?.nativeCurrency?.symbol
  const tokenBalance = useRecoilValue(tokenBalanceState)

  const [tokenSymbol, networkTokenBalance] = ['useNetworkTokenBalance', 100]
  
  return (
    !account ?
      <NotConnectedWalletButton />
      :
      <div className="flex gap-y-3 sm:flex-row flex-col-reverse items-center gap-x-3 ring-1 ring-white/20 rounded-lg px-1 py-0.5">
        <Select
          value={chainId?.toString()}
          onValueChange={(newValue: string) => switchNetwork(Number(newValue))}
        >
          <SelectTrigger className="min-w-[9rem] bg-white/10">
            <SelectValue placeholder="Select Network" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel className='pt-2 pb-0 px-2'>Choose Network</SelectLabel>

              {Object.keys(NETWORK_LABEL).map((networkId, index) => (
                <SelectItem key={index} value={networkId}>{NETWORK_LABEL[networkId]}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        
        <Select onValueChange={(newValue: string) => switchNetwork(Number(newValue))}>
          <SelectTrigger className="min-w-[9rem] bg-black/20">
            <div className="flex items-center justify-between w-full">
              <div className="font-semibold"> { tokenSymbol } </div>
              <div className="font-normal"> {formatNumberScale(tokenBalance)} </div>
            </div>
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                <div className="flex items-center justify-between">
                  <div className="font-semibold"> { tokenSymbol } </div>
                  <div className="font-normal"> { formatNumberScale(tokenBalance) } </div>
                </div>
              </SelectLabel>
              <SelectLabel>
                <div className="flex items-center justify-between">
                  <div className="font-semibold"> {nativeCurrency} </div>
                  <div className="font-normal"> {formatNumberScale(networkTokenBalance)} </div>
                </div>
              </SelectLabel>
            </SelectGroup>
          </SelectContent>
        </Select>

        <ConnectedWalletButton />
      </div>
  )
}

export default WalletButton