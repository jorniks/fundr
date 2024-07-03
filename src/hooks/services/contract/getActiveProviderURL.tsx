import { ethers } from "ethers";
import { useEffect, useState } from "react";
import RPC from "@/lib/rpc-list";
import { defaultChainId } from "@/lib/services/chain-config";

function useGetActiveProviderURL() {
  const [activeUrl, setActiveUrl] = useState<string>("");
  useEffect(() => {
    helper();
  }, []);

  const helper = async () => {
    for (const rpcURL of RPC[defaultChainId]) {
      let provider = new ethers.JsonRpcProvider(rpcURL, undefined, {
        staticNetwork: ethers.Network.from(defaultChainId),
      });
      try {
        await provider._detectNetwork();
        setActiveUrl(rpcURL);
        break;
      } catch (err) {
      }
    }
  };

  return activeUrl;
}

export default useGetActiveProviderURL;
