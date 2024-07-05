import { loadingState } from "@/app/state/atoms/atom";
import { toast } from "@/components/ui/use-toast";
import { errorCode } from "@/lib/metamask-error-codes";
import { CHAIN_INFO, defaultChainId } from "@/lib/services/chain-config";
import { getConnection, switchNetwork } from "@/lib/wallet/connector";
import { ConnectionType } from "@/lib/wallet/supported-connectors";
import { useWeb3React } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { useSetRecoilState } from "recoil";

export default function useConnectToWallet(connectionType: ConnectionType, setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  const setIsLoading = useSetRecoilState(loadingState)
  const { chainId } = useWeb3React()

  const tryActivateConnector = async (connector: Connector): Promise<ConnectionType | undefined> => {
    await connector.activate()
    const connectionType = getConnection(connector).type
    return connectionType
  }

  const connectWallet = async (): Promise<null | undefined> => {
    setIsLoading(true)

    try {
      const activation = await tryActivateConnector(getConnection(connectionType).connector);
      if (!activation) return

      window?.localStorage.setItem('ConnectionType', activation)

      setOpen(false)
      setIsLoading(false)
      return;
    } catch (connectWalletError: {} | any) {
      setIsLoading(false)
      toast({variant: 'error', description: errorCode[connectWalletError?.code as keyof typeof errorCode] || connectWalletError?.message})
    }
  }
  
  return connectWallet
}