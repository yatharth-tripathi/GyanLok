// frontend/app/components/ContentList.js

'use client';

import { useEffect, useState } from 'react';
import { Contract, formatUnits } from 'ethers';
import ContentCard from './ContentCard';
import { connectWallet } from '../utils/wallet';
import { GyanPlatformABI, GYAN_PLATFORM_ADDRESS } from '../utils/contracts';

function ContentList() {
  const [contents, setContents] = useState([]);
  const [signer, setSigner] = useState(null);
  const [tokenBalance, setTokenBalance] = useState('0');

  useEffect(() => {
    async function loadContents() {
      try {
        const { signer } = await connectWallet();
        setSigner(signer);

        const platformContract = new Contract(
          GYAN_PLATFORM_ADDRESS,
          GyanPlatformABI,
          signer
        );

        // Get token balance
        const address = await signer.getAddress();
        const balance = await platformContract.balanceOf(address);
        setTokenBalance(formatUnits(balance, 18));

        // Get contents
        const contentCount = Number(await platformContract.contentCount());
        let contentsArray = [];
        for (let i = 0; i < contentCount; i++) {
          const contentData = await platformContract.getContent(i);
          contentsArray.push({
            id: Number(contentData[0]),
            author: contentData[1],
            ipfsHash: contentData[2],
            upvotes: Number(contentData[3]),
            downvotes: Number(contentData[4]),
          });
        }
        setContents(contentsArray);
      } catch (error) {
        console.error('Error loading contents:', error);
      }
    }
    loadContents();
  }, []);

  const handleVote = async (id, isUpvote) => {
    try {
      const platformContract = new Contract(
        GYAN_PLATFORM_ADDRESS,
        GyanPlatformABI,
        signer
      );
      const tx = await platformContract.voteContent(id, isUpvote);
      await tx.wait();
      alert('Vote submitted!');
      // Refresh the contents
      const updatedContentData = await platformContract.getContent(id);
      setContents((prevContents) =>
        prevContents.map((content) =>
          content.id === id
            ? {
                ...content,
                upvotes: Number(updatedContentData[3]),
                downvotes: Number(updatedContentData[4]),
              }
            : content
        )
      );
    } catch (error) {
      console.error('Error voting on content:', error);
    }
  };

  return (
    <div>
      <h1>GyanChain - Decentralized Knowledge Sharing Platform</h1>
      <p>Your GYAN Token Balance: {tokenBalance}</p>
      {contents.map((content) => (
        <ContentCard key={content.id} content={content} onVote={handleVote} />
      ))}
    </div>
  );
}

export default ContentList;
