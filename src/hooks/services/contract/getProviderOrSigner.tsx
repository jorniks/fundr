import { useEffect, useState } from "react";
import useGetActiveProviderURL from "./getActiveProviderURL";
import { ethers } from "ethers";
import { defaultChainId } from "@/lib/services/chain-config";


function useGetProviderOrSigner() {
  const activeUrl = useGetActiveProviderURL();
  const [provider, setProvider] = useState<any>(undefined);

  useEffect(() => {
    getProvider();
  }, [activeUrl]);
  const getProvider = async () => {
    if (activeUrl) {
      if (window.ethereum && window.ethereum.networkVersion === defaultChainId) {
        try {
          const tempProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(tempProvider);
        } catch (error) {
        }
      } else {
        let tempProvider = activeUrl.startsWith("http")
          ? new ethers.JsonRpcProvider(activeUrl, undefined, {
              staticNetwork: ethers.Network.from(40),
            })
          : ethers.getDefaultProvider(activeUrl);
        setProvider(tempProvider);
      }
    }
  };
  return provider;
}

export default useGetProviderOrSigner;
