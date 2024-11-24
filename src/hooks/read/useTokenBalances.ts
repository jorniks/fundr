import { useWeb3React } from "@web3-react/core";
import { useTokenContract } from "../services/useContract";
import { useEffect, useState } from "react";
import { convertToDecimalValue } from "@/functions/misc-functions";
import { preferredTokens } from "@/constants/addresses/preferred-tokens";
import { TokenBalance } from "@/types";

export default function useTokenBalances() {
  const { account } = useWeb3React();
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([])
  const tokenContracts = preferredTokens.map(token => ({
    ...token,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    contract: useTokenContract(token.address)
  }));
  
  useEffect(() => {
    async function getTokenSymbol() {
      if (account) {
        
        const balancePromises = await Promise.all(
          tokenContracts.map(async ({ contract, decimal, name }) => {
            try {
              const balance = await contract?.balanceOf(account)
              let convertedBalance = convertToDecimalValue(balance?.toString(), decimal) || 0
              
              return {
                name: name,
                balance: convertedBalance
              };
            } catch (error) {
              console.error(`Failed to fetch balance for ${name}`, error);

              return {
                name: name,
                balance: 0,
              };
            }
          })
        );
        
        setTokenBalances(balancePromises)
      }
    }

    getTokenSymbol()
  }, [account])

  return tokenBalances;
}