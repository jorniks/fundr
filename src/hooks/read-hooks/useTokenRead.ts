import { useWeb3React } from "@web3-react/core"
import { useLirioContract } from "../services/useContract";
import { LIRIO_TOKEN } from "@/constants/addresses/lirio-token";
import { CHAIN_INFO, defaultChainId } from "@/lib/services/chain-config";
import useTokenSymbol from "./useTokenSymbol";
import useTokenDecimal from "./useTokenDecimal";
import useTokenTotalSupply from "./useTokenTotalSupply";
import { useCallback } from "react";
import { convertToDecimalValue } from "@/functions/misc-functions";
import { useSetRecoilState } from "recoil";
import { blacklistStatusState, tokenBalanceState, tokenTotalSupplyState } from "@/app/state/atoms/atom";


export default function useTokenRead() {
  const { account, chainId } = useWeb3React();
  const tokenAddress = (chainId && CHAIN_INFO.hasOwnProperty(chainId?.toString())) ? LIRIO_TOKEN[chainId] : LIRIO_TOKEN[defaultChainId]
  const contract = useLirioContract(tokenAddress)
  const tokenSymbol = useTokenSymbol(tokenAddress) || "LIR"
  const tokenDecimal = useTokenDecimal(tokenAddress)
  const tokenTotalSupply = useTokenTotalSupply(tokenAddress)
  const setLirioBalance = useSetRecoilState(tokenBalanceState)
  const setBlacklistStatus = useSetRecoilState(blacklistStatusState)
  const setTokenTotalSupply = useSetRecoilState(tokenTotalSupplyState)


  const getMintableBalance = useCallback(
    async () => {
      try {
        const mintableBalance = await contract?.mintableBalance()
        const convertedMintableBalance = convertToDecimalValue(mintableBalance?.toString(), tokenDecimal)

        return convertedMintableBalance || 0;
      } catch (error) {
        console.log(error)
      }
    }, [contract, tokenDecimal]
  )

  const getBlacklistStatus = useCallback(
    async () => {
      try {
        const blacklistStatus = await contract?.isWalletBlacklisted()
        setBlacklistStatus(blacklistStatus);
        return blacklistStatus;
      } catch (error) {
      }
    }, [contract, setBlacklistStatus]
  )

  const getTokenTotalSupply = useCallback(
    async () => {
      try {
        const userBalance = await contract?.balanceOf(account)
        let convertedBalance = convertToDecimalValue(userBalance?.toString(), tokenDecimal) || 0
        setTokenTotalSupply(convertedBalance)

        return convertedBalance || 0;
      } catch (error) {
        return 0;
      }
    }, [account, contract, setTokenTotalSupply, tokenDecimal]
  )

  const getWalletBalance = useCallback(
    async () => {
      try {
        const userBalance = await contract?.balanceOf(account)
        let convertedBalance = convertToDecimalValue(userBalance?.toString(), tokenDecimal) || 0
        setLirioBalance(convertedBalance)

        return convertedBalance || 0;
      } catch (error) {
        return 0;
      }
    }, [account, contract, setLirioBalance, tokenDecimal]
  )
  
  return { tokenSymbol, tokenDecimal, tokenTotalSupply, getMintableBalance, getBlacklistStatus, getWalletBalance, getTokenTotalSupply }
}