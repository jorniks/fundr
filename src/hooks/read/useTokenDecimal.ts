import { useEffect, useState } from "react";
import { useTokenContract } from "@/hooks/services/useContract";

export default function useTokenDecimal(tokenAddress: string) {
  const tokenContract = useTokenContract(tokenAddress)
  const [tokenDecimal, setTokenDecimal] = useState<number>(0)

  useEffect(() => {
    const getTokenDecimal = async () => {
      try {
        const tokenDecimal = await tokenContract?.decimals()
        setTokenDecimal(tokenDecimal?.toString())
      } catch (error) {
        console.log(error)
      }
    }

    getTokenDecimal()
  }, [tokenContract])


  return tokenDecimal
}