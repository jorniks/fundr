import { useEffect, useState } from "react";
import { useLirioContract } from "@/hooks/services/useContract";

export default function useTokenDecimal(tokenAddress: string) {
  const tokenContract = useLirioContract(tokenAddress)
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