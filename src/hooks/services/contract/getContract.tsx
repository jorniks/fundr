"use client"
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import useGetProviderOrSigner from "./getProviderOrSigner";

function GetContract(contractAddress: string, contractABI: any) {
  const provider = useGetProviderOrSigner();
  const [contract, setContract] = useState<any>(null);

  const getContractHelper = useCallback(
    async () => {
      if (provider) {
        const accounts = await provider.listAccounts();
        const signerProvider = accounts.length > 0 ? await provider.getSigner() : provider;
        const tempContract = new ethers.Contract(contractAddress, contractABI, signerProvider);

        setContract(tempContract);
      }
    }, [contractABI, contractAddress, provider],
  )

  useEffect(() => {
    getContractHelper();
  }, [getContractHelper]);
  
  return contract;
}

export default GetContract;
