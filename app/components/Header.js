// frontend/app/components/Header.js

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { connectWallet } from '../utils/wallet';

function Header() {
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    async function fetchWallet() {
      try {
        const { signer } = await connectWallet();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (error) {
        console.error('Wallet not connected');
      }
    }
    fetchWallet();
  }, []);

  return (
    <header>
      <nav>
        <h1>GyanChain</h1>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/submit">Submit Content</Link>
          </li>
        </ul>
        <div>
          {walletAddress ? (
            <span>Connected: {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}</span>
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
