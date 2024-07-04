import GetContract from './contract/getContract';
import { Contract } from '@ethersproject/contracts';
import LIRIO_TOKEN_ABI from '@/constants/abis/lirio-token.json';
import { Contract as StandardEthersContract } from 'ethers';
import { ZeroAddress } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { getContract } from './contract/contracts';
import { useMemo } from 'react';

export const useWeb3ReactContract = (contractAddress: string, contractABI: any): Contract | null => {
  const { account, provider } = useWeb3React();
  const contract = useMemo(() => {
    if (!contractAddress || contractAddress === ZeroAddress || !contractABI || !provider) return null;

    return getContract(contractAddress, contractABI, provider, account);
  }, [contractAddress, contractABI, provider, account]);

  return contract;
};

// USES STANDARD ETHERS PROVIDER FOR WHEN web3-react DOESN'T HAVE A PROVIDER TO RELY ON
// USED ONLY WHEN window.ethereum IS UNDEFINED
export const useStandardEthersContract = (contractAddress: string, contractABI: any): StandardEthersContract | null => {
  if (!contractAddress || contractAddress === ZeroAddress || !contractABI) return null;

  return GetContract(contractAddress, contractABI);
};

export const useContract = (contractAddress: string, contractABI: any): Contract | StandardEthersContract | null => {
  const web3ReactContract = useWeb3ReactContract(contractAddress, contractABI);
  const standardEthersContract = useStandardEthersContract(contractAddress, contractABI);

  if (web3ReactContract) {
    return web3ReactContract;
  }

  return standardEthersContract;
};

export const useLirioContract = (tokenAddress: string): Contract | StandardEthersContract | null => {
  return useContract(tokenAddress, LIRIO_TOKEN_ABI);
};
