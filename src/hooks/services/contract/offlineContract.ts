import RPC from "@/lib/rpc-list"
import { defaultChainId } from "@/lib/services/chain-config"
import { Contract, ethers, isAddress, JsonRpcSigner, Provider, ZeroAddress } from "ethers"

const getProviderOrSigner = (): JsonRpcSigner | Provider => {
  return new ethers.JsonRpcProvider(RPC[defaultChainId], undefined, { staticNetwork: ethers.Network.from(defaultChainId) }) || ethers.getDefaultProvider(RPC[defaultChainId]);
}

export const getOfflineContract = (contractAddress: string, contractABI: any): Contract => {
  if (!isAddress(contractAddress) || contractAddress === ZeroAddress) throw Error(`Invalid 'address' parameter '${contractAddress}'.`)
  
  return new ethers.Contract(contractAddress, contractABI, getProviderOrSigner())
}