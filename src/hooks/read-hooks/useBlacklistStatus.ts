import { useEffect, useState } from "react";
import { useLirioContract } from "@/hooks/services/useContract";

export default function useBlacklistStatus(tokenAddress: string) {
  const contract = useLirioContract(tokenAddress)
  const [isWalletBlacklisted, setIsWalletBlacklisted] = useState<boolean>(false)

  useEffect(() => {
    async function getBlacklistStatus() {
      try {
        const blacklistStatus = await contract?.isWalletBlacklisted()
        setIsWalletBlacklisted(blacklistStatus)
      } catch (error) {
      }
    }

    getBlacklistStatus()
  }, [contract])

  return isWalletBlacklisted;
}