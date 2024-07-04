import { useEffect, useState } from "react";
import { useLirioContract } from "@/hooks/services/useContract";
import useTokenDecimal from "./useTokenDecimal";
import { convertToDecimalValue } from "@/functions/misc-functions";

export default function useMintableBalance(tokenAddress: string) {
  const contract = useLirioContract(tokenAddress)
  const tokenDecimal = useTokenDecimal(tokenAddress)
  const [mintableBalance, setMintableBalance] = useState(0)

  useEffect(() => {
    async function getMintableBalance() {
      try {
        const mintableBalance = await contract?.mintableBalance()
        const convertedMintableBalance = convertToDecimalValue(mintableBalance?.toString(), tokenDecimal)

        setMintableBalance(convertedMintableBalance)
      } catch (error) {
        console.log(error)
      }
    }

    getMintableBalance()
  }, [contract, tokenDecimal])

  return mintableBalance;
}