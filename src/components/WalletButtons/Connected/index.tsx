"use client"
import { shortenAddress } from '@/functions/format';
import useDisconnectFromWallet from '@/hooks/useDisconnectFromWallet';
import { ConnectionType } from '@/lib/wallet/supported-connectors';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select"
import Image from 'next/image';
import { NETWORK_LABEL } from '@/lib/network-list';
import { Button } from '@/components/button';
import Link from 'next/link';
import useNetworkTokenBalance from '@/hooks/read/useNetworkTokenBalance'
import { CHAIN_INFO, defaultChainId } from '@/lib/services/chain-config';
import { copyToClipboard, truncateValue } from '@/functions/misc-functions';
import { switchNetwork } from '@/lib/wallet/connector';
import useTokenBalances from '@/hooks/read/useTokenBalances';


const ConnectedWalletButton = () => {
  const { tokenSymbol, networkTokenBalance } = useNetworkTokenBalance()
  const tokenBalances = useTokenBalances();
  const [open, setOpen] = useState<boolean>(false);
  const [addressCopied, setAddressCopied] = useState<boolean>(false);
  const { account, chainId, isActive } = useWeb3React();
  const storedConnectionType = window?.localStorage?.getItem("ConnectionType");
  const connectionType = storedConnectionType ? (storedConnectionType as ConnectionType) : null;
  const disconnectWallet = useDisconnectFromWallet(setOpen);
  
  useEffect(() => {
    if (isActive && chainId !== defaultChainId) {
      switchNetwork(Number(defaultChainId), connectionType)
    }
  }, [chainId, connectionType, isActive])


  return (
    <div className="flex gap-y-3 sm:flex-row flex-col-reverse items-center gap-x-3">
      <Select onValueChange={(newValue: string) => switchNetwork(Number(newValue), connectionType)}>
        <SelectTrigger className="min-w-[9rem] bg-black/20">
          <SelectValue placeholder="Balances" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>
              <div className="font-semibold">
                {tokenSymbol}
                <p className="text-xs text-white/30">{ truncateValue(networkTokenBalance, 8) }</p>
              </div>
            </SelectLabel>

            {tokenBalances.map((tokenBalance, index) => (
              <SelectLabel key={index}>
                <div className="font-semibold">
                  {tokenBalance.name}
                  <p className="text-xs text-white/30">{ truncateValue(tokenBalance.balance, 4) }</p>
                </div>
              </SelectLabel>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="btn spray rounded-full py-3 font-medium ps-4">
          <SelectValue placeholder={account && shortenAddress(account)} />
        </SelectTrigger>

        <SelectContent className="">
          <SelectGroup className="">
            <Link href="/my-campaigns">
              <SelectLabel className="hover:bg-white/20">My Campaigns</SelectLabel>
            </Link>
            <SelectSeparator />

            <Dialog>
              <DialogTrigger asChild>
                <div>
                <SelectLabel className='pt-2 pb-0 text-xs text-gray-300 font-normal -ml-2'>Connection Info</SelectLabel>
                <SelectLabel className="cursor-pointer hover:bg-white/20">Wallet</SelectLabel>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-sm w-full bg-gradient-bg text-white border-0">
                <DialogHeader>
                  <DialogTitle>Account</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 pb-4">
                  {/* Network */}
                  <div className="py-3 bg-spray-900 rounded px-4 flex">
                    <div className="my-auto">
                      <div className="text-sm text-gray-400 mb-1 font-regular">
                        Connected network
                      </div>
                      <div className="text-base font-medium">
                        {chainId !== undefined && NETWORK_LABEL[chainId]}
                      </div>
                    </div>
                  </div>

                  {/* Wallet */}
                  <div className="space-y-5">
                    {/* Address */}
                    <div className="relative flex items-center justify-between border-spray-600 rounded-full border-2 p-1.5 pl-4">
                      <div className="">
                        <Image width={20} height={20} alt={`${connectionType} logo`} className="inline mr-[10px]" src={`/img/${connectionType?.toLowerCase()}.svg`} />

                        <span className="text-[16px] leading-1 font-medium my-auto display: inline-block ">{account ? shortenAddress(account) : "No Connection"}</span>
                      </div>

                      {/* Button to disconnect */}
                      <Button className="btn chestnut py-3 px-4" onClick={disconnectWallet}>Disconnect</Button>
                    </div>

                    <section className="flex items-center justify-between text-[13px] w-full px-[10px]">
                      <Link target="_blank" className="space-x-1 flex items-center" href={`${CHAIN_INFO[Number(chainId || defaultChainId)]?.explorer}/address/${account}` || ""}>
                        <span className="">View in explorer</span>
                        <svg className=" inline ml-[8px] fill-white" width="15" height="15" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.27502 18.4065C1.64531 18.4065 1.10871 18.1848 0.665225 17.7413C0.221741 17.2978 0 16.7612 0 16.1315V2.27502C0 1.64531 0.221741 1.10871 0.665225 0.665225C1.10871 0.221742 1.64531 0 2.27502 0H8.06577C8.38497 0 8.65436 0.109784 8.87392 0.32935C9.09349 0.548917 9.20327 0.818308 9.20327 1.13752C9.20327 1.45672 9.09349 1.72611 8.87392 1.94567C8.65436 2.16524 8.38497 2.27502 8.06577 2.27502H2.27502V16.1315H16.1315V10.3408C16.1315 10.0216 16.2413 9.75219 16.4609 9.53263C16.6804 9.31306 16.9498 9.20327 17.269 9.20327C17.5882 9.20327 17.8576 9.31306 18.0772 9.53263C18.2968 9.75219 18.4065 10.0216 18.4065 10.3408V16.1315C18.4065 16.7612 18.1848 17.2978 17.7413 17.7413C17.2978 18.1848 16.7612 18.4065 16.1315 18.4065H2.27502ZM16.1315 3.86035L7.87827 12.1136C7.66704 12.3248 7.40382 12.4295 7.0886 12.4275C6.77338 12.4255 6.51016 12.3189 6.29892 12.1076C6.08769 11.8964 5.98208 11.6322 5.98208 11.3149C5.98208 10.9978 6.08769 10.7335 6.29892 10.5223L14.5462 2.27502H12.3408C12.0216 2.27502 11.7522 2.16524 11.5326 1.94567C11.3131 1.72611 11.2033 1.45672 11.2033 1.13752C11.2033 0.818308 11.3131 0.548917 11.5326 0.32935C11.7522 0.109784 12.0216 0 12.3408 0H18.4065V6.06577C18.4065 6.38497 18.2968 6.65436 18.0772 6.87392C17.8576 7.09349 17.5882 7.20327 17.269 7.20327C16.9498 7.20327 16.6804 7.09349 16.4609 6.87392C16.2413 6.65436 16.1315 6.38497 16.1315 6.06577V3.86035Z" />
                        </svg>
                      </Link>

                      <div className="space-x-1 cursor-pointer flex items-center" onClick={() => {
                        copyToClipboard(account).then(() => {
                          setAddressCopied(true);
                          setTimeout(() => setAddressCopied(false), 1000);
                        })
                      }}>
                        <span className="">Copy Address</span>
                        {!addressCopied ? (
                          <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"/>
                          </svg>
                        ) : (
                          <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                          </svg>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <SelectSeparator />

            <SelectLabel onClick={disconnectWallet} className='cursor-pointer hover:bg-chestnut-600/70 flex items-center justify-between'>
              Disconnect
              <i className="bi bi-box-arrow-right text-xl"></i>
            </SelectLabel>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ConnectedWalletButton