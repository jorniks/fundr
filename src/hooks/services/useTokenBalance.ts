import { useEffect, useState } from "react";
import { useLirioContract } from "@/hooks/services/useContract";
import { useWeb3React } from '@web3-react/core'
import { convertToDecimalValue } from "@/functions/misc-functions";
import useTokenDecimal from "./useTokenDecimal";

export default function useTokenBalance(tokenAddress: string) {
  const { account,  } = useWeb3React();
  const tokenContract = useLirioContract(tokenAddress)
  const [userBalanceOnToken, setUserBalanceOnToken] = useState<number>(0)
  const tokenDecimal = useTokenDecimal(tokenAddress)

  useEffect(() => {
    async function getTokenSymbol() {
      if (account) {
        const userBalance = await tokenContract?.balanceOf(account)
        let convertedBalance = convertToDecimalValue(userBalance) || 0
        setUserBalanceOnToken(convertedBalance)
      }
    }

    getTokenSymbol()
  }, [account, tokenDecimal, tokenContract])

  return userBalanceOnToken;
}