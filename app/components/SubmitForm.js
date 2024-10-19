// frontend/app/components/SubmitForm.js

'use client';

import { useState } from 'react';
import { Contract } from 'ethers';
import { connectWallet } from '../utils/wallet';
import { GyanPlatformABI, GYAN_PLATFORM_ADDRESS } from '../utils/contracts';
import { ipfs } from '../utils/ipfs';

function SubmitForm() {
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    console.log('Submit button clicked');
    if (!content) {
      console.log('No content to submit');
      return;
    }
    try {
      const { signer } = await connectWallet();
      const address = await signer.getAddress();
      console.log('Connected wallet address:', address);

      // Upload content to IPFS
      console.log('Uploading content to IPFS...');
      const added = await ipfs.add(content);
      const ipfsHash = added.path;
      console.log('Content uploaded to IPFS with hash:', ipfsHash);

      // Submit content to smart contract
      console.log('Submitting content to smart contract...');
      const platformContract = new Contract(
        GYAN_PLATFORM_ADDRESS,
        GyanPlatformABI,
        signer
      );
      const tx = await platformContract.submitContent(ipfsHash);
      console.log('Transaction submitted:', tx.hash);

      await tx.wait();
      console.log('Transaction confirmed');

      alert('Content submitted successfully!');
      setContent('');
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  return (
    <div>
      <h1>Submit New Content</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your content here..."
        rows="10"
        cols="50"
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit Content</button>
    </div>
  );
}

export default SubmitForm;
