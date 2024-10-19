// app/utils/wallet.js

import Web3Modal from 'web3modal';
import { BrowserProvider } from 'ethers';

let web3Modal;
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'sepolia',
    cacheProvider: true,
    providerOptions: {},
  });
}

export async function connectWallet() {
  const instance = await web3Modal.connect();
  const provider = new BrowserProvider(instance);
  const signer = await provider.getSigner();
  return { provider, signer };
}
