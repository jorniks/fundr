import { useCallback, useEffect, useMemo, useState } from "react";
import { useTokenContract } from "./services/useContract";
import { convertToDecimalValue, extractErrorMessage } from "@/functions/misc-functions";
import { useWeb3React } from '@web3-react/core'
import { formatToBigInt } from "@/functions/format";
import { toast as customToast } from "@/components/ui/use-toast"
import RPC_EXPLORER from "@/lib/rpc-list";
import { loadingState } from "@/app/state/atoms/atom";
import { useSetRecoilState } from "recoil";
import { FUNDR_CONTRACT } from '@/constants/addresses/fundr-contract'
import { defaultChainId } from "@/lib/services/chain-config";
import { toast } from "react-toastify";
import { ApprovalType } from "@/types";

export function useApprovalState(amountToApprove: string, tokenAddress: string, tokenDecimal: number): [ApprovalType, () => Promise<void>] {
  const { account } = useWeb3React();
  const tokenContract = useTokenContract(tokenAddress)
  const [currentAllowance, setCurrentAllowance] = useState(0)
  const explorerURL = RPC_EXPLORER[defaultChainId]
  const setIsLoading = useSetRecoilState(loadingState)
  
  useEffect(() => {
    async function getCurrentAllowance() {
      if (account) {
        const userAllowance = await tokenContract?.allowance(account, FUNDR_CONTRACT);
        const convertedAllowance = convertToDecimalValue(userAllowance?.toString(), tokenDecimal);
        setCurrentAllowance(convertedAllowance);
      }
    }

    getCurrentAllowance();
  }, [account, tokenContract, tokenDecimal]);

  const approvalState: ApprovalType = useMemo(() => {
    if (!amountToApprove) return ApprovalType.UNKNOWN
    if (!currentAllowance) return ApprovalType.UNKNOWN

    return (currentAllowance < parseFloat(amountToApprove)) ? ApprovalType.NOT_APPROVED : ApprovalType.APPROVED
  }, [amountToApprove, currentAllowance])


  const approveSpend = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    
    if (approvalState === ApprovalType.APPROVED) {
      customToast({ variant: "info", description: "Spend already approved!" })
      setIsLoading(false)
      return
    }

    if (!account) {
      customToast({ variant: "error", description: "No wallet connected!" })
      setIsLoading(false)
      return
    }

    try {
      const amountToSpend = formatToBigInt(amountToApprove, tokenDecimal)
      const approvalTx = await tokenContract?.approve(FUNDR_CONTRACT, amountToSpend)
      const approvalReceipt = await approvalTx.wait();

      if (approvalReceipt.status === 0) {
        customToast({ variant: "error", description: "Approve Spend failed! Try again" })
        setIsLoading(false)
      }

      const userAllowance = await tokenContract?.allowance(account, FUNDR_CONTRACT);
      const convertedAllowance = convertToDecimalValue(userAllowance?.toString(), tokenDecimal);
      setCurrentAllowance(convertedAllowance);
      setIsLoading(false)

      customToast({
        variant: "success",
        description: "Successfully approved spend",
        action: { url: `${explorerURL}/tx/${approvalReceipt?.hash || approvalReceipt?.transactionHash}`, label: "View in explorer" }
      })
    } catch (approveSpendError: {} | any) {
      const errorMessage = extractErrorMessage(approveSpendError)
      toast.error(errorMessage)
      setIsLoading(false)
    }
  }, [setIsLoading, approvalState, account, amountToApprove, tokenDecimal, tokenContract, explorerURL])
  

  return [ approvalState, approveSpend ]
}