import { useEffect, useState } from "react";
import { useLirioContract } from "@/hooks/services/useContract";
import { convertToDecimalValue } from "@/functions/misc-functions";
import useTokenDecimal from "./useTokenDecimal";

export default function useTokenTotalSupply(tokenAddress: string) {
  const tokenContract = useLirioContract(tokenAddress)
  const [tokenTotalSupply, setTokenTotalSupply] = useState<number>(0)
  const tokenDecimal = useTokenDecimal(tokenAddress)

  useEffect(() => {
    async function getTokenSymbol() {
      try {
        const totalSupply = await tokenContract?.totalSupply()
        const convertedSupply = convertToDecimalValue(totalSupply?.toString(), tokenDecimal) || 0
        setTokenTotalSupply(convertedSupply)
      } catch (error) {
        console.log(error)
      }
    }

    getTokenSymbol()
  }, [tokenDecimal, tokenContract])

  return tokenTotalSupply;
}