'use client'
import { useWeb3React } from '@web3-react/core'
import React from 'react'
import NotConnectedWalletButton from './NotConnected'
import ConnectedWalletButton from './Connected'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NETWORK_LABEL } from '@/lib/network-list'
import { switchNetwork } from '@/lib/wallet/connector'

const WalletButton = () => {
  const { account, chainId } = useWeb3React()
  
  return (
    !account ?
      <NotConnectedWalletButton />
      :
      <div className="flex gap-y-3 sm:flex-row flex-col-reverse items-center gap-x-2">
        <Select defaultValue={chainId?.toString()} onValueChange={(newValue) => switchNetwork(Number(newValue))}>
          <SelectTrigger className="min-w-[9rem]">
            <SelectValue placeholder="Select Network" />
          </SelectTrigger>

          <SelectContent>
            {Object.keys(NETWORK_LABEL).map((networkId, index) => (
              <SelectItem key={index} value={networkId}>{NETWORK_LABEL[networkId]}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <ConnectedWalletButton />
      </div>
  )
}

export default WalletButton