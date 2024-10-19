// frontend/app/components/ContentCard.js

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import { ipfs } from "../utils/ipfs";

function ContentCard({ content, onVote }) {
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchContentData() {
      try {
        const chunks = [];
        for await (const chunk of ipfs.cat(content.ipfsHash)) {
          chunks.push(chunk);
        }
        setData(Buffer.concat(chunks).toString());
      } catch (error) {
        console.error("Error fetching content from IPFS:", error);
      }
    }
    fetchContentData();
  }, [content.ipfsHash]);

  return (
    <CardContainer className="inter-var mb-8">
      <CardBody
        className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border transition-shadow duration-500"
      >
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {content.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {data}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={content.image || "https://via.placeholder.com/300"}
            height="300"
            width="300"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-shadow duration-300"
            alt="Content Image"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href={`https://twitter.com/${content.author}`}
            target="_blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            View Profile →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            onClick={() => onVote(content.id, true)}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Upvote
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            onClick={() => onVote(content.id, false)}
            className="px-4 py-2 rounded-xl bg-red-500 dark:bg-red-700 text-white text-xs font-bold"
          >
            Downvote
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default ContentCard;
