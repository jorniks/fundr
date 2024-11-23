import { useEffect, useState } from "react";
import { useTokenContract } from "@/hooks/services/useContract";

export default function useTokenSymbol(tokenAddress: string) {
  const tokenContract = useTokenContract(tokenAddress)
  const [tokenSymbol, setTokenSymbol] = useState<string>("")

  useEffect(() => {
    async function getTokenSymbol() {
      try {
        const tokenSymbol = await tokenContract?.symbol()
        setTokenSymbol(tokenSymbol)
      } catch (error) {
        console.log(error)
      }
    }

    getTokenSymbol()
  }, [tokenContract])

  return tokenSymbol;
}